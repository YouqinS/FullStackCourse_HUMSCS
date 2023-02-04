package generator

import (
	"errors"
	"strings"
)

type LotteryType string

const (
	FINNISH_LOTTO = "Finnish Lotto"
	VIKING_LOTTO  = "Viking Lotto"
	EUROJACKPOT   = "Eurojackpot"
)

func GetLotteryType(query string) (LotteryType, error) {
	query = strings.ReplaceAll(strings.TrimSpace(strings.ToUpper(query)), " ", "")
	switch query {
	case "FINNISHLOTTO":
		return FINNISH_LOTTO, nil
	case "VIKINGLOTTO":
		return VIKING_LOTTO, nil
	case "EUROJACKPOT":
		return EUROJACKPOT, nil
	case "":
		return FINNISH_LOTTO, nil
	default:
		return LotteryType(""), errors.New("Unexpected value: " + query)
	}
}
