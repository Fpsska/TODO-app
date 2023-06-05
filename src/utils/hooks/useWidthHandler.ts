import { useState, useEffect, useLayoutEffect } from 'react';

// /. imports

interface propTypes {
    min: number;
    max: number;
}

// /. interfaces

export function useWidthHandler(breakpoints: propTypes): {
    isAllowableRes: boolean;
} {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [isAllowableRes, setAllowableRes] = useState<boolean>(false);

    // /. hooks

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useLayoutEffect(() => {
        setAllowableRes(width > breakpoints.min && width < breakpoints.max);
    }, [width, breakpoints]);

    return { isAllowableRes };
}
