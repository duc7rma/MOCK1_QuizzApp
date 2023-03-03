import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { showHideModalAddUser } from 'stores/modalSlice';
import { fetchAllUsersAdminThunk, setKeyWords, setRole, setSortField, setSortOrder } from 'stores/userAdminSlice';
import './SearchUserForm.scss';

function SearchUserForm() {
  const dispatch = useDispatch();

  const pageSize = useSelector((state) => state.userAdmin.pageSize);
  const order = useSelector((state) => state.userAdmin.order);
  const sortField = useSelector((state) => state.userAdmin.sortField);
  const loading = useSelector((state) => state.userAdmin.status);
  const keywords = useSelector((state) => state.userAdmin.keywords);
  const role = useSelector((state) => state.userAdmin.role);

  const handleChangeKeywords = (e) => {
    dispatch(setKeyWords(e.target.value));
  };

  const handleChangeSortField = (e) => {
    dispatch(setSortField(e));
  };

  const handleSortOrder = (e) => {
    dispatch(setSortOrder(e));
  };

  const handleChangeRole = (e) => {
    dispatch(setRole(e));
  };

  const handleSearch = () => {
    let params = {
      order: order,
      sortField: sortField,
      page: 1,
      size: pageSize,
      keyWord: keywords,
    };
    if (role !== '') {
      params.role1 = role;
    }

    dispatch(fetchAllUsersAdminThunk(params));
  };

  return (
    <div className="search-user">
      <Space size={15} style={{ marginBottom: '10px' }}>
        <Select
          defaultValue={sortField}
          style={{
            width: 120,
          }}
          onChange={handleChangeSortField}
        >
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="email">Email</Select.Option>
          <Select.Option value="created_at">Created At</Select.Option>
          <Select.Option value="updated_at">Updated At</Select.Option>
        </Select>

        <Select
          defaultValue={''}
          style={{
            width: 120,
          }}
          onChange={handleChangeRole}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>

        <Input placeholder="Keywords" onChange={handleChangeKeywords} value={keywords} />

        <Select
          defaultValue={order}
          style={{
            width: 200,
          }}
          onChange={handleSortOrder}
        >
          <Select.Option value="ASC">Ascending</Select.Option>
          <Select.Option value="DESC">Descending</Select.Option>
        </Select>

        <Button type="primary" onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </Space>

      <Button type="primary" onClick={() => dispatch(showHideModalAddUser(true))} loading={loading}>
        <PlusOutlined />
        ADD
      </Button>
    </div>
  );
}

export default SearchUserForm;
