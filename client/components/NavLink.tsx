import { Link } from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';

interface Props {
    name: string;
    href: string;
}

const NavLink: FC<Props> = ({ name, href }) => {
    return (
        <NextLink href={href} as={href}>
            <Link p='2' mr='20'>
                {name}
            </Link>
        </NextLink>
    );
};

export default NavLink;
