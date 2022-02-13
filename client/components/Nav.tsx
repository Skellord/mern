import { Container, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { mainNavRoutes } from '../utils/routes';
import NavLink from './NavLink';

const Nav: FC = () => {
    return (
        <Container maxW='container.xl' bgColor='blue.900'>
            <Grid templateColumns='repeat(5, 1fr)' gap={6} py='4' px='8' fontWeight={600} textTransform='uppercase'>
                {mainNavRoutes.map(item => (
                    <NavLink name={item.name} href={item.href} />
                ))}
            </Grid>
        </Container>
    );
};

export default Nav;
