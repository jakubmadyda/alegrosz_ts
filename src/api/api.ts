import { ApiType } from '../types/api';

export async function getData<T>({ endpoint, signal }: ApiType): Promise<T[]> {
    const init: { signal?: AbortSignal } = {};
    if (signal !== undefined) {
        init.signal = signal;
    }

    const response = await fetch(`/api/v1/${endpoint}`, init);

    return response.json();
}
