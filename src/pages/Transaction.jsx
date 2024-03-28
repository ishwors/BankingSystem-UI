import React from "react";
import WithdrawMoneyForm from '../components/WithdrawMoneyForm';
import DepositMoneyForm from "../components/DepositMoneyForm";

export default function Transaction() {
    return (
        <div className="transaction-container">
            <h1>Transaction Page</h1>
            <div className="form-container">
                <div className="form">
                    <WithdrawMoneyForm />
                </div>
                <div className="form">
                    <DepositMoneyForm />
                </div>
            </div>
        </div>
    );
}
