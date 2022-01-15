import React from "react";
import {Link, Redirect, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";

const User = () => {
    const {
        params: { id: userIdMatch },
    } = useRouteMatch('/users/:id')

    const user = useSelector((state) => state.users.find((u) => u.id === userIdMatch))
    console.log("user", user)

    if (!user) {
        return <Redirect to="/users" />
    }

    return (
        <div>
            <h2>username: {user.username}</h2>

            <h4>added blogs</h4>

            <Table striped>
                <thead>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>url</th>
                </tr>
                </thead>
                <tbody>
                {user.blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                        <td>
                            {blog.author}
                        </td>
                        <td>
                            {blog.url}
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

        </div>
    )
}

export default User
