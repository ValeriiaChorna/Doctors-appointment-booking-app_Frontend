import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  styles: {
    global: {
      'html, body': {
        padding: '30px',
        backgroundColor: 'grey.50',
        lineHeight: 'tall',
        // fontSize: ,
      },
      a: {
        color: '#00a699',
        textDecoration: 'underline'
      },
    },
  },
});

export type Theme = typeof theme;

export default theme;
