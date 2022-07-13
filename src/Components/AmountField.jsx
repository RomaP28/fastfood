import React from "react"

function AmountField({ amount, id, itemsInCart, setItemsInCart, setPrice, priceForOne, getTotal }) {
  const [amounts, setAmount] = React.useState(0)

  React.useEffect(() => {
    setAmount(amount)
  }, [amount])

  const onChangeAmount = event => {
    if (event.target.value > 0) {
      setAmount(event.target.value)
      localStorage.setItem(id, event.target.value)
    } else {
      setItemsInCart(prev => prev.filter(e => e.id !== id))
      localStorage.removeItem(id)
    }
    const curPrice = priceForOne * event.target.value
    setPrice(Math.floor(curPrice * 100) / 100)
    getTotal(itemsInCart)
  }

  return (
    <input key={id} onChange={onChangeAmount} value={amounts} type="number" />
  )
}

export default AmountField;