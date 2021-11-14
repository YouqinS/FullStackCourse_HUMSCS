import React, {useState} from "react";
import OneCountry from "./OneCountry";

const CountryShow = ({country}) => {
    const [showCountryView, setShowCountryView] = useState(false)

    function showHideCountryView() {
        setShowCountryView(!showCountryView)
    }

    const contentToShow = () => {
      return  showCountryView ? <OneCountry country={country}/> : <p> </p>
    }

    return (

        <div>
            <p>{country.name.common} <button onClick={showHideCountryView}>{showCountryView ? "hide" : "show"}</button></p>
            <div>{contentToShow()}</div>
        </div>
    )
}

export default CountryShow
