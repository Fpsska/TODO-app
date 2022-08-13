import { useState, useEffect } from 'react';

import { Itodo } from '../types/todoTypes';

import { getRandomArrElement } from '../helpers/getRandomArrElement';

// /. imports


export function useFetchTodosData(limit = 5): any {

    const [todosData, setTodosData] = useState<Itodo[]>([]);
    const [isDataTLoading, setDataLoadingStatus] = useState<boolean>(true);


    useEffect(() => { // display Preloader component after update limit prop
        setDataLoadingStatus(true);

        const limitLoader = todosData.length !== 0 ?
            setTimeout(() => {
                setDataLoadingStatus(false);
            }, 700)
            : 'waiting';

        return () => {
            clearTimeout(limitLoader);
        };
    }, [limit]);


    const fetchTodosData = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?&_limit=${limit}`);

            if (!response.ok) {
                throw new Error('response error');
            }

            const data = await response.json();

            data.map((item: Itodo) => { // extend array by category, status fields
                item.category = getRandomArrElement(['#Groceries', '#College', '#Payments', '']);
                item.status = getRandomArrElement(['waiting', 'process', 'done', '']);
                item.completed = false;
                item.editable = false;
            });

            setTodosData(data);

            setTimeout(() => {
                setDataLoadingStatus(false);
            }, 1600);

        } catch (err: any) {
            setTimeout(() => {
                setDataLoadingStatus(false);
            }, 1600);

            throw new Error(`${err.message || err}`);
        }
    };

    return { todosData, setTodosData, isDataTLoading, fetchTodosData };

};
