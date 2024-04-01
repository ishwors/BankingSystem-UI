import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const FormDialog = ({ open, onClose, onOpen }) => {
  const [atmCardPin, setAtmPin] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountDetails, setAccountDetails] = React.useState([]);

  const handleChange = (event) => {
    setAtmPin(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5224/api/accounts?accountNumber=${accountNumber}`,
        {
          atmCardPin,
        }, {
        withCredentials: true, // Add withCredentials option
        headers: config.headers // Send token in headers
      });
      console.log("Pin reset successful:", response.data);
      refreshAccount(); // Refresh the account after successful submission
    } catch (error) {
      console.error("Pin reset failed:", error);
    } finally {
      setAtmPin("");
      setAccountNumber("");
      onClose(); // Close the dialog after submitting
    }
  };

  // Function to refresh account data
  const refreshAccount = async () => {
    try {
      const response = await fetch("http://localhost:5224/api/accounts?accountNumber=" + accountNumber, {
        withCredentials: true, // Add withCredentials option
        headers: config.headers // Send token in headers
      });
      const data = await response.json();
      setAccountDetails(data);
    } catch (error) {
      console.error('Error refreshing account:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Change ATM Pin</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change ATM pin, please enter email and ATM pin number.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          type="text"
          fullWidth
          onChange={handleAccountNumberChange}
        />
        <TextField
          required
          margin="dense"
          id="atmPin"
          name="atmPin"
          label="Change ATM Pin"
          type="number"
          max="4"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;