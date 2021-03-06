import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)}</ul>;

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