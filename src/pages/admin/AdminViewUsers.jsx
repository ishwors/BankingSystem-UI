import * as React from 'react';
import axios from 'axios';

import UserCard from '../../components/UserCard';

export default function AdminViewUsers() {
    const [usersData, setUsersData] = React.useState({})

    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the JWT token
    const config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    };

    console.log("AdminViewUsers rendered");
    React.useEffect(() => {
        console.log("Fetching users...");
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5224/api/users',{
                    withCredentials: true, // Add withCredentials option
                    headers: config.headers // Send token in headers
                  });
                if (response.status === 200) {
                    setUsersData(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUsers();
    }, []); // Empty dependency array ensures that the effect runs only once

    return (
        <div>
            <h1>All Registered Users</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', }}>

                {usersData.length > 0 ? (
                    usersData.map((user) => (
                        <UserCard key={user.id} userData={user} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No users found</td>
                    </tr>
                )}

            </div>
        </div>
    );
}
