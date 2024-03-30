import React, { useState, useEffect } from 'react';
import DepositMoneyForm from '../components/DepositMoneyForm';
import WithdrawMoneyForm from '../components/WithdrawMoneyForm';
import TransactionTable from '../components/TransactionTable';

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [searchAccountNumber, setSearchAccountNumber] = useState('');
    
    //get token from local storage
    const token = localStorage.getItem('jwTtoken');
    const userType= localStorage.getItem('userType');
    const userId= localStorage.getItem('userId');
    
    useEffect(() => {
        // Fetch transactions from the backend API
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const accountResponse = await fetch("http://localhost:5224/api/accounts/by"+userId,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
                });
            if (!accountResponse.ok) {
                throw new Error("Failed to fetch accounts");
            } 
            const accountData = await accountResponse.json();
            console.log("Response data:", accountData); // Log the response data for debugging
            if (!accountData || !accountData.accountNumber) { // Check if data or data.accounts is missing or empty
                throw new Error("Invalid accounts data");
            }

            setAccountNumber(accountData.accountNumber);

            const response = await fetch("http://localhost:5224/Transaction/"+accountData.accountNumber,{
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

    // Function to handle search by account number
    const handleSearch = () => {
        // Set the accountNumber state to the input value and then fetch transactions
        setAccountNumber(searchAccountNumber);
        fetchTransactions();
    };

    // JSX to render search input for teller person
    const renderSearchInput = () => {
        return (
            <div className="form-buttons">
                <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={searchAccountNumber}
                    onChange={(e) => setSearchAccountNumber(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        );
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

    const handleWithdrawSuccess = () => {
        fetchTransactions(); // Update transactions after a successful withdraw
    };

    return (
        <div className="transaction-container">
            <h1>Transaction Page</h1>
            <div className="form-container">
                 {/* Render search input for teller person */}
                 {userType === 'TellerPerson' && renderSearchInput()}

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
                {showWithdrawForm && <WithdrawMoneyForm onWithdrawSuccess={handleWithdrawSuccess} />}
            </div>
        </div>
    );
}
