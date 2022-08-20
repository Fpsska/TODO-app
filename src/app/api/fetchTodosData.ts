import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports


export const fetchTodosData = createAsyncThunk(
    'mainSlice/fetchAlbumData',
    async (limit: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?&_limit=${limit}`);

            if (!response.ok) {
                throw new Error('response error');
            }

            const data = await response.json();
            return data;

        } catch (err: any) {

            return rejectWithValue(err.message); // send to case rejected.type of extreReducers 
        }
    }
);

