import React, { useEffect } from 'react';

import { getCurrentArrItem } from 'utils/helpers/getCurrentArrItem';

import { setSelectNavOption, switchNavActiveStatus } from 'app/slices/navSlice';

import { Iselect } from 'types/selectTypes';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import {
    // setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setFilterCompareValue,
    setInputTitleValue
} from 'app/slices/todoSlice';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

const SelectMenu: React.FC = () => {
    const {
        todosData,
        filterCompareValue,
        currentTodoID,
        isTodosDataLoading,
        currentTodosCount,
        error
    } = useAppSelector(state => state.todoSlice);

    const { selectTemplatesData, selectNavOption, navTemplatesData } =
        useAppSelector(state => state.navSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // update selectNavDataFromStorage value
        localStorage.setItem(
            'selectNavDataFromStorage',
            JSON.stringify(selectTemplatesData)
        );
    }, [selectTemplatesData, navTemplatesData]);

    const selectMenuHandler = (value: string, e: any): void => {
        switch (value) {
            case value:
                dispatch(
                    setFilterCompareValue({
                        filterCompareValue: value.toLowerCase().trim()
                    })
                ); // update prop for filter.ts func for real-time filtering
                dispatch(setSelectNavOption({ option: value })); // switch nav-select value
                dispatch(
                    switchNavActiveStatus({
                        id: getCurrentArrItem(
                            navTemplatesData,
                            'category',
                            value.toLowerCase().trim()
                        )?.id,
                        status: true
                    })
                ); // two-way sync with NavTemplate.tsx for correct filtering

                dispatch(
                    setInputTitleValue({
                        title: [...e.target.childNodes]
                            .find(item => item.value === value)
                            .innerText.trim()
                    })
                ); // update text comtent of title__input
                dispatch(
                    switchTodosItemEditableStatus({
                        id: currentTodoID,
                        status: false
                    })
                ); // disable editable todo when filtering todosData[]
                break;
            default:
                dispatch(setFilterCompareValue({ filterCompareValue: 'all' }));
                dispatch(setSelectNavOption({ option: 'All' }));
                dispatch(
                    switchNavActiveStatus({
                        id: getCurrentArrItem(
                            navTemplatesData,
                            'category',
                            'all'
                        )?.id,
                        status: true
                    })
                );

                dispatch(setInputTitleValue({ title: 'All' }));
                dispatch(
                    switchTodosItemEditableStatus({
                        id: currentTodoID,
                        status: false
                    })
                );
        }
    };

    return (
        <select
            className="nav-select"
            value={selectNavOption}
            disabled={isTodosDataLoading || error}
            onChange={e =>
                !isTodosDataLoading &&
                !error &&
                selectMenuHandler(e.target.value, e)
            }
        >
            {selectTemplatesData.map((item: Iselect) => {
                return (
                    <SelectTemplate
                        key={item.id}
                        {...item}
                    />
                );
            })}
        </select>
    );
};

export default SelectMenu;
