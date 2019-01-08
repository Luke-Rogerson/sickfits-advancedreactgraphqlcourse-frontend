import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href='/items'>
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href='/sell'>
              <a>Sell</a>
            </Link>
            <Link href='/orders'>
              <a>Orders</a>
            </Link>
            <Link href='/me'>
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => <button onClick={toggleCart}>My Cart</button>}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href='/signup'>
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

/*
SIGN OUT MUTATION:
1. add to schema
2. write mutation that deletes that cookie
3. Create a button in nav to trigger that mutation


*/
