import {useState, useEffect} from 'react';

export const useChangingState = <T,>(initialState: T) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {setState(state);}, [state]);

    return [state, setState];
};
