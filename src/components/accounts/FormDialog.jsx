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
  const [emailId, setEmailId] = React.useState("");

  const handleChange = (event) => {
    setAtmPin(event.target.value);
  };

  const handleEmailIdChange = (event) => {
    setEmailId(event.target.value);
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
        `http://localhost:5224/api/accounts/${emailId}`,
        {
          atmCardPin,
        }, {
        withCredentials: true, // Add withCredentials option
        headers: config.headers // Send token in headers
      });
      console.log("Pin reset successful:", response.data);
      // Update the accounts state with the updated account data
      // setAccounts((prevAccounts) =>
      //   prevAccounts.map((acc) =>
      //     acc.accountId === accountToEdit.accountId ? response.data : acc
      //   )
      // );
    } catch (error) {
      console.error("Pin reset failed:", error);
    } finally {
      setAtmPin("");
      setEmailId("");
      // setAccountToEdit(null); // Reset the accountToEdit state
      onClose(); // Close the dialog after submitting
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
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          // value={accountToEdit?.email || ""} // Use optional chaining to handle null values
          onChange={handleEmailIdChange}
        />
        <TextField
          required
          margin="dense"
          id="atmPin"
          name="atmPin"
          label="Change ATM Pin"
          type="text"
          fullWidth
          // value={accountToEdit?.atmCardPin || ""} // Use optional chaining to handle null values
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