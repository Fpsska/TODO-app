import React, { useState, useEffect } from 'react';

import { Idraggable } from '../../types/draggableSettingsTypes';

import './draggable.scss';

// /. imports 

interface propTypes {
    children: JSX.Element;
}


// /. interfaces

const DraggableWrapper: React.FC<propTypes> = (props) => {

    const { children } = props;

    const [draggableSettings, setDraggableSettings] = useState<Idraggable>({
        isDragging: false,
        originalX: 0,
        originalY: 0,

        translateX: 0,
        translateY: 0,

        lastTranslateX: 0,
        lastTranslateY: 0
    });

    useEffect(() => {
        console.log(draggableSettings)
    }, [draggableSettings])

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);


    const handleMouseDown = (e: any): void => {
        e.preventDefault();
        window.addEventListener('mousemove', e => handleMouseMove(e));
        window.addEventListener('mouseup', handleMouseUp);

        setDraggableSettings((prevState: Idraggable) => {
            return {
                ...prevState,
                originalX: e.clientX,
                originalY: e.clientY,
                isDragging: true
            }
        })
    };

    const handleMouseMove = (e: any): void => {

        if (!draggableSettings.isDragging) {
            return;
        }

        setDraggableSettings((prevState: Idraggable) => { // work with previous state 
            return {
                ...prevState,
                translateX: e.clientX - prevState.originalX + prevState.lastTranslateX,
                translateY: e.clientY - prevState.originalY + prevState.lastTranslateY,
            }
        });
    };

    const handleMouseUp = (): void => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        console.log(draggableSettings)

        setDraggableSettings((prevState: Idraggable) => {
            return {
                ...prevState,
                originalX: 0,
                originalY: 0,
                lastTranslateX: draggableSettings.translateX, // draggableSettings / prevState
                lastTranslateY: draggableSettings.translateY, // draggableSettings / prevState
                isDragging: false
            }
        });
    };

    return (
        <div className="draggable"
            onMouseDown={e => handleMouseDown(e)}
            data-x={String(draggableSettings.originalX)}
            data-y={String(draggableSettings.originalY)}
            data-tx={String(draggableSettings.translateX)}
            data-ty={String(draggableSettings.translateY)}
            data-status={String(draggableSettings.isDragging)}
            style={{ transform: `translate(${draggableSettings.translateX}px, ${draggableSettings.translateY}px)` }}
        >
            {children}
        </div>
    )
};

export default DraggableWrapper;