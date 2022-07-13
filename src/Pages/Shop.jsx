import React from 'react';
import styles from './Shop.module.scss'

function Shop({ allShops, showProducts, addToCart, active }) {
  return (
    <div className={styles.shop_page}>
      <div className={styles.select_shop}>
        <p>Shops:</p>
        <div className={styles.shops}>
          {Object.keys(allShops).map((id, i) =>
            <div id={id} key={i}
              className={styles.shop_tab}
              onClick={showProducts}
              style={active ? active === id ?
                { pointerEvents: 'none', backgroundColor: 'yellow' }
                : { pointerEvents: 'none' }
                : { pointerEvents: 'auto' }}
            >{id}</div>
          )}
        </div>
      </div>
      <div className={styles.products}>
        {active ? allShops[active].map(item =>
          <div className={styles.card} key={item.title + item.id}>
            <img src={item.img} alt="img" />
            <b>{item.title}</b>
            <p>Price: {item.price} $</p>
            <div className={styles.textbox} onClick={() => addToCart(item)}>
              <a className={`${styles.btn} ${styles.btnanimated} ${styles.btnwhite}`} href="#">add to Cart</a>
            </div>
          </div>
        ) :
          <p className={styles.startSign}>← Please choose your shop</p>
        }
      </div>
    </div >
  )
}

export default Shop;