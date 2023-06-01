import { useState, useEffect, useRef } from 'react';

// /. imports

interface propTypes {
    initialStatus: boolean;
}

// /. interfaces

export function useAreaHandler({ initialStatus }: propTypes): any {
    const [isVisible, setVisibleStatus] = useState<boolean>(initialStatus);
    const refEl = useRef<HTMLDivElement>(null!); // valid HTML-el (clickable)

    useEffect(() => {
        if (!isVisible) return;

        const areaHandler = (e: any): void => {
            if (refEl.current && !refEl.current.contains(e.target)) {
                setVisibleStatus(false);
            }
        };

        const keyHandler = (e: KeyboardEvent): void => {
            if (e.code === 'Escape') {
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
