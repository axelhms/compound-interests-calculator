import { Box, Flex } from '@chakra-ui/layout';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { CompoundInterest, ValuesType } from '../common/types';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { calculateInterest } from '../utils/calculateInterests';

const Home: NextPage = () => {
	const initialValues: ValuesType = {
		initialInvestment: 1000,
		interestRate: 5,
		period: 1,
		monthlyContributions: 0,
	};

	const [result, updateResult] = useState<any>();

	return (
		<Layout>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					// Caster values en number
					updateResult(calculateInterest(values));
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
						<InputField name="period" label="Period (in years)" />
					</Box>

					<Box mt={4}>
						<InputField
							name="monthlyContributions"
							label="Monthly contributions (optional)"
						/>
					</Box>

					<Flex>
						<Button mt={4} ml="auto" type="submit">
							Submit
						</Button>
					</Flex>
				</Form>
			</Formik>

			{!result ? null : (
				<Flex flexDirection="column">
					<Box mt={4}>
						In {result[result.length - 1].period}{' '}
						{result[result.length - 1].period > 1
							? 'years'
							: 'year'}{' '}
						you will have{' '}
						{result[result.length - 1].futureInvestmentValue}€ of
						which {result[result.length - 1].interestsEarned}€ comes
						from interests.
					</Box>

					<Table mt={4}>
						<Thead>
							<Tr>
								<Th>Year</Th>
								<Th isNumeric>Interests earned</Th>
								<Th isNumeric>Future investment value</Th>
							</Tr>
						</Thead>
						<Tbody>
							{result.map((interest: CompoundInterest) => {
								return (
									<Tr>
										<Td>{interest.period}</Td>
										<Td isNumeric>
											{interest.interestsEarned}
										</Td>
										<Td isNumeric>
											{interest.futureInvestmentValue}
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</Flex>
			)}
		</Layout>
	);
};

export default Home;
