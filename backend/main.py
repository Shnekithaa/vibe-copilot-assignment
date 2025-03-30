from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
import sqlite3
import json
import os
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Stripe Secret Key from environment variables
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Ensure the key is loaded properly
if not stripe.api_key:
    raise ValueError("⚠️ Stripe API key not found! Check your .env file.")

# Database setup
conn = sqlite3.connect("transactions.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        status TEXT,
        stripe_session_id TEXT
    )
""")
conn.commit()

# Dummy product data (prices in cents)
PRODUCTS = [
    {"id": 1, "name": "Product 1", "price": 2000},  # $20.00
    {"id": 2, "name": "Product 2", "price": 3500},  # $35.00
    {"id": 3, "name": "Product 3", "price": 5000},  # $50.00
]

# Pydantic model for request validation
class Item(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

class CheckoutRequest(BaseModel):
    items: list[Item]

@app.get("/products")
def get_products():
    return PRODUCTS

@app.post("/create-checkout-session")
def create_checkout_session(data: CheckoutRequest):
    try:
        if not data.items:
            raise HTTPException(status_code=400, detail="Cart cannot be empty")

        # Calculate total amount
        total_amount = sum(item.price * item.quantity for item in data.items)

        # Ensure the total is at least $0.50 (50 cents)
        if total_amount < 50:
            raise HTTPException(status_code=400, detail="Minimum order amount is $0.50 USD")

        line_items = [
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": item.name},
                    "unit_amount": int(item.price),
                },
                "quantity": item.quantity,
            }
            for item in data.items
        ]

        # Create a Stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:5173/success",
            cancel_url="http://localhost:5173/cancel",
        )

        # Save transaction in DB
        cursor.execute(
            "INSERT INTO transactions (amount, status, stripe_session_id) VALUES (?, ?, ?)",
            (total_amount / 100, "Pending", session.id),
        )
        conn.commit()

        return {"url": session.url}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/transactions")
def get_transactions():
    cursor.execute("SELECT * FROM transactions")
    return [
        {"id": row[0], "amount": row[1], "status": row[2], "stripe_session_id": row[3]}
        for row in cursor.fetchall()
    ]

# Webhook to update transaction status after payment
@app.post("/webhook")
async def stripe_webhook(request: Request):
    try:
        payload = await request.body()
        event = json.loads(payload)

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            stripe_session_id = session["id"]

            # Update transaction status in database
            cursor.execute(
                "UPDATE transactions SET status = ? WHERE stripe_session_id = ?",
                ("Completed", stripe_session_id),
            )
            conn.commit()

        return {"message": "Webhook received successfully"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
