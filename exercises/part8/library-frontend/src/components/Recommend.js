import React from "react";
import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ME} from "../queries";

const Recommend = () => {
    const me = useQuery(ME)
    console.log("me", me.data)

    const all_books = useQuery(ALL_BOOKS)

    if (all_books.loading || me.loading) {
        return <div>loading...</div>
    }

    const books = all_books.data.allBooks
    console.log("books", all_books.data)

    const favoriteGenre = me.data.me.favoriteGenre;
    const myFavoriteBooks = books.filter(b => b.genres.includes(favoriteGenre))

    console.log(myFavoriteBooks)
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
                {myFavoriteBooks.map(a =>
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
