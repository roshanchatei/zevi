import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SnackbarProvider} from "notistack";
import Head from "next/head";
import {Box, CssBaseline} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <SnackbarProvider>
          <Head>
            <title>
              {"Zevi"}
            </title>
            <meta
                content="initial-scale=1, width=device-width"
                name="viewport"
            />
          </Head>
        </SnackbarProvider>
          <ThemeProvider theme={createTheme({
              palette: {
                  primary: {
                      main: '#319EFF',
                  },
                  secondary: {
                      main: '#545454',
                  },
              },
          })}>
          <CssBaseline />
          <Box width={'100%'} height={'100%'}>
            <Component {...pageProps} />
          </Box>
        </ThemeProvider>

      </>
  )
}
