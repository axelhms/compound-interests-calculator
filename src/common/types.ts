export interface ValuesType {
	initialInvestment: number;
	interestRate: number;
	period: number;
	monthlyContributions: number;
}

export interface ResultType {
	period: number;
	interestsEarned: Array<number>;
	futureInvestmentValue: Array<number>;
}

export interface CompoundInterest {
	period: number;
	investedCapital?: number;
	interestsEarned: number;
	totalInterestsEarned: number;
	futureInvestmentValue: number;
}
