import React from 'react';
import styles from '@/styles/login.module.css'; // Import the styles

const UserTable = () => {
    const users = [
        {
            username: "axl123",
            password: "password123",
            role: "user",
        },
        {
            username: "fleur123",
            password: "password123",
            role: "trainer",
        },
        {
            username: "jeroen123",
            password: "password123",
            role: "admin",
        },
        {
            username: "johan123",
            password: "password123",
            role: "trainer",
        },
    ];

    return (
        <div>
            <h1>User Table</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
