import React from "react";

function TransactionTable({ transactions }) {
    return (
        <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Account ID</th>
                                <th>User ID</th>
                                <th>Amount</th>
                                <th>Transaction Type</th>
                                <th>Transaction Time</th>
                                <th>Transaction Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.accountId}</td>
                                    <td>{transaction.accounts.userId}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.transactionTime}</td>
                                    <td>{transaction.transactionRemarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    );
}

export default TransactionTable;