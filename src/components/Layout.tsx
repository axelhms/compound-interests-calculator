import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import Wrapper, { WrapperVariant } from './Wrapper';
import Navbar from './Navbar';
import { useColorMode } from '@chakra-ui/react';

interface LayoutProps {
	variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
	const { colorMode } = useColorMode();

	return (
		<Flex flexDirection="column">
			<Navbar />
			<Wrapper variant={variant}>{children}</Wrapper>
			<Box
				bgColor={colorMode === 'light' ? 'white' : 'dark'}
				color={colorMode === 'light' ? 'dark' : 'white'}
				mt={-1}
				h="100%"
			></Box>
		</Flex>
	);
};

export default Layout;
