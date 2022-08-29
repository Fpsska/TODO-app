import { useState, useEffect } from 'react';

// /. imports 

interface propTypes {
    key: any;
    action: string;
    initialValue: any
}

// /. interfaces

export function useLocalStorage({ key, action, initialValue }: propTypes): any {

    const getStorageValue = () => {
        const storage = localStorage.getItem(key); // return string || null

        if (storage) {
            return JSON.parse(storage); // return any[]
        }

        return initialValue; // if localStorage is empty by current key prop
    }

    const [value, setValue] = useState<any[]>(getStorageValue); // value = result of calling getStorageValue func

    useEffect(() => {   // update localStorage value for current key, action prop
        switch (action) {
            case 'add':
                localStorage.setItem(key, JSON.stringify(value));
                break;
        }
    }, [value])


    return [value, setValue];
}