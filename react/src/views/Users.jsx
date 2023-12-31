import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext(); 

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setUsers(data.data);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const onDelete = user => {
        if(!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${user.id}`)
        .then(() => {
            setNotification("User deleted successfully!");
            getUsers();
        })

    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Users</div>
                <Link to="/users/new">New User</Link>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link to={`/users/${user.id}`}>Edit</Link>
                                            <button onClick={e => onDelete(user)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}
