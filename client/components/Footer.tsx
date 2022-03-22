import { Box, Container, Flex, List, ListItem, Text, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import { DiscordIcon } from './CustomIcons';

export const Footer: FC = () => {
    return (
        <Flex as='footer' w='100%' minH='28' bgColor='gray.900' px='4' py='6'>
            <Container maxW='container.xl'>
                <Box mb='2'>
                    <Text fontSize='lg' color='gray.300'>
                        Contacts
                    </Text>
                    <List fontSize='md'>
                        <ListItem>
                            <Link
                                href='https://discord.gg/FpnZSyp32h'
                                color='facebook.300'
                                fontSize='inherit'
                                isExternal
                            >
                                <DiscordIcon mr='2' />
                                Discord
                            </Link>
                        </ListItem>
                    </List>
                </Box>
                <Flex w='100%' justifyContent='flex-end' h='20px'>
                    <Text>
                        Powered by <Link href='https://github.com/Skellord'>Skellord</Link>
                    </Text>
                </Flex>
            </Container>
        </Flex>
    );
};
