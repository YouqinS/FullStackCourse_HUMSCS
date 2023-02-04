package generator

type LotteryInterface interface {
	getFirstGroupHowManyNumbers() int
	getFirstGroupMax() int
	getSecondGroupHowManyNumbers() (hasSecondGroup bool, numberCount int)
	getSecondGroupMax() (max int)
}
