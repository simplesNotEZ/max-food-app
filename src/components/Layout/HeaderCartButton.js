import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((totalNoItems, item) => {
    return totalNoItems += item.amount;
  }, 0);

  // pulling items out of cartCtx, so we can use just that rather than the whole cartCtx in useEffect
  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    // the animation is set up to play over 300ms, that's why we chose that value here
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // here, we use the useEffect cleanup function to clear the timer, which is good practice and necessary here to protect against rapid-clicking
    return () => {
      clearTimeout(timer);
    };

  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
}

export default HeaderCartButton;