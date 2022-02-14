import { Alert } from '@chakra-ui/react';
import { FC } from 'react';

export const ErrorAlert: FC = () => {
    return <Alert bgColor='red.300'>Failed loading</Alert>;
};
