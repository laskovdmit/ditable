import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto', sans-serif;
        src: url('fonts/Roboto-Regular.ttf') format('ttf');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Roboto', sans-serif;
        src: url('fonts/Roboto-Bold.ttf') format('ttf');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto', sans-serif;
        src: url('fonts/Roboto-Light.ttf') format('ttf');
        font-weight: 300;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto';
    }

    p {
        margin: 0;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyles;