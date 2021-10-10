import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';

import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

function MyApp({ Component, pageProps }: any) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: false,
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
