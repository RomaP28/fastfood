import React from 'react';
import style from './app.module.scss';
import { Link, Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop';
import Cart from './Pages/ShopppingCart';
import axios from 'axios'
import History from './Pages/History';

function App() {
  const [macProducts, setMacProducts] = React.useState([])
  const [cfkProducts, setCFKProducts] = React.useState([])
  const [burgProducts, setBurgProducts] = React.useState([])
  const [active, setActve] = React.useState(null)

  const allShops = { 'Mac': macProducts, 'CFK': cfkProducts, 'BurgerQueen': burgProducts }

  const showProducts = event => {
    localStorage.getItem('shop') !== event.target.id && localStorage.clear()
    setActve(event.target.id)
  }

  const addToCart = item => {
    const itemInCart = Object.keys(localStorage).find(cartItem => cartItem === item.id)
    if (itemInCart) {
      let amount = localStorage.getItem(itemInCart)
      localStorage.setItem(itemInCart, ++amount)
    } else {
      localStorage.setItem('shop', active)
      localStorage.setItem(item.id, 1)
    }
  }

  React.useEffect(() => {
    try {
      async function fetchData() {
        const itemsMac = await axios.get('https://62cc3884a080052930a7ae22.mockapi.io/mac');
        const itemsCfk = await axios.get('https://62cc3884a080052930a7ae22.mockapi.io/cfk');
        const itemsBurg = await axios.get('https://62cc3884a080052930a7ae22.mockapi.io/burgerqueen');
        setMacProducts(itemsMac.data)
        setCFKProducts(itemsCfk.data)
        setBurgProducts(itemsBurg.data)
        // setProducts(itemsMac.data)
      }
      fetchData();

    } catch (error) {
      alert(error.message)
    }
  }, [])

  return (
    <div className={style.container}>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Shop</Link></li>
            <div className={style.slash}>|</div>
            <li><Link to="/cart">Shopping cart</Link></li>
            <div className={style.slash}>|</div>
            <li><Link to="/history">History</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route element={<Shop
            allShops={allShops}
            addToCart={addToCart}
            showProducts={showProducts}
            active={active}
          />} path="/"></Route>
          <Route element={<Cart
            allShops={allShops}
            active={active}
          />} path="/cart"></Route>
          <Route element={<History />} path="/history"></Route>
        </Routes>
      </main >
    </div>
  );
}

export default App;