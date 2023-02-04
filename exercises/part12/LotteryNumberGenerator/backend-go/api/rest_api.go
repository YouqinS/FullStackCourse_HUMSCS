package api

import (
	"fmt"
	lnsgen "lns_golang/generator"
	lnshist "lns_golang/history"
	"log"
	"net/http"
	"strconv"
)

var lotteryTypes = []string{"EUROJACKPOT", "FINNISHLOTTO", "VIKINGLOTTO"}

func Hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello! this is a lottery number generator! good luck!\n")
}

func GetLotteryNumbers(w http.ResponseWriter, req *http.Request) {
	//"/lng?howMany=2&lottoType=vikinglotto"
	lottoType, ok := req.URL.Query()["lottoType"]

	if !ok || len(lottoType[0]) < 1 {

		fmt.Fprintf(w, "Url Param 'lottoType' is missing. Accepted values: %v\n", lotteryTypes)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	lotteryType, err := lnsgen.GetLotteryType(lottoType[0])
	if err != nil {
		fmt.Fprintf(w, "Bad value for parameter lottoType:%s. Accepted values: %v\n", lottoType[0], lotteryTypes)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	howMany, ok := req.URL.Query()["howMany"]
	if !ok || len(howMany[0]) < 1 {
		log.Println("Url Param 'howMany' is missing, returning default value: 1")
		howMany = []string{"1"}
	}
	count, err := strconv.Atoi(howMany[0])
	if err != nil {
		fmt.Fprintf(w, "Bad value for parameter howMany:%s\n", howMany[0])
		w.WriteHeader(http.StatusBadRequest)
		return
	} else {
		generator := lnsgen.LotteryNumberGenerator{lotteryType}
		rows := generator.GetNumber(count)
		fmt.Fprintf(w, "LotteryNumbers: %v\n", rows)
	}
}

func GetPastWinningNumber(w http.ResponseWriter, req *http.Request) {
	var yearInt int
	var weekInt int
	year, ok := req.URL.Query()["year"]
	if !ok || len(year[0]) < 1 {
		fmt.Fprintf(w, "Url Param 'year' is missing")
		w.WriteHeader(http.StatusBadRequest)
		return
	} else if len(year[0]) != 4 {
		fmt.Fprintf(w, "Bad value for parameter year:%s\n", year[0])
		w.WriteHeader(http.StatusBadRequest)
		return
	} else {
		year1, err := strconv.Atoi(year[0])
		if err != nil {
			fmt.Fprintf(w, "Bad value for parameter year:%s\n", year[0])
			w.WriteHeader(http.StatusBadRequest)
			return
		} else {
			yearInt = year1
		}
	}

	week, ok := req.URL.Query()["week"]
	if !ok || len(week[0]) < 1 {
		fmt.Fprintf(w, "Url Param 'week' is missing")
		w.WriteHeader(http.StatusBadRequest)
		return
	} else {
		week1, err := strconv.Atoi(week[0])
		if err != nil || (week1 < 1 || week1 > 52) {
			fmt.Fprintf(w, "Bad value for parameter week. Accepted value: 1 - 52")
			w.WriteHeader(http.StatusBadRequest)
			return
		} else {
			weekInt = week1
		}
	}

	lottoType, ok := req.URL.Query()["lottoType"]
	if !ok || len(lottoType[0]) < 1 {
		fmt.Fprintf(w, "Url Param 'lottoType' is missing. Accepted values: %v\n", lotteryTypes)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	lotteryType, err := lnsgen.GetLotteryType(lottoType[0])
	if err != nil {
		fmt.Fprintf(w, "Bad value for parameter 'lotteryType'. Accepted values: %v\n", lotteryTypes)
		w.WriteHeader(http.StatusBadRequest)
		return
	} else {
		winningNumber, err := lnshist.PastWingNumber{}.GetWinningNumber(yearInt, weekInt, lotteryType)
		if err != nil {
			fmt.Fprintf(w, "error happened:  %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		fmt.Fprintf(w, "LotteryNumbers: %v\n", winningNumber)
	}

}
