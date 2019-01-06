import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Table from './styles/Table';
import CoolButton from './styles/SickButton';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONSUPDATE'
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) =>
      console.log(data) || (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => (
                    <th>{permission}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.users.map((
                  user // for each user, render a user component
                ) => (
                  <User user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )
    }
  </Query>
);

class User extends React.Component {
  // seperate component
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input type='checkbox' />
            </label>
          </td>
        ))}
        <td>
          <CoolButton>Update</CoolButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
