import { useState, useEffect, useRef } from 'react';

// /. imports 

interface propTypes {
    initialStatus: boolean
}

// /. interfaces

export function useAreaHandler({ initialStatus }: propTypes): any {

    const [isVisible, setVisibleStatus] = useState<boolean>(initialStatus);
    const refEl = useRef<HTMLDivElement>(null!); // valid HTML-el (clickable) 

    useEffect(() => {
        const areaHandler = (e: any): void => {
            if (isVisible && refEl.current && !refEl.current.contains(e.target)) {
                setVisibleStatus(false);
            }
            // refEl.current HTML-el !== null/undefined && refEl.current.contains(e.target) === false =>
            // => valid HTML-el is exist
        };

        const keyHandler = (e: KeyboardEvent): void => {
            if (isVisible && e.code === 'Escape') {
                setVisibleStatus(false);
            }
        };

        document.addEventListener('click', areaHandler, true);
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('click', areaHandler, true);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [isVisible]);

    return { refEl, isVisible, setVisibleStatus };
}
