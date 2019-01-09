import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  // This gets called as soon as we get a response back from the server
  // after the mutation has been performed.
  update = (cache, payload) => {
    // Read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // Remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id; // data is what we get back from the server, inside that we have a `removeFromCart` mutation, inside that is the ID
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // Write back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update} // If just a single update function, can call it this
        optimisticResponse={{
          // What you THINK the server will respond with
          __typename: 'Mutation', // Needs a `typename`
          removeFromCart: {
            __typename: 'CartItem', //what we're returning
            id: this.props.id
          }
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButton
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(error => alert(error.message)); // catch error from backend
            }}
            title='Delete Item'
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
