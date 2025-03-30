import { Link } from "react-router-dom";

function Failure() {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>❌ Payment Failed!</h1>
            <p>Something went wrong with your payment. Please try again.</p>
            <Link to="/cart" style={{ textDecoration: "none", fontSize: "18px", color: "red" }}>
                Go Back to Cart
            </Link>
        </div>
    );
}

export default Failure;
