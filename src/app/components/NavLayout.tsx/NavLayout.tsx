import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../../store/hooks';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import CategoryForm from '../CategoryForm/CategoryForm';

// /. imports

interface propTypes {
    setEditableStatus: (arg: boolean) => void
}

// /. interfaces

const NavLayout: React.FC<propTypes> = (props) => {

    const { setEditableStatus } = props;


    const { navTemplatesData } = useAppSelector(state => state.navSlice);

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [breakpoint] = useState<number>(768);


    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <div className="page__nav">
            {width <= breakpoint
                ?
                <div className="page__nav-select">
                    <SelectMenu />
                </div>
                :
                <Nav
                    navTemplatesData={navTemplatesData}
                    setEditableStatus={setEditableStatus}
                />
            }
            <div className="page__category-form">
                <CategoryForm />
            </div>
        </div>
    );
}

export default NavLayout;