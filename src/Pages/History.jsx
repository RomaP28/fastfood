import React from "react";
import axios from "axios";
import styles from "./History.module.scss";
import HistoryItem from "../Components/HistoryItem";

function History() {
  const [orders, setOrders] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('');
  const [searchType, setSearchType] = React.useState('email');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const history = await axios.get('https://62cc3884a080052930a7ae22.mockapi.io/history');
        setOrders(history.data.reverse())
      } catch (error) {
        alert(`Something went wrong, please try again. ${error.message}`)
      }
    }
    fetchData();
  }, [])

  const onChangeSearchInput = (event) => {
    event.target.type === 'email' ? setSearchType('email') : setSearchType('phone')
    setSearchValue(event.target.value)
  }

  const renderingOrders = () => {
    const filteredItems = orders.filter(item => item[searchType].toLowerCase().includes(searchValue.toLowerCase()))
    return (
      filteredItems.map((item, index) =>
        <div className={styles.order} key={index}>
          <div className={styles.order_header}>
            <p><span>{item.createdAt}</span> <b className={styles.order_title}>Order #{item.id}</b></p>
            <p>{item.email} {item.phone}</p>
            <p>{item.shop}</p>
          </div>
          <div className={styles.order_items}>
            {item.items.map((el, index) =>
              <HistoryItem
                order={el}
                key={index}
              />)}
          </div>
        </div>
      )
    )
  }

  return (
    <div className={styles.history_page}>
      <div className={styles.search_orders}>
        <label>Email:
          <input type="email" onChange={onChangeSearchInput} placeholder="Search..." />
        </label>
        <label>Phone:
          <input type="phone" onChange={onChangeSearchInput} placeholder="Search..." />
        </label>
      </div>
      <div className={styles.orders_content}>
        {renderingOrders()}
      </div>
    </ div>
  )
}

export default History;



// {orders.map((item, index) =>
//   <div className={styles.order} key={index}>
//     <div className={styles.order_header}>
//       <p><span>{item.createdAt}</span> <b className={styles.order_title}>Order #{item.id}</b></p>
//       <p>{item.phone} {item.email}</p>
//       <p>{item.shop}</p>
//     </div>
//     <div className={styles.order_items}>
//       {item.items.map((el, index) =>
//         <HistoryItem
//           order={el}
//           key={index}
//         />)}
//     </div>
//   </div>
// )}