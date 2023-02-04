package generator

type VikingLottery struct {
}

func (vikingLottery VikingLottery) getFirstGroupHowManyNumbers() int {
	return 6
}

func (vikingLottery VikingLottery) getFirstGroupMax() int {
	return 48
}
func (vikingLottery VikingLottery) getSecondGroupHowManyNumbers() (hasSecondGroup bool, numberCount int) {
	return true, 1
}
func (vikingLottery VikingLottery) getSecondGroupMax() (max int) {
	return 8
}
