import { background, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontSize: '16px',
                color: 'white',
                backgroundImage: "url('/img/tww3-background.jpg')",
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            },
        },
    },
});

export default theme;
