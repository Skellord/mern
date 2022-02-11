import { Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { mainNavRoutes } from '../utils/routes';
import NavLink from './NavLink';

const Nav: FC = () => {
    return (
        <Grid
            templateColumns={'repeat(5, 1fr)'}
            gap={6}
            padding={'24px 56px'}
            fontWeight={600}
            textTransform={'uppercase'}
        >
            {mainNavRoutes.map(item => (
                <NavLink name={item.name} href={item.href} />
            ))}
        </Grid>
    );
};

export default Nav;
