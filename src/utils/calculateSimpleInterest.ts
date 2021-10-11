import { CompoundInterest, ValuesType } from '../common/types';

export function calculateSimpleInterest({
	initialInvestment,
	interestRate,
	period,
}: ValuesType): Array<CompoundInterest> {
	let futureInvestmentValue: Array<number> = [initialInvestment];
	let interestsEarned: Array<number> = [0];
	let totalInterestsEarned: number = 0;

	let result: Array<CompoundInterest> = [];

	interestRate = 1 + interestRate / 100;

	console.log('simple');

	for (let i: number = 1; i <= period; i++) {
		let futureInvestmentResult =
			futureInvestmentValue[i - 1] * interestRate;
		let futureInvestmentRoundResult =
			Math.round(futureInvestmentResult * 1e2) / 1e2;

		futureInvestmentValue.push(futureInvestmentRoundResult);

		let interestsEarnedResult =
			futureInvestmentValue[i] - futureInvestmentValue[i - 1];
		let interestsEarnedRoundResult =
			Math.round(interestsEarnedResult * 1e2) / 1e2;

		interestsEarned.push(interestsEarnedRoundResult);

		totalInterestsEarned =
			totalInterestsEarned + interestsEarnedRoundResult;
		let totalInterestsEarnedRoundResult =
			Math.round(totalInterestsEarned * 1e2) / 1e2;

		result.push({
			period: i,
			interestsEarned: interestsEarnedRoundResult,
			totalInterestsEarned: totalInterestsEarnedRoundResult,
			futureInvestmentValue: futureInvestmentRoundResult,
		});
	}

	return result;
}
