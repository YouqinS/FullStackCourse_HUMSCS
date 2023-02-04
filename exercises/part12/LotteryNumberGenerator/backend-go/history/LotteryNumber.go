package history

import lnsgen "lns_golang/generator"
type LotteryNumber struct {
	lotteryType      lnsgen.LotteryType
	primaryNumbers   interface{}
	secondaryNumbers interface{}
}

func (lotteryNumber LotteryNumber) getLotteryType() lnsgen.LotteryType {
	return lotteryNumber.lotteryType
}

func (lotteryNumber LotteryNumber) getPrimaryNumbers() interface{} {
	return lotteryNumber.primaryNumbers
}

func (lotteryNumber LotteryNumber) getSecondaryNumbers() interface{} {
	return lotteryNumber.secondaryNumbers
}
