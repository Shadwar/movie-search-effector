import React from 'react';
import { searched, searchValueChanged, $searchValue } from './model';
import { createComponent } from 'effector-react';


const Search = createComponent($searchValue, (_, searchValue) => (
    <form className="search">
        <input value={searchValue} onChange={searchValueChanged} type="text" />
        <input onClick={searched} type="submit" value="SEARCH" />
    </form>
));

export default Search;
