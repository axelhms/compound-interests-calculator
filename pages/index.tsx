import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

interface Values {
	initialInvestment: number;
	interestRate: number;
	term: number;
}

const Home: NextPage = () => {
	const initialValues: Values = {
		initialInvestment: 0,
		interestRate: 0,
		term: 0,
	};

	return (
		<Wrapper variant="regular">
			<Heading>Calculator</Heading>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}}
			>
				<Form>
					<Box mt={4}>
						<InputField
							name="initialInvestment"
							label="Initial investment"
						/>
					</Box>

					<Box mt={4}>
						<InputField
							name="interestRate"
							label="Interest rate (%)"
						/>
					</Box>

					<Box mt={4}>
						<InputField name="term" label="Term (in years)" />
					</Box>

					<Flex>
						<Button mt={4} ml="auto" type="submit">
							Submit
						</Button>
					</Flex>
				</Form>
			</Formik>
		</Wrapper>
	);
};

export default Home;
