import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $password: String!
    $email: String!
  ) {
    signUp(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: ''
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signUp, { error, loading }) => {
          // Form elements default to 'GET', so password could appear in URL. Set to 'POST'
          return (
            <Form
              method='POST'
              onSubmit={async e => {
                e.preventDefault();
                const res = await signUp();
                console.log(res);
                this.setState({ name: '', password: '', email: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                <h2>Sign Up For An Account</h2>
                <label htmlFor='email'>
                  Email
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor='name'>
                  Name
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor='password'>
                  Password
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type='submit'>Sign Up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
