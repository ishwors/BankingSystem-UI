import * as React from "react";
import AccountTable from "./AccountTable";

export default function Account() {
  return (
    <>
      <AccountTable />
    </>
  );
}

export function SingleAccount() {
  return (
    <React.Fragment>
      <div className="account account-holder"></div>
    </React.Fragment>
  );
}
