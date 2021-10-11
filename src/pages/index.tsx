import { Box, Flex } from '@chakra-ui/layout';
import {
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorMode,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
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

	const { colorMode, toggleColorMode } = useColorMode();
	const [result, updateResult] = useState<any>();
	const [showTable, updateShowTable] = useState<boolean>(false);

	return (
		<Layout>
			<Box mr={8} ml={8}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values: any, actions: any) => {
						if (values.monthlyContributions === 0) {
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
							<InputField
								name="period"
								label="Period (in years)"
							/>
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
					<>
						<Flex
							mt={4}
							justifyContent="center"
							flexDirection="column"
						>
							<Box mt={4}>
								In {result[result.length - 1].period}{' '}
								{result[result.length - 1].period > 1
									? 'years'
									: 'year'}{' '}
								you will have{'  '}
								{
									result[result.length - 1]
										.futureInvestmentValue
								}
								€ of which{' '}
								{result[result.length - 1].totalInterestsEarned}
								€ comes from interests.
							</Box>

							<Box mt={4} mr="auto" ml="auto" mb={8}>
								<AreaChart
									width={800}
									height={400}
									data={result}
									margin={{
										top: 10,
										right: 30,
										left: 0,
										bottom: 0,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="period"
										stroke={
											colorMode === 'light'
												? 'black'
												: 'white'
										}
									/>
									<YAxis
										stroke={
											colorMode === 'light'
												? 'black'
												: 'white'
										}
									/>
									<Tooltip />
									<Area
										type="monotone"
										dataKey="futureInvestmentValue"
										name="Future investment value"
										stackId="1"
										stroke="#415EFF"
										fill="#415EFF"
									/>
									<Area
										type="monotone"
										dataKey="investedCapital"
										name="Invested capital"
										stackId="2"
										stroke="#ff00ff"
										fill="#ff00ff"
									/>
								</AreaChart>
							</Box>
							<Button
								w="25%"
								mr="auto"
								ml="auto"
								mb={8}
								onClick={() => {
									updateShowTable(
										showTable === true ? false : true
									);
								}}
							>
								{showTable === true
									? 'Hide table'
									: 'Show table'}
							</Button>
						</Flex>

						{!showTable ? null : (
							<Flex flexDirection="column">
								<Box overflowX="auto">
									<Table mb={8}>
										<Thead>
											<Tr>
												<Th>Year</Th>
												{result[0].investedCapital &&
												result[0].investedCapital !==
													0 ? (
													<Th isNumeric>
														Invested capital
													</Th>
												) : null}
												<Th isNumeric>
													Interests earned per year
												</Th>
												<Th isNumeric>
													Total interests earned
												</Th>
												<Th isNumeric>
													Future investment value
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{result.map(
												(
													interest: CompoundInterest
												) => {
													return (
														<Tr>
															<Td>
																{
																	interest.period
																}
															</Td>
															{result[0]
																.investedCapital &&
															result[0]
																.investedCapital !==
																0 ? (
																<Td isNumeric>
																	{
																		interest.investedCapital
																	}
																</Td>
															) : null}
															<Td isNumeric>
																{
																	interest.interestsEarned
																}
															</Td>
															<Td isNumeric>
																{
																	interest.totalInterestsEarned
																}
															</Td>
															<Td isNumeric>
																{
																	interest.futureInvestmentValue
																}
															</Td>
														</Tr>
													);
												}
											)}
										</Tbody>
									</Table>
								</Box>
							</Flex>
						)}
					</>
				)}
			</Box>
		</Layout>
	);
};

export default Home;
