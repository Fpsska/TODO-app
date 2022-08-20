import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import { fetchTodosData } from '../../api/fetchTodosData';

import App from '../App/App';

// /. imports


const Layout: React.FC = () => {


    const dispatch = useAppDispatch();

    // give number argument for define limit of tetched todo items (5 as default)
    useEffect(() => { 
        dispatch(fetchTodosData(5));
    }, [])

    // const [title, setTitle] = useState<string>('All');


    // useEffect(() => { // save data from hook
    //     setTodosData(data);
    // }, [data]);

    // useEffect(() => { // save data from hook
    //     setFilteredTodosData(todosData);
    // }, [todosData]);

    return (<App />);
};

export default Layout;