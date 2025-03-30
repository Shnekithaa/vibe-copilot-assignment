import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/transactions").then(res => setTransactions(res.data));
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-400"; // Green for success
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-400"; // Yellow for pending
            case "failed":
                return "bg-red-100 text-red-800 border-red-400"; // Red for failure
            default:
                return "bg-gray-100 text-gray-800 border-gray-400"; // Default color
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📊 Recent Transactions</h1>
            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions available.</p>
            ) : (
                transactions.map((tx) => (
                    <div 
                        key={tx.id} 
                        className={`p-4 border-l-4 rounded-lg shadow-md mb-4 ${getStatusColor(tx.status)}`}
                    >
                        <p className="text-lg font-semibold">💰 Amount: <span className="font-normal">${tx.amount}</span></p>
                        <p className="text-md">🔹 Status: <span className="font-semibold">{tx.status}</span></p>
                    </div>
                ))
            )}
        </div>
    );
}
