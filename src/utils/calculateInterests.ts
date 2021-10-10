import { CompoundInterest, ValuesType } from '../common/types';

export function calculateInterest({
	initialInvestment,
	interestRate,
	period,
	monthlyContributions,
}: ValuesType): Array<CompoundInterest> | null {
	let futureInvestmentValue: Array<number> = [initialInvestment];
	let interestsEarned: Array<number> = [0];

	let result: Array<CompoundInterest> = [];

	interestRate = 1 + interestRate / 100;

	if (monthlyContributions === 0) {
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

			result.push({
				period: i,
				interestsEarned: interestsEarnedRoundResult,
				futureInvestmentValue: futureInvestmentRoundResult,
			});
		}

		return result;
	} else {
		return null;
	}
}
