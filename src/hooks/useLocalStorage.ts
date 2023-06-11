import { useEffect, useState } from 'react';
import { LocalStorageValue } from '../types/localStorage';

function useLocalStorage<T>(
    key: string,
    initialValue?: T
): [LocalStorageValue<T>, (value: T) => void] {
    const [value, setValue] = useState<LocalStorageValue<T>>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Cannot read value from local storage: ', error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Cannot set item into local storage', error);
        }
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;
