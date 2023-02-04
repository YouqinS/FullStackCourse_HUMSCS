package history

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	lnsgen "lns_golang/generator"

)

type PastWingNumber struct{}

func (pastWingNumber PastWingNumber) GetWinningNumber(year int, week int, lotteryType lnsgen.LotteryType) (LotteryNumber, error) {
	//  String url = "https://www.veikkaus.fi/api/draw-results/v1/games/EJACKPOT/draws/by-week/2020-W20";

	jsonResult, err := getResponse(year, week, lotteryType)
	if err != nil {
		return LotteryNumber{}, err
	}

	var structureHoldingJSON []map[string]interface{}

	if err := json.Unmarshal([]byte(jsonResult), &structureHoldingJSON); err != nil {
		println(jsonResult)
		panic(err)
	}
	fmt.Println(structureHoldingJSON)

	results := structureHoldingJSON[0]["results"].([]interface {})
	fmt.Println("results=", results)

	mapOfResults := results[0].(map[string]interface {})
	fmt.Println("mapOfResults=", mapOfResults)

	primaryResults := mapOfResults["primary"]
	fmt.Println("primary=", primaryResults)

	secondaryResults := mapOfResults["secondary"]
	fmt.Println("secondary=", secondaryResults)

	lotteryNumber := LotteryNumber{primaryNumbers: primaryResults, secondaryNumbers: secondaryResults}
	fmt.Println("lotteryNumber=", lotteryNumber)
	return lotteryNumber, nil
}

func getResponse(year int, week int, lotteryType lnsgen.LotteryType) (string, error) {
	url := generateUrl(lotteryType, year, week)
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status:", resp.Status)
	if !strings.Contains(resp.Status, "200") {
		return "", errors.New("Response status: " +  resp.Status)
	} else {
		responseResult := ""
		scanner := bufio.NewScanner(resp.Body)
		for i := 0; scanner.Scan() && i < 5; i++ {
			//fmt.Println(scanner.Text())
			responseResult += scanner.Text()
		}

		fmt.Println(responseResult)

		if err := scanner.Err(); err != nil {
			panic(err)
		}

		return responseResult, nil
	}
}

func generateUrl(lotteryType lnsgen.LotteryType, year int, week int) string {
	lottoType := ""
	switch lotteryType {
	case lnsgen.EUROJACKPOT:
		lottoType = "EJACKPOT"
		break
	case lnsgen.VIKING_LOTTO:
		lottoType = "VIKING"
		break
	case lnsgen.FINNISH_LOTTO:
		lottoType = "LOTTO"
		break
	}

	url := "https://www.veikkaus.fi/api/draw-results/v1/games/" + lottoType	+ "/draws/by-week/" +
		strconv.Itoa(year) + "-W" + strconv.Itoa(week)

	return url
}
