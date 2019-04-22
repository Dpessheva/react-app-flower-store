import React from 'react'

const OrderDetailsRow = (props) => {
  const {name, quantity, price} = props.product
  let total = quantity * price
  return (
    <tr>
      <th>#{props.index + 1}</th>
      <td>{name}</td>
      <td>euro {price.toFixed(2)}</td>
      <td>{quantity}</td>
      <td>euro {total.toFixed(2)}</td>
    </tr>
  )
}

export default OrderDetailsRow