import Blog from "./Blog";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)
    console.log("blogs: ", blogs)

    const sortedBlogs = () => {
        return blogs.sort((a, b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)).reverse()
    }

    return (
        <div>
            <h2>Blogs</h2>

            <Table striped>
                <thead>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>url</th>
                </tr>
                </thead>
                <tbody>
                {sortedBlogs().map(blog =>
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

export default Blogs
