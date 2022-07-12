import styles from './HistoryItem.module.scss'

function HistoryItem({ order }) {
  return (
    <div className={styles.order}>
      <img src={order.img} alt={order.title} />
      <div className={styles.orderItemDescription}>
        <p>{order.title}</p>
        <b>{order.amount} x {order.price}$</b>
      </div>
    </div>
  )
}

export default HistoryItem;