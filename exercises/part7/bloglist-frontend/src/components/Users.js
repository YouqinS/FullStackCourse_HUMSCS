import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

const Users = () => {
    const users = useSelector((state) => state.users)
    console.log("users: ", users)

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>username</th>
                    <th>number of blogs created</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

        </div>
    )
}

export default Users
