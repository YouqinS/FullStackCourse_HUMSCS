import React, { useState } from 'react'

const LotteryForm = ({ getNewNumbers }) => {
  const [howMany, setHowMany] = useState(1)
  const [lotteryType, setLotteryType] = useState("EUROJACKPOT")

  const onChangeHowMany = ({ target }) => {
    setHowMany(target.value)
  }
    const onChangeType = ({ target }) => {
        setLotteryType(target.value)
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    getNewNumbers({ howMany, lotteryType })
  }

  return (
      <form onSubmit={handleSubmit}>
        <h4>How many tickets? (default 1)</h4>
        <input type="number" name="how many" value={howMany} onChange={onChangeHowMany}/>
          <label>
              Select a lottery type:
              <select value={lotteryType} onChange={onChangeType}>
                  <option value="EUROJACKPOT">EURO JACKPOT</option>
                  <option value="VIKINGLOTTO">VIKING LOTTO</option>
                  <option value="FINNISHLOTTO">FINNISH LOTTO</option>
              </select>
          </label>
        <button type="submit"> Submit</button>
      </form>
  )
}

export default LotteryForm
