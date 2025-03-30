# 💳 Payment Integration App with Stripe

🚀 A full-stack payment processing app built using **FastAPI (Python)** for the backend and **React (Vite)** for the frontend. It includes a **cart system, transaction dashboard, and Stripe payment integration**.

---

## 📌 **Features**
✅ **Stripe Payment Integration** - Secure checkout with Stripe  
✅ **Cart System** - Add, update, and remove products  
✅ **Transaction Dashboard** - View recent transactions with real-time status  
✅ **Payment Status Handling** - Success and Failure pages after checkout  
✅ **Tailwind CSS Styling** - Responsive and modern UI  

---

## 🛠 **Tech Stack**
- 🌐 **Frontend**: React (Vite) + Tailwind CSS  
- ⚙️ **Backend**: FastAPI (Python)  
- 💳 **Payment Gateway**: Stripe  
- 📦 **Database**: SQLite  
- 🔗 **API Requests**: Axios  

---

## 🚀 **Getting Started**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Shnekithaa/vibe-copilot-assignment
```

### **2️⃣ Set Up Backend**
```bash
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate virtual environment (Mac/Linux)
venv\Scripts\activate  # Activate on Windows
pip install -r requirements.txt  # Install dependencies
```
# Set Up .env File

Create a `.env` file inside `backend/` and add:

```ini
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 3️⃣ Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on [http://localhost:8000](http://localhost:8000)

## 4️⃣ Set Up Frontend

```bash
cd frontend
npm install  
npm run dev  
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/products` | Get all available products |
| POST   | `/create-checkout-session` | Create a Stripe checkout session |
| GET    | `/transactions` | Get all recent transactions |
| POST   | `/webhook` | Stripe webhook to update payment status |

## 🎨 Screenshots

| 🛒 Cart Page | 💳 Checkout | 📊 Dashboard |
|-------------|------------|-------------|
| Cart items with quantity management | Stripe Payment Page | List of transactions with statuses |

## 🛠 Upcoming Features

✅ User Authentication

✅ Database Migration (PostgreSQL instead of SQLite)

✅ Real-time Status Updates with WebSockets


## ⭐ Contributing

Want to improve this project? Feel free to fork and submit a PR! 🚀

🎉 Happy Coding!

