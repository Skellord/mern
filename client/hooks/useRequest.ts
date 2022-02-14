import useSWR from 'swr';
import { baseUrl } from '../utils/api.util';

export const useRequest = (path: string, name?: string) => {
    const url = name ? baseUrl + path + '/' + name : baseUrl + path;
    const { data, error } = useSWR(url);

    return { data, error };
};
