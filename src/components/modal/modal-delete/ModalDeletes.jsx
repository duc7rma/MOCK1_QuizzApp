import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { TYPE_CATEGORY } from 'constants/modal';
import { deleteQuestionsAdmin } from 'services/questions-admin-service';
import { showHideModal } from 'stores/modalSlice';
import { fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';

const ModalDelete = ({ type }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isShow);
  const currentQuestionId = useSelector((state) => state.modal.currentQuestionId);

  const handleOk = async () => {
    dispatch(showHideModal(false));

    await deleteQuestionsAdmin(currentQuestionId);

    dispatch(fetchAllQuestionsAdminThunk({}));
  };
  const handleCancel = () => {
    dispatch(showHideModal(false));
  };

  return (
    <>
      <Modal
        title={type === TYPE_CATEGORY.QUESTION ? 'Delete Question?' : 'Delete User?'}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete this question?</p>
      </Modal>
    </>
  );
};
export default ModalDelete;
