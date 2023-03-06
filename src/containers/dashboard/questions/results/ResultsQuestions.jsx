import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalAddQuestion from 'components/modal/modal-add/ModalAddQuestion';
import ModalDelete from 'components/modal/modal-delete/ModalDeletes';
import ModalUpdateQuestion from 'components/modal/modal-update/ModalUpdateQuestion';
import { TYPE_CATEGORY } from 'constants/modal';
import { setCurrentQuestionId, showHideModal, showHideModalUpdateQuestion } from 'stores/modalSlice';
import { fetchAllQuestionsAdminThunk, setCurrentPage, setPageSize } from 'stores/questionAdminSlice';

const moment = require('moment');
const defaultThumbnail = 'https://res.cloudinary.com/qn052289/image/upload/v1664685443/gsriwi4r6ndzq5f5d1rz.webp';

const ResultsQuestions = () => {
  const dispatch = useDispatch();
  const [dataQuestions, setDataQuestions] = useState([]);

  const allQuestion = useSelector((state) => state.questionsAdmin.questions);

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
            size={'medium'}
            style={{ backgroundColor: 'green' }}
            onClick={() => {
              dispatch(showHideModalUpdateQuestion(true));
              dispatch(setCurrentQuestionId(dataIndex.id));
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
              dispatch(setCurrentQuestionId(dataIndex.id));
            }}
          />
        </Space>
      ),
    },
  ];

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

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataQuestions}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '10'],
          onChange: handleChangePagination,
        }}
      />
      <ModalDelete type={TYPE_CATEGORY.QUESTION} />
      <ModalUpdateQuestion />
      <ModalAddQuestion />
    </>
  );
};
export default ResultsQuestions;
