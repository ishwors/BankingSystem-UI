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

  const getStoredSessionID = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("SessionID=")) {
        return cookie.substring("SessionID=".length, cookie.length);
      }
    }
    return null;
  };
  const sessionID = getStoredSessionID();

  const config = {
    headers: {
      "Session-ID": sessionID,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5224/api/accounts?email=${emailId}`,
        {
          atmCardPin,
        }, config
      );
      console.log("Pin reset successful:", response.data);
    } catch (error) {
      console.error("Pin reset failed:", error);
    } finally {
      setAtmPin("");
      setEmailId("");
    }
  };

  return (
    <React.Fragment>
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
            value={emailId}
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
            value={atmCardPin}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";

// const FormDialog = ({ open, onClose, onOpen }) => {
//   const [atmCardPin, setAtmPin] = React.useState("");
//   const [emailId, setEmailId] = React.useState("");

//   const handleChange = (event) => {
//     setAtmPin({
//       ...atmCardPin,
//       atmPin: event.target.value,
//     });
//   };

//   const handleEmailIdChange = (event) => {
//     setEmailId(event.target.value);
//   };

//   // Function to retrieve session ID from cookies
//   const getStoredSessionID = () => {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith("SessionID=")) {
//         return cookie.substring("SessionID=".length, cookie.length);
//       }
//     }
//     return null;
//   };
//   const sessionID = getStoredSessionID();

//   const config = {
//     headers: {
//       "Session-ID": sessionID,
//     },
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.put(
//         `http://localhost:5224/api/api/accounts?email=${emailId}`,
//         {
//           atmCardPin,
//         },
//         config
//       );
//       console.log("Pin reset successful:", response.data);
//     } catch (error) {
//       console.error("Pin reset failed:", error);
//     } finally {
//       setAtmPin("");
//       setEmailId("");
//     }
//   };

//   return (
//     <React.Fragment>
//       <Dialog
//         open={open}
//         onClose={onClose}
//         onOpen={onOpen}
//         PaperProps={{
//           component: "form",
//           onSubmit: handleSubmit,
//         }}
//       >
//         <DialogTitle>Change ATM Pin</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To change ATM pin, please enter email and ATM pin number.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="email"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             value={emailId}
//             onChange={handleEmailIdChange}
//           />
//           <TextField
//             required
//             margin="dense"
//             id="atmPin"
//             name="atmPin"
//             label="Change ATM Pin"
//             type="text"
//             fullWidth
//             value={accountId.atmCardPin} // Assuming atmCardPin is an object with an atmPin property
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default FormDialog;
