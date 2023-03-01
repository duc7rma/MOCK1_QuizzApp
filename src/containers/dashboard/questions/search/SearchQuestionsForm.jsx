import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllQuestionsAdminThunk, setKeyWords, setSortField, setSortOrder } from 'stores/questionAdminSlice';
import './SearchQuestionsForm.scss';

function SearchQuestionsForm() {
  const dispatch = useDispatch();

  const pageSize = useSelector((state) => state.questionsAdmin.pageSize);
  const order = useSelector((state) => state.questionsAdmin.order);
  const sortField = useSelector((state) => state.questionsAdmin.sortField);
  const loading = useSelector((state) => state.questionsAdmin.status);
  const keywords = useSelector((state) => state.questionsAdmin.keywords);

  const handleChangeKeywords = (e) => {
    dispatch(setKeyWords(e.target.value));
  };

  const handleChangeSortField = (e) => {
    dispatch(setSortField(e));
  };

  const handleSortOrder = (e) => {
    dispatch(setSortOrder(e));
  };

  const handleSearch = () => {
    const params = {
      order: order,
      sortField: sortField,
      page: 1,
      size: pageSize,
      keyWord: keywords,
    };

    dispatch(fetchAllQuestionsAdminThunk(params));
  };

  return (
    <div className="search-questions">
      <Space size={15} style={{ marginBottom: '10px' }}>
        <Select
          defaultValue={sortField}
          style={{
            width: 100,
          }}
          onChange={handleChangeSortField}
        >
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="title">Title</Select.Option>
          <Select.Option value="thumbnail">Thumbnail</Select.Option>
          <Select.Option value="createdAt">Created At</Select.Option>
          <Select.Option value="updatedAt">Updated At</Select.Option>
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

      <Button type="primary" onClick={handleSearch} loading={loading}>
        <PlusOutlined />
        ADD
      </Button>
    </div>
  );
}

export default SearchQuestionsForm;
