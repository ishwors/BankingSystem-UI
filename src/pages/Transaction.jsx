import React, { useState, useEffect } from 'react';
import DepositMoneyForm from '../components/DepositMoneyForm';
import WithdrawMoneyForm from '../components/WithdrawMoneyForm';
import TransactionTable from '../components/TransactionTable';

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //get token from local storage
    const token = localStorage.getItem('jwTtoken');
    const userType= localStorage.getItem('userType');
    
    useEffect(() => {
        // Fetch transactions from the backend API
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5224/Transaction/1000014891139243",{
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
        setLoading(false);
    };

    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);

    const handleDepositClick = () => {
        setShowDepositForm(true);
        setShowWithdrawForm(false); // Hide withdrawal form if it's open
    };

    const handleWithdrawClick = () => {
        setShowWithdrawForm(true);
        setShowDepositForm(false); // Hide deposit form if it's open
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
                {userType === 'TellerPerson' && (
                    <div className="form-buttons">
                        <button className="deposit-button" onClick={handleDepositClick}>Deposit Money</button>
                    </div>
                )}
                {userType !== 'TellerPerson' && (
                    <div className="form-buttons">
                        <button className="deposit-button" onClick={handleWithdrawClick}>Withdraw Money</button>
                    </div>
                )}
                {showDepositForm && <DepositMoneyForm />}
                {showWithdrawForm && <WithdrawMoneyForm />}
            </div>
        </div>
    );
}
