import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormDialog from "./FormDialog";
import AlertDialog from "./AlertDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [accounts, setAccounts] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const [accountToDelete, setAccountToDelete] = React.useState(null);

  React.useEffect(() => {
    console.log("Fetching accounts...");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5224/api/accounts");
        setAccounts(response.data);
        //  setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // function createData(
  //   accountId,
  //   accountNumber,
  //   balance,
  //   atmCardNumber,
  //   atmCardPin,
  //   CreatedAt,
  //   Actions
  // ) {
  //   return {
  //     accountId,
  //     accountNumber,
  //     balance,
  //     atmCardNumber,
  //     atmCardPin,
  //     CreatedAt,
  //     Actions,
  //   };
  // }

  // const accounts = [
  //   createData(
  //     "1",
  //     111122222,
  //     2000,
  //     11112221,
  //     1111,
  //     "2024-03-30T13:41:35.789524Z"
  //   ),
  //   createData(
  //     "2",
  //     222333445,
  //     1200,
  //     11112222,
  //     1112,
  //     "2024-03-30T13:41:35.789524Z"
  //   ),
  //   createData(
  //     "3",
  //     262556778,
  //     1800,
  //     11112223,
  //     1113,
  //     "2024-03-30T13:41:35.789524Z"
  //   ),
  //   createData(
  //     "4",
  //     305445566,
  //     4400,
  //     11112224,
  //     1114,
  //     "2024-03-30T13:41:35.789524Z"
  //   ),
  //   createData(
  //     "5",
  //     356785432,
  //     1600,
  //     11112225,
  //     1115,
  //     "2024-03-30T13:41:35.789524Z"
  //   ),
  // ];

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDeleteAccount = async () => {
    try {
      // Make an API call to delete the account
      await axios.delete(`http://localhost:5224/api/accounts/${accountToDelete.accountId}`);
      // Update the accounts state by filtering out the deleted account
      setAccounts(accounts.filter(acc => acc.accountId !== accountToDelete.accountId));
      // Reset the accountToDelete state
      setAccountToDelete(null);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  return (
    <>
      {/* {isLoading ? (
        <CircularIndeterminate />
      ) : Array.isArray(accounts) && accounts.length > 0 ? ( */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Account Number</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
              <StyledTableCell align="right">ATM Card Number</StyledTableCell>
              <StyledTableCell align="right">ATM Card Pin</StyledTableCell>
              <StyledTableCell align="right">Created Time</StyledTableCell>
              <StyledTableCell align="right">Modified Time</StyledTableCell>
              <StyledTableCell align="right">Action(s)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <StyledTableRow key={account.accountId}>
                <StyledTableCell component="th" scope="row">
                  {account.accountNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.balance}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.atmCardNum}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.atmCardPin}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.createdAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.modifiedAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ButtonGroup>
                    <Button onClick={() => setAccountToDelete(account)}>
                      Delete
                    </Button>
                    <AlertDialog
                      open={!!accountToDelete}
                      onClose={() => setAccountToDelete(null)}
                      onConfirm={handleDeleteAccount}
                      account={accountToDelete}
                    />
                    <Button onClick={handleOpenDialog}>Edit</Button>
                    <FormDialog
                      open={openDialog}
                      onClose={handleCloseDialog}
                      onOpen={handleOpenDialog}
                    />
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ) : (
        <p>No accounts found.</p>
      )} */}
    </>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CustomizedTables() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Account Number</StyledTableCell>
//             <StyledTableCell align="right">Balance</StyledTableCell>
//             <StyledTableCell align="right">ATM Card Number</StyledTableCell>
//             <StyledTableCell align="right">ATM Card Pin</StyledTableCell>
//             <StyledTableCell align="right">Created Time</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.calories}</StyledTableCell>
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// //import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import { useState, useEffect } from "react";
// import axios from "axios";

// const AccountTable = () => {
//   const [accounts, setAccounts] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     console.log("Fetching users...");
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5224/api/accounts");
//         setAccounts(response.data);

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <CircularIndeterminate/>
//       ) : Array.isArray(accounts) && accounts.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Account Number</th>
//               <th>Balance</th>
//               <th>ATM Card Number</th>
//               <th>ATM Card PIN</th>
//               <th>Created At</th>
//               <th>Modified At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accounts.map((account) => (
//               <tr key={account.accountId}>
//                 <td>{account.accountNumber}</td>
//                 <td>{account.balance}</td>
//                 <td>{account.atmCardNum}</td>
//                 <td>{account.atmCardPin}</td>
//                 <td>{account.createdAt}</td>
//                 <td>{account.modifiedAt}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No accounts found.</p>
//       )}
//     </>
//   );
// };

// export default AccountTable;

export function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
