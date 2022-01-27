import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";

const Books = (props) => {
    const [showFiltered, setShowFiltered] = useState(false)
    const [filterGenre, setFilterGenre] = useState("")

    const result = useQuery(ALL_BOOKS)

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks
    console.log("books", result.data)

    let allGenres = []
    books.map(book => {
        allGenres.push.apply(allGenres, book.genres)
        allGenres = allGenres.filter((v, i, a) => a.indexOf(v) === i);
    })
    console.log("allGenres", allGenres)

    const showBooksByGenre = (genre) => {
        console.log("selected genre", genre)
        setShowFiltered(true)
        setFilterGenre(genre)
    }

    const booksToShow = showFiltered ? books.filter(book => book.genres.includes(filterGenre)) : books


    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {booksToShow.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div>
                {allGenres.map(g => <button onClick={() => showBooksByGenre(g)} key={g}>{g}</button>)}
                <button onClick={() => setShowFiltered(false)}>all genres</button>
            </div>
        </div>

    )
}

export default Books
