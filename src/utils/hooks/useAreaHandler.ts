import { useState, useEffect, useRef, RefObject } from 'react';

// /. imports

interface propTypes {
    initialStatus: boolean;
}

interface returnTypes {
    refEl: RefObject<HTMLElement>;
    isVisible: boolean;
    setVisibleStatus: (arg: boolean) => void;
}

// /. interfaces

export function useAreaHandler({ initialStatus }: propTypes): returnTypes {
    const [isVisible, setVisibleStatus] = useState<boolean>(initialStatus);

    const refEl = useRef<HTMLElement>(null!); // valid HTML-el (clickable)

    // /. hooks

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

    // /. effects

    return { refEl, isVisible, setVisibleStatus };
}
