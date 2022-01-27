import React, {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {ALL_BOOKS, ME} from "../queries";

const Recommend = ({show}) => {
    const [favoriteGenre, setFavoriteGenre] = useState("");
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [getFavoriteBooks, booksData] = useLazyQuery(ALL_BOOKS, {
        variables: {genre: favoriteGenre},
        pollInterval: 10000,
    })

    const me = useQuery(ME)

    useEffect(() => {
        if (me.data && me.data.me) {
            setFavoriteGenre(me.data.me.favoriteGenre)
            getFavoriteBooks()
        }
    }, [me.data, getFavoriteBooks]);

    useEffect(() => {
        if (booksData.data && booksData.data.allBooks) {
            setFavoriteBooks(booksData.data.allBooks)
            console.log("booksData.data.allBooks", booksData.data.allBooks)
            console.log("favoriteBooks", favoriteBooks)
        }
    }, [booksData.data, setFavoriteBooks]);



    if (!show) {
        return null
    }

    if (me.loading || booksData.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

            <table>
                <tbody>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {favoriteBooks.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>

    )
}

export default Recommend
