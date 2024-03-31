import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import VerifiedIcon from '@mui/icons-material/Verified';

import LocationIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2';

import axios from 'axios';



export default function UserCard({ userData }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleInfoClick = () => {
        Swal.fire({
            // icon: 'info',
            title: 'User Information',
            html: `
                <div style="text-align: left; font-size: 1rem;">
                    <br><strong>Name:</strong> ${userData.fullname} 
                    <br><br>
                    <strong>Date of Birth:</strong> ${userData.dateOfBirth}<br><br>
                    <strong>Email:</strong> ${userData.email}<br><br>
                    <strong>Id:</strong> ${userData.id}<br><br>
                    <strong>Phone:</strong> ${userData.phoneNumber}<br><br>
                    <strong>UserName:</strong> ${userData.userName}<br><br>
                    <strong>User Type:</strong> ${userData.userType}
                </div>
            `,
            confirmButtonText: 'Close',
        });
    };

    const handleDeleteClick = () => {
        const fullName = userData.fullname;
        const names = fullName.split(' ');
        const firstName = names[0];
        Swal.fire({
            // position: "top-end",
            title: "Confirm delete " + firstName + "'s profile?",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                const userId = userData.id;
                console.log(userId);
                axios.delete(`http://localhost:5224/api/users/${userId}`)
                    .then(response => {
                        console.log(`Deleted post with ID ${userId}`);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error deleting post:', error);
                    });

                Swal.fire(firstName + "'s profile deleted!", '', 'success');
            }
        });
    }


    return (
        <Card sx={{ width: 350, margin: 3, }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <VerifiedIcon />
                    </IconButton>
                }
            />
            {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
            <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {
                    <Avatar sx={{ bgcolor: red[500], width: 70, height: 70 }} style={{ marginBottom: '15px', marginTop: '-20px' }}>
                        {userData.image ? (
                            <img src={userData.image} alt="User Avatar" />
                        ) : (
                            userData.fullname.charAt(0).toUpperCase()
                        )}
                    </Avatar>
                }
                <Typography variant="h6" color="text.secondary" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    {userData.fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                    {userData.userType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <LocationIcon sx={{ marginRight: '0', verticalAlign: 'middle' }} /> {userData.address}
                </Typography>

            </CardContent>
            <CardActions disableSpacing style={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handleInfoClick}>
                    <InfoIcon />
                </IconButton>
                <IconButton >
                    <ModeEditIcon />
                </IconButton>
                <IconButton >
                    <DeleteIcon onClick={handleDeleteClick} />
                </IconButton>
            </CardActions>

        </Card>
    );
}