import React from "react";

const Search = (props) => {

    return (
        <div>
            find countries: <input value={props.newSearchTerm} onChange={props.handleSearchTermChange}/>
        </div>
    )
}

export default Search
