# LotteryNumberService

This application is implemented in [go](https://go.dev/).

### This a simple service to generate lottery numbers for EUROJACKPOT, FINNISHLOTTO, VIKINGLOTTO if a lottery type is specified (by default one set of numbers is generated, but a user can also specify how many sets to be generated), and retrieve past winning numbers if the year, week and lottery type is specified.

example usage:

`req: /lng?lottoType=VIKINGLOTTO`

`res: LotteryNumbers: [[7 28 24 26 22 44 6]]`

`req: lng?lottoType=EUROJACKPOT&howMany=2`

`res: LotteryNumbers: [[38 22 41 36 46 1 8] [14 20 31 8 3 7 8]]`


`req:/result?year=2022&week=55&lottoType=EUROJACKPOT`

`res: Bad value for parameter week. Accepted value: 1 - 52`