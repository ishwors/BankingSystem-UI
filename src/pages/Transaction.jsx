import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    
    //get token from local storage
    const token = localStorage.getItem('jwTtoken');
    
    useEffect(() => {
        // Fetch transactions from the backend API
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch("http://localhost:5224/Transaction/1000011227405192",{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
                });
            
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            console.log("Response data:", data); // Log the response data for debugging
            if (!data || !data.length) { // Check if data or data.transactions is missing or empty
                throw new Error("Invalid response format: Missing transactions data");
            }
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div className="transaction-container">
            <h1>Transaction Page</h1>
            <div className="form-container">
                {transactions && transactions.length > 0 ? (
                    <TransactionTable transactions={transactions} />
                ) : (
                    <p>No transactions found</p>
                )}
                {localStorage.getItem('userType') === 'TellerPerson' ? (
                     <div className="form">
                        <Link to="/depositMoney">
                            <button className="deposit-button">Deposit Money</button>
                        </Link>
                     </div>
                ) : (
                    <div className="form">
                    <Link to="/withdrawMoney">
                        <button className="deposit-button">Withdraw Money</button>
                    </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
