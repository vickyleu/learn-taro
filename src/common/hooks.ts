import {useState} from 'react';

// @ts-ignore
export function useButtonEffect(initialState = false,delay=100): [boolean, () => void, () => void]  {
    const [isPressed, setIsPressed] = useState(initialState);

    const handlePressDown = () => {
        setIsPressed(true);
    };

    const handlePressUp = () => {
        setTimeout(() => {
            setIsPressed(false);
        }, delay);
    };

    return [isPressed, handlePressDown, handlePressUp];
}
