import { extendTheme } from '@chakra-ui/react';
import '@fontsource/eb-garamond';

const theme = extendTheme({
    fonts: {
        body: 'EB Garamond, Open Sans, sans-serif',
        heading: 'EB Garamond, Open Sans, sans-serif',
    },
    styles: {
        global: {
            body: {
                minHeight: '100vh',
                fontSize: '16px',
                color: 'white',
                backgroundImage: "url('/img/tww3-background.jpg')",
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            },
        },
    },
    colors: {
        crimson: {
            50: '#ffe8e8',
            100: '#f2bfbf',
            200: '#e89595',
            300: '#df6c6c',
            400: '#d64341',
            500: '#bd2b29',
            600: '#93211f',
            700: '#6a1716',
            800: '#400d0d',
            900: '#190202',
        },
        black: {
            900: '#0d0c0c',
            300: '#433d3d',
        },
        gradient: {
            health: 'linear-gradient(180deg, #293708, #81bc12, #9ee616, #8ccc14, #7ab211, #71a510, #7ab211, #8ccc14, #9ee616, #81bc12, #293708)',
            stats: 'linear-gradient(to right, #2a0d0a, #100c0d)',
        },
    },
    shadows: {
        text: '-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    },
    height: {
        header: '56px',
        footer: '112px',
    },
});

export default theme;
