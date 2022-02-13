import useSWR from 'swr';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const useRequest = (path: string, name?: string) => {
    const url = name ? baseUrl + path + '/' + name : baseUrl + path;
    console.log(url);
    const { data, error } = useSWR(url);

    return { data, error };
};
