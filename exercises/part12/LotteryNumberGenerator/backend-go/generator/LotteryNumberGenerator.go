package generator

import (
	"fmt"
	"math/rand"
	"time"
)

type LotteryNumberGenerator struct {
	LotteryType LotteryType
}

func (generator LotteryNumberGenerator) GetNumber(howMany int) [][]int {
	var rows [][]int

	for i := 0; i < howMany; i++ {
		rows = append(rows, generator.generateOneRow())
	}
	fmt.Printf("numbers=%v \n", rows)

	return rows
}

func (generator LotteryNumberGenerator) getLottery() LotteryInterface {
	var myLottery LotteryInterface
	switch generator.LotteryType {
	case EUROJACKPOT:
		myLottery = Eurojackpot{}
	case FINNISH_LOTTO:
		myLottery = FinnishLottery{}
	case VIKING_LOTTO:
		myLottery = VikingLottery{}
	default:
		myLottery = FinnishLottery{}
	}
	return myLottery
}

func (generator LotteryNumberGenerator) generateOneRow() []int {
	myLottery := generator.getLottery()
	firstGroupHowMany := myLottery.getFirstGroupHowManyNumbers()
	firstGroupRange := myLottery.getFirstGroupMax()

	var row []int
	firstGroup := generateNumbersWithinRange(firstGroupHowMany, firstGroupRange)
	for _, v := range firstGroup {
		row = append(row, v)
	}
	hasSecondGroup, secondGroupHowMany := myLottery.getSecondGroupHowManyNumbers()
	if hasSecondGroup {
		secondGroupRange := myLottery.getSecondGroupMax()
		secondGroup := generateNumbersWithinRange(secondGroupHowMany, secondGroupRange)
		for _, v := range secondGroup {
			row = append(row, v)
		}
	}
	return row
}

func generateNumbersWithinRange(howManyNumbers int, numRange int) []int {
	var numbers []int
	for len(numbers) < howManyNumbers {
		rand.Seed(time.Now().UnixNano())
		num := rand.Intn(numRange-1) + 1
		contains := contains(numbers, num)
		if !contains {
			numbers = append(numbers, num)
		}
	}
	fmt.Printf("\nlen=%d, numbers=%v \n", len(numbers), numbers)

	return numbers
}

func contains(nums []int, n int) bool {
	for _, v := range nums {
		if v == n {
			return true
		}
	}
	return false
}
