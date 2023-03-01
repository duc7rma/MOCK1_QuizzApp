import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';

const moment = require('moment');
const defaultThumbnail = 'https://res.cloudinary.com/qn052289/image/upload/v1664685443/gsriwi4r6ndzq5f5d1rz.webp';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '50px',
    align: 'center',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: '250px',
    align: 'center',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail_link',
    key: 'thumbnail_link',
    align: 'center',
    render: (key) => <Image width="150px" src={key ? key : defaultThumbnail} />,
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
          size={'large'}
          style={{ backgroundColor: 'green' }}
          //   onClick={() => {
          //     dispatch(setIsOpenUpdate(true));
          //     dispatch(setIdQuestion(dataIndex.idQuestion));
          //   }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          size={'large'}
          danger
          //   onClick={() => {
          //     dispatch(setIsOpenDelete(true));
          //     dispatch(setIdQuestion(dataIndex.idQuestion));
          //   }}
        />
      </Space>
    ),
  },
];

const ResultsQuestions = () => {
  const dispatch = useDispatch();
  const [dataQuestions, setDataQuestions] = useState([]);

  const allQuestion = useSelector((state) => state.questionsAdmin.questions);

  useEffect(() => {
    if (allQuestion) {
      const newAllQuestion = allQuestion.map((question) => {
        return {
          ...question,
          key: question.id,
        };
      });

      setDataQuestions(newAllQuestion);
    }
  }, [allQuestion]);

  useEffect(() => {
    const params = {};

    dispatch(fetchAllQuestionsAdminThunk(params));
  }, [dispatch]);

  console.log(allQuestion);
  return (
    <>
      <Table columns={columns} dataSource={dataQuestions} />;
    </>
  );
};
export default ResultsQuestions;
