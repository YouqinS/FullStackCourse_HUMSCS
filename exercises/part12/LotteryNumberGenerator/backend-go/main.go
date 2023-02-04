package main

import (
	lnsapi "lns_golang/api"
	"net/http"
	"log"
)

func main() {
	log.Println("lottery number generator running!")
	http.HandleFunc("/", lnsapi.Hello)
	http.HandleFunc("/result", lnsapi.GetPastWinningNumber)
	http.HandleFunc("/lng", lnsapi.GetLotteryNumbers)
	http.ListenAndServe(":8080", nil)
}
