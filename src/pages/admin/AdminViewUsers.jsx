import * as React from 'react';
import axios from 'axios';

export default function AdminViewUsers() {
    const [usersData, setUsersData] = React.useState({})

    console.log("AdminViewUsers rendered"); // Check if the component is rendered multiple times
    React.useEffect(() => {
        console.log("Fetching users...");
        const getUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5224/api/users");
                if (response.status === 200) {
                    setUsersData(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUsers();
    }, []); // Empty dependency array ensures that the effect runs only once

    return (
        <div>
            {/* <AsideBar /> */}
            <h1>Hello world! This is to view users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.length > 0 ? (
                        usersData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.userType}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
