import React, { useState, useEffect } from 'react';

import { MyContext } from '../../context/context';

import { Itodo } from '../../types/todoTypes';

import { useFetchTodosData } from '../../api/useFetchTodosData';

import App from '../App/App';

// /. imports


const Layout: React.FC = () => {

    // give number argument for define limit of tetched todo items (5 as default)
    const { data, isDataTLoading, fetchTodosData, error } = useFetchTodosData();

    const [todosData, setTodosData] = useState<Itodo[]>(data); // []
    const [filteredTodosData, setFilteredTodosData] = useState<Itodo[]>(todosData); // []
    const [title, setTitle] = useState<string>('All');

    const contextData = {
        todosData,
        setTodosData,
        filteredTodosData,
        setFilteredTodosData,
        isDataTLoading,
        error,
        title,
        setTitle
    }

    useEffect(() => { // get todosData at initial App.tsx render
        fetchTodosData();
    }, []);

    useEffect(() => { // save data from hook
        setTodosData(data);
    }, [data]);

    useEffect(() => { // save data from hook
        setFilteredTodosData(todosData);
    }, [todosData]);

    return (
        <MyContext.Provider value={contextData}>
            <App />
        </MyContext.Provider>
    );
};

export default Layout;