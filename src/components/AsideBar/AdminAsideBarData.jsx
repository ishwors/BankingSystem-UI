import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountBalance';
import KYCIcon from '@mui/icons-material/DocumentScanner';
import UserIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';


export const AdminAsideBarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        title: "Accounts",
        icon: <AccountIcon />,
    },
    {
        title: "KYC",
        icon: <KYCIcon />,
    },
    {
        title: "Users",
        icon: <UserIcon />,
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
    },
]