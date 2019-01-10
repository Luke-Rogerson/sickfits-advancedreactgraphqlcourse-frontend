import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

function calcTotalItems(cart) {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  onToken = res => {
    console.log('ON TOKEN CALLED');
    console.log(res.id);
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          const totalItems = calcTotalItems(me.cart);
          return (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              name='Sick Fits'
              description={`Order of ${totalItems} item${
                totalItems === 1 ? '' : 's'
              }`}
              image={me.cart[0].item && me.cart[0].item.image}
              stripeKey='pk_test_r9EXLDbFMtr1Pu2rZ6waR6qX'
              currency='GBP'
              email={me.email}
              token={res => this.onToken(res)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
