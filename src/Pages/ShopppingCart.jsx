import React from 'react';
import styles from './ShoppingCart.module.scss'
import axios from 'axios'
import Form from '../Components/Form';
import CartItem from '../Components/CartItem'

function Cart({ allShops }) {
  const [itemsInCart, setItemsInCart] = React.useState([])
  const [summary, setSummary] = React.useState(0)
  const shop = localStorage.getItem('shop')

  React.useEffect(() => {
    setItemsInCart(allShops[shop] ? allShops[shop] : [])
    if (itemsInCart.length === 0 && localStorage.length > 0) {
      async function fetchData() {
        const getItemsAgain = await axios.get(`https://62cc3884a080052930a7ae22.mockapi.io/${shop.toLowerCase()}`);
        setItemsInCart(getItemsAgain.data)
        getTotal(getItemsAgain.data)
      }
      fetchData()

    }


  }, [setItemsInCart])

  const getTotal = items => {
    const sum = Object.entries(localStorage).filter(el => el[0] !== "shop").reduce((acc, cur) => acc += items[+cur[0] - 1].price * +cur[1], 0)
    setSummary(Math.floor(sum * 100) / 100)
  }


  return (
    <div className={styles.cart_page}>
      <div className={styles.form}>
        <Form
          setItemsInCart={setItemsInCart}
          itemsInCart={itemsInCart}
          summary={summary}
        />
      </div>
      <div className={styles.cartItems}>
        {itemsInCart.length > 0 && Object.entries(localStorage).map(item =>
          item[0] !== "shop" &&
          <CartItem
            item={item}
            itemsInCart={itemsInCart}
            setItemsInCart={setItemsInCart}
            getTotal={getTotal}
            key={item[0] + item[1]}
          />
        )}
      </div>
      <div className={styles.total}>
        <p>Total: {summary}$</p>
      </div>
    </div>
  )
}

export default Cart;