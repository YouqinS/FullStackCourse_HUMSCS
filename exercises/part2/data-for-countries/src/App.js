import React, {useState, useEffect} from 'react';
import axios from "axios";
import Search from "./components/Search";
import OneCountry from "./components/OneCountry";
import CountryShow from "./components/CountryShow";

function App() {
    const [countries, setCountries] = useState([])
    const [newSearchTerm, setNewSearchTerm] = useState('')


    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/name/" + newSearchTerm)
            .then(response => {
                setCountries(response.data)
            })
    }, [newSearchTerm])


    const handleSearchTermChange = (event) => {
        setNewSearchTerm(event.target.value)
    }

    const contentToShow = () => {
        if (countries.length > 0) {
            if (countries.length > 10) {
                return  <p>Too many countries, specify another filter</p>
            } else if (countries.length === 1) {
                return <OneCountry country={countries[0]}/>
            } else {
                return countries.map(c => <CountryShow country={c}/>)
            }
        }
    }

    return (
        <div>

            <div>
                <Search newSearchTerm={newSearchTerm} handleSearchTermChange={handleSearchTermChange}/>
            </div>

            <div>
                {contentToShow()}
            </div>

        </div>
    );
}

export default App;
