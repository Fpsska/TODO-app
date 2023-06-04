import React, { useEffect } from 'react';

import { setSelectNavOption, switchNavActiveStatus } from 'app/slices/navSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setFilterCompareValue, setTaskTitleValue } from 'app/slices/todoSlice';

import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

import { Inav } from 'types/navTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

const SelectMenu: React.FC = () => {
    const { isTodosDataLoading, error } = useAppSelector(
        state => state.todoSlice
    );

    const { selectNavOption, navTemplatesData } = useAppSelector(
        state => state.navSlice
    );

    const dispatch = useAppDispatch();

    const isSelectAvailable = !isTodosDataLoading && !error;

    const selectMenuHandler = (value: string): void => {
        dispatch(
            setFilterCompareValue({
                filterCompareValue: makeStringFormatting(value)
            })
        ); // update prop for real-time filtering

        dispatch(setSelectNavOption({ option: value })); // switch nav-select value

        dispatch(setTaskTitleValue({ title: value })); // update text content of title__form
    };

    useEffect(() => {
        // equaled displaying nav UI (mobile/desktop)
        const targetNavTemplate = navTemplatesData.find(
            item => makeStringFormatting(item.category) === selectNavOption
        );

        dispatch(
            switchNavActiveStatus({
                id: targetNavTemplate
                    ? targetNavTemplate.id
                    : navTemplatesData[0].id,
                status: true
            })
        );
    }, [navTemplatesData, selectNavOption]);

    return (
        <select
            className="nav-select"
            value={selectNavOption}
            disabled={!isSelectAvailable}
            onChange={e =>
                isSelectAvailable && selectMenuHandler(e.target.value)
            }
        >
            {navTemplatesData.map((item: Inav) => {
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
