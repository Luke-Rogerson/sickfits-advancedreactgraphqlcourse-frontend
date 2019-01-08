import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART}
        variables={{
          id
        }}
      >
        {(addToCart, { loading }) => (
          <button disabled={loading} onClick={addToCart}>
            Add{loading && 'ing'} To Cart
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;
