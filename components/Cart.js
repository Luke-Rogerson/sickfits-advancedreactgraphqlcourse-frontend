import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CoolButton from './styles/SickButton';

const Cart = () => {
  return (
    <CartStyles open>
      <header>
        <CloseButton title='close'>&times;</CloseButton>
        <Supreme>YOUR CART</Supreme>
        <p>You have __ items in your cart.</p>
      </header>

      <footer>
        <p>£10.10</p>
        <CoolButton>Checkout</CoolButton>
      </footer>
    </CartStyles>
  );
};

export default Cart;
