import { Center, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import LinkButton from './LinkButton';
import NextLink from 'next/link';

interface Props {
    name: string;
    href: string;
}

const NavLink: FC<Props> = ({ name, href }) => {
    return (
        <GridItem>
            <Center>
                <NextLink href={href} passHref>
                    <LinkButton href={href}>{name}</LinkButton>
                </NextLink>
            </Center>
        </GridItem>
    );
};

export default NavLink;
