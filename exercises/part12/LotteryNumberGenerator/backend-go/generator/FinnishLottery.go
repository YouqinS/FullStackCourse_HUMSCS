package generator

type FinnishLottery struct {
}

func (finnishLotto FinnishLottery) getFirstGroupHowManyNumbers() int {
	return 7
}

func (finnishLotto FinnishLottery) getFirstGroupMax() int {
	return 40
}
func (finnishLotto FinnishLottery) getSecondGroupHowManyNumbers() (hasSecondGroup bool, numberCount int) {
	return false, 0
}
func (finnishLotto FinnishLottery) getSecondGroupMax() (max int) {
	return 0
}
