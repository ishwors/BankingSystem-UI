import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";

export default function AccountDetails() {
    const [accountDetails, setAccountDetails] = useState([]);

    //get token from local storage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userType === 'AccountHolder') {
            fetchAccountDetails();
        }
    }, [userType]);

    const fetchAccountDetails = async () => {
        try {
            const responseData = await fetch("http://localhost:5224/api/accounts/by" + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!responseData.ok) {
                throw new Error("Failed to fetch account details");
            }
            const response = await responseData.json();
            console.log("Response data:", response);

            setAccountDetails(response); // Update this line
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <h1>Account Details</h1>
            <div className="container">
                {accountDetails ? (
                    <div>
                        <p>Account Number: {accountDetails.accountNumber}</p>
                        <p>Balance: {accountDetails.balance}</p>
                        <p>Balance: {accountDetails.atmCardNum}</p>
                        <p>ATM Pin: {accountDetails.atmCardPin}</p>
                        <p>Created At: {accountDetails.createdAt}</p>
                        <p>Modified At: {accountDetails.modifiedAt}</p>
                        <Button onClick={handleClickOpen}>
                            <EditIcon />
                        </Button>
                        <FormDialog open={open} onClose={handleClose} onOpen={handleClickOpen} />
                    </div>
                ) : (
                    <p>No account details found</p>
                )}
            </div>
        </div>
    );
}
