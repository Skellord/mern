import useSWR from 'swr';
import { BASE_URL } from '../api/api';

export const useRequest = (path: string, name?: string) => {
    const url = name ? BASE_URL + path + '/' + name : BASE_URL + path;
    const { data, error } = useSWR(url);

    return { data, error };
};
