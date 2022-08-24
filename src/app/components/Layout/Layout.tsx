import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { switchTodosDataLoadingStatus, switchErrorStatus } from '../../../store/slices/todoSlice';

import { fetchTodosData } from '../../api/fetchTodosData';

import App from '../App/App';

// /. imports


const Layout: React.FC = () => {

    const { isTodosDataLoading } = useAppSelector(state => state.todoSlice);

    const dispatch = useAppDispatch();

    // give number argument for define limit of tetched todo items (5 as default)
    useEffect(() => {
        dispatch(fetchTodosData(5));
        setTimeout(() => {
            dispatch(switchTodosDataLoadingStatus({ status: false }));
        }, 1600);
        !isTodosDataLoading && setTimeout(() => {
            dispatch(switchErrorStatus({ status: null }));
        }, 3500);
    }, [isTodosDataLoading]);

    return (
        <App />
    );
};

export default Layout;