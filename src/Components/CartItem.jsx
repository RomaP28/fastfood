import React from 'react';
import AmountField from './AmountField';
import styles from './CartItem.module.scss';


function CartItem({ item, itemsInCart, setItemsInCart, getTotal }) {
  const [price, setPrice] = React.useState(0)

  React.useEffect(() => {
    const curPrice = itemsInCart[item[0] - 1].price * item[1]
    setPrice(Math.floor(curPrice * 100) / 100)
  }, [setPrice])

  return (
    <div className={styles.cartItem}>
      <div>
        <img src={itemsInCart[item[0] - 1].img} alt="" />
      </div>
      <div className={styles.options}>
        <b>{itemsInCart[item[0] - 1].title}</b>
        <AmountField
          amount={item[1]}
          id={item[0]}
          getTotal={getTotal}
          itemsInCart={itemsInCart}
          setItemsInCart={setItemsInCart}
          setPrice={setPrice}
          priceForOne={itemsInCart[item[0] - 1].price}
        />
        <p>Price: {price} $</p>
      </div>
    </div>
  )
}

export default CartItem;