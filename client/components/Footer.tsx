import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <Flex as='footer' w='100%' h='28' bgColor='gray.900' px='3' justifyContent='space-evenly'>
            <Box>
                <Text>Contacts</Text>
            </Box>
        </Flex>
    );
};
