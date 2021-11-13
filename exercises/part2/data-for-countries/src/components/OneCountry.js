import React from "react";

const OneCountry = ({country}) => {
    const languages = country.languages
    const flag = Object.values(country.flags)[0]
    return (

        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>languages</h3>
                <ul>
                    {Object.values(languages).map(language => <li>{language}</li>)}
                </ul>
            <img src={flag} alt="flag"/>
        </div>
    )
}

export default OneCountry
