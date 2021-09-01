import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal/Modal';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <li key={item.id} >{item.amount} (${(item.amount * item.price).toFixed(2)} each) ... {item.name}___${item.price}</li>)}</ul>;

  return (
    <Modal onBackdropClick={props.onHideCart} >
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
};

export default Cart;