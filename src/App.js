import React, {useState} from 'react';
import {useDataApi} from "./effect/dataApi";
import {debounce} from "./util/debounce";


const api = 'https://hn.algolia.com/api/v1/search?query=';
const genApiUrlWithQuery = (query) => `${api}${query}`;
const debounceTime = 2000;
const initialQuery = 'redux';
const initialData = {hits: []};
const errorMsg = 'Something went wrong ...';
const loadingMsg = 'Loading ...';

const App = () => {
    const [query, setQuery] = useState(initialQuery);
    const [{data, loading, error}, doFetch] = useDataApi(
        genApiUrlWithQuery(query),
        initialData
    );
    const [debounceSearch] = useState(
        () => debounce(
            query => doFetch(genApiUrlWithQuery(query)),
            debounceTime,
            setQuery
        )
    );
    return (
        <>
            <input type="text" value={query}
                   onChange={e => debounceSearch(e.target.value)}/>
            {error && <div>{errorMsg}</div>}
            {loading ? <div>{loadingMsg}</div> : <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>}
        </>

    )
};

export default App;
