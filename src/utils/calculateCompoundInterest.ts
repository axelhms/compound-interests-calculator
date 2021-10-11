import { CompoundInterest, ValuesType } from '../common/types';

export function calculateCompoundInterest({
	initialInvestment,
	interestRate,
	period,
	monthlyContributions,
}: ValuesType): Array<CompoundInterest> {
	let futureInvestmentValue: Array<number> = [initialInvestment];
	let interestsEarned: Array<number> = [0];
	let totalInterestsEarned: number = 0;
	let investedCapital: Array<number> = [initialInvestment];

	let result: Array<CompoundInterest> = [];

	interestRate = 1 + interestRate / 100;

	for (let i: number = 1; i <= period; i++) {
		let investedCapitalResult =
			investedCapital[i - 1] + monthlyContributions * 12;
		let investedCapitalRoundResult =
			Math.round(investedCapitalResult * 1e2) / 1e2;

		investedCapital.push(investedCapitalRoundResult);

		let futureInvestmentContribResult =
			futureInvestmentValue[i - 1] + monthlyContributions * 12;

		let futureInvestmentResult =
			futureInvestmentContribResult * interestRate;
		let futureInvestmentRoundResult =
			Math.round(futureInvestmentResult * 1e2) / 1e2;

		futureInvestmentValue.push(futureInvestmentRoundResult);

		let interestsEarnedResult =
			futureInvestmentValue[i] - futureInvestmentContribResult;
		let interestsEarnedRoundResult =
			Math.round(interestsEarnedResult * 1e2) / 1e2;

		interestsEarned.push(interestsEarnedRoundResult);

		totalInterestsEarned =
			totalInterestsEarned + interestsEarnedRoundResult;
		let totalInterestsEarnedRoundResult =
			Math.round(totalInterestsEarned * 1e2) / 1e2;

		result.push({
			period: i,
			investedCapital: investedCapitalRoundResult,
			interestsEarned: interestsEarnedRoundResult,
			totalInterestsEarned: totalInterestsEarnedRoundResult,
			futureInvestmentValue: futureInvestmentRoundResult,
		});
	}

	return result;
}
