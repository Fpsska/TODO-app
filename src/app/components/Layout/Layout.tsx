import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { switchTodosDataLoadingStatus } from '../../../store/slices/todoSlice';

import { fetchTodosData } from '../../api/fetchTodosData';

import App from '../App/App';

// /. imports


const Layout: React.FC = () => {

    const { status, error } = useAppSelector(state => state.todoSlice);

    const dispatch = useAppDispatch();

    // give number argument for define limit of tetched todo items (5 as default)
    useEffect(() => {
        dispatch(fetchTodosData(5));
    }, []);

    useEffect(() => {
        if (status === 'success' && !error) {
            setTimeout(() => {
                dispatch(switchTodosDataLoadingStatus({ status: false }));
            }, 1600);
        }
    }, [status, error]);

    return (
        <App />
    );
};

export default Layout;