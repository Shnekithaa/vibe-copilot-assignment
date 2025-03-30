import { Link } from "react-router-dom";

function Success() {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>🎉 Payment Successful!</h1>
            <p>Thank you for your purchase. Your payment was successful.</p>
            <Link to="/" style={{ textDecoration: "none", fontSize: "18px", color: "blue" }}>
                Back to Home
            </Link>
        </div>
    );
}

export default Success;
