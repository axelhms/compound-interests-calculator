import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Heading,
	Link,
	useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box zIndex={1} position="sticky" top={0}>
			<Box
				h="8px"
				bgGradient="linear-gradient(135deg, rgb(87, 112, 255) 0px, rgb(255, 117, 179) 60%, rgb(255, 124, 107) 100%)"
			></Box>
			<Flex
				p={4}
				bgColor={colorMode === 'light' ? 'white' : 'darkItem'}
				color={colorMode === 'light' ? 'dark' : 'white'}
				shadow={colorMode === 'light' ? 'md' : 'none'}
			>
				<NextLink href="/">
					<Link ml={2} style={{ textDecoration: 'none' }}>
						<Heading color="blue">Investment Calculator</Heading>
					</Link>
				</NextLink>

				<Button onClick={() => toggleColorMode()} ml="auto">
					{colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
				</Button>
			</Flex>
		</Box>
	);
};

export default Navbar;
