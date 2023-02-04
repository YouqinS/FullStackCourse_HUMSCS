package generator

type Eurojackpot struct {
}

func (eurojackpot Eurojackpot) getFirstGroupHowManyNumbers() int {
	return 5
}

func (eurojackpot Eurojackpot) getFirstGroupMax() int {
	return 50
}
func (eurojackpot Eurojackpot) getSecondGroupHowManyNumbers() (hasSecondGroup bool, numberCount int) {
	return true, 2
}
func (eurojackpot Eurojackpot) getSecondGroupMax() (max int) {
	return 10
}
