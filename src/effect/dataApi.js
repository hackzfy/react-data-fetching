import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {actions, dataFetchReducer} from "../reducer/fetch";

export const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        loading: false,
        isError: false,
        data: initialData
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: actions.FETCH_INIT});
            try {
                const response = await axios(url);
                dispatch({type: actions.FETCH_SUCCESS, payload: response.data});
            } catch (e) {
                dispatch({type: actions.FETCH_FAILURE});
            }
        };
        fetchData();
    }, [url]);
    return [state, setUrl];
};