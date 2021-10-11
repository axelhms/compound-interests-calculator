import { Box, Flex } from '@chakra-ui/layout';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { CompoundInterest, ValuesType } from '../common/types';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { calculateCompoundInterest } from '../utils/calculateCompoundInterest';
import { calculateSimpleInterest } from '../utils/calculateSimpleInterest';

const Home: NextPage = () => {
	const initialValues: ValuesType = {
		initialInvestment: 1000,
		interestRate: 5,
		period: 10,
		monthlyContributions: 0,
	};

	const [result, updateResult] = useState<any>();

	return (
		<Layout>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					if (
						values.monthlyContributions === 0 ||
						values.monthlyContributions === ''
					) {
						updateResult(calculateSimpleInterest(values));
						actions.setSubmitting(false);
					} else {
						updateResult(calculateCompoundInterest(values));
						actions.setSubmitting(false);
					}
				}}
			>
				<Form>
					<Box mt={4}>
						<InputField
							name="initialInvestment"
							label="Initial investment (in €)"
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
							label="Monthly contributions (in €)"
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
						which {result[result.length - 1].totalInterestsEarned}€
						comes from interests.
					</Box>

					<Table mt={4} mb={4}>
						<Thead>
							<Tr>
								<Th>Year</Th>
								{result[0].investedCapital &&
								result[0].investedCapital !== 0 ? (
									<Th isNumeric>Invested capital</Th>
								) : null}
								<Th isNumeric>Interests earned per year</Th>
								<Th isNumeric>Total interests earned</Th>
								<Th isNumeric>Future investment value</Th>
							</Tr>
						</Thead>
						<Tbody>
							{result.map((interest: CompoundInterest) => {
								return (
									<Tr>
										<Td>{interest.period}</Td>
										{result[0].investedCapital &&
										result[0].investedCapital !== 0 ? (
											<Td isNumeric>
												{interest.investedCapital}
											</Td>
										) : null}
										<Td isNumeric>
											{interest.interestsEarned}
										</Td>
										<Td isNumeric>
											{interest.totalInterestsEarned}
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
