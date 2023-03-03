import SearchUserForm from './search/SearchUserForm';
import ResultsUser from './results/ResultsUser';
import './User.scss';

function User() {
  return (
    <div className="user-container">
      <h1 className="user-container_title">Users Management</h1>
      <SearchUserForm />
      <ResultsUser />
    </div>
  );
}

export default User;
