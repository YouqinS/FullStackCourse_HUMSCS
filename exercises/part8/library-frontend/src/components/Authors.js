import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_AUTHORS} from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = (props) => {

    const result = useQuery(ALL_AUTHORS)

    console.log(result.data)

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    const authorNames = authors.map(a => a.name.toLowerCase())

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>
                        born
                    </th>
                    <th>
                        books
                    </th>
                </tr>
                {authors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <BirthYearForm setError={props.setError} authorNames={authorNames}/>
        </div>
    )
}

export default Authors
