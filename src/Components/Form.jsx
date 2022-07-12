import React from "react";
import styles from './Form.module.scss'
import axios from "axios";

function Form({ setItemsInCart, itemsInCart }) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === '' || email === '' || phone === '' || address === '') {
      alert('Please input your contact info')
      return
    }

    async function postData() {
      const time = new Date().toLocaleString('default', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit' });
      const shop = localStorage.getItem('shop')
      await axios.post('https://62cc3884a080052930a7ae22.mockapi.io/history', {
        shop: shop,
        items: Object.entries(localStorage).filter(el => el[0] !== "shop").map(function (el) {
          return {
            id: itemsInCart[el[0] - 1].id,
            price: itemsInCart[el[0] - 1].price,
            title: itemsInCart[el[0] - 1].title,
            img: itemsInCart[el[0] - 1].img,
            amount: el[1]
          }
        }),
        phone,
        email,
        createdAt: time
      })
    }
    postData()

    alert(`Congratulation ${name}: 
    ${email} 
    ${address} 
    ${phone} `)
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setItemsInCart([])
    localStorage.clear()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>Phone:
        <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label>Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <input id={styles.btn} type="submit" value="Order" disabled={localStorage.length < 2} />
    </form>
  )
}
export default Form;