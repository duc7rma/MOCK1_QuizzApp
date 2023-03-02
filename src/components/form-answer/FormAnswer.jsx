import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Button } from 'antd';

function FormAnswer() {
  return (
    <div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        size="small"
        style={{ marginRight: '20px', backgroundColor: 'green' }}
        // onClick={() => handleUpdate(el)}
      />
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        size="small"
        style={{ marginRight: '20px' }}
        // onClick={() => handleDelete(el.id)}
        // loading={statusDeleteAnswer}
      />
      <FormControlLabel
        label={'content'}
        control={
          <Checkbox
            name="rememberMe"
            color="primary"
            // checked={el.is_correct}
            // onClick={() => handleCheck(el.id, el.content, el.is_correct)}
          />
        }
      />
    </div>
  );
}

export default FormAnswer;
