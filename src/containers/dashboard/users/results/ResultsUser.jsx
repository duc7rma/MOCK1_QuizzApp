import { DeleteOutlined, EditOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalAddUser from 'components/modal/modal-add/ModalAddUser';
import ModalDelete from 'components/modal/modal-delete/ModalDeletes';
import ModalUpdateUser from 'components/modal/modal-update/ModalUpdateUser';
import { TYPE_CATEGORY } from 'constants/modal';
import { setCurrentUserId, showHideModal, showHideModalUpdateUser } from 'stores/modalSlice';
import { fetchAllUsersAdminThunk, setCurrentPage, setPageSize } from 'stores/userAdminSlice';

const moment = require('moment');
const defaultAvatar = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

const ResultsUser = () => {
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);

  const allUsers = useSelector((state) => state.userAdmin.users);

  const handleChangePagination = (page, size) => {
    dispatch(setCurrentPage(page));
    dispatch(setPageSize(size));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '50px',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '300px',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
      align: 'center',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      align: 'center',

      render: (roles) => (
        <Space size={[0, 8]} wrap>
          {roles.map((role, index) => (
            <Tag
              key={index}
              color={role === 'admin' ? '#55acee' : 'success'}
              icon={role === 'admin' ? <UserAddOutlined /> : <UserOutlined />}
            >
              {role}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar_link',
      key: 'avatar_link',
      align: 'center',
      render: (key) => <Image width="100px" src={key ? key : defaultAvatar} />,
    },
    {
      title: 'Created Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center',
      render: (_, { createdAt }) => {
        return moment(createdAt).format('LLLL');
      },
    },
    {
      title: 'Updated Date',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (_, { updatedAt }) => {
        return moment(updatedAt).format('LLLL');
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      align: 'center',
      render: (dataIndex) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size={'medium'}
            style={{ backgroundColor: 'green' }}
            onClick={() => {
              dispatch(showHideModalUpdateUser(true));
              dispatch(setCurrentUserId(dataIndex.id));
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size={'medium'}
            style={{ backgroundColor: 'red' }}
            danger
            onClick={() => {
              dispatch(showHideModal(true));
              dispatch(setCurrentUserId(dataIndex.id));
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (allUsers) {
      const newAllUsers = allUsers.map((question) => {
        return {
          ...question,
          key: question.id,
        };
      });

      setListUsers(newAllUsers);
    }
  }, [allUsers]);

  useEffect(() => {
    const params = {};
    dispatch(fetchAllUsersAdminThunk(params));
  }, [dispatch]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={listUsers}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '10'],
          onChange: handleChangePagination,
        }}
      />
      <ModalDelete type={TYPE_CATEGORY.USER} />
      <ModalUpdateUser />
      <ModalAddUser />
    </>
  );
};
export default ResultsUser;
