import { Box, Container, Flex, List, ListItem, Text, Link, HStack, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { SiDiscord } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';

export const Footer: FC = () => {
    return (
        <Flex as='footer' w='100%' minH='28' bgColor='gray.900' px='4' py='6'>
            <Container maxW='container.xl'>
                <Flex justifyContent='flex-end' mb='2'>
                    <HStack fontSize='md'>
                        <Link href='https://discord.gg/FpnZSyp32h' mr='8' display='flex' alignItems='center' isExternal>
                            <Icon mr='2' as={SiDiscord} />
                            Discord
                        </Link>
                        <Link href='https://github.com/Skellord' display='flex' alignItems='center' isExternal>
                            <Icon mr='2' as={AiFillGithub} />
                            Github
                        </Link>
                    </HStack>
                </Flex>
            </Container>
        </Flex>
    );
};
