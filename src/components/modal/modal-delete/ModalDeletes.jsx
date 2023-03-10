import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { TYPE_CATEGORY } from 'constants/modal';
import { showHideModal } from 'stores/modalSlice';
import { deleteQuestionThunk, fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';
import { deleteUserThunk, fetchAllUsersAdminThunk } from 'stores/userAdminSlice';

const ModalDelete = ({ type }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isShow);
  const currentQuestionId = useSelector((state) => state.modal.currentQuestionId);
  const currentUserId = useSelector((state) => state.modal.currentUserId);

  const handleOk = async () => {
    dispatch(showHideModal(false));

    type === TYPE_CATEGORY.QUESTION
      ? await dispatch(deleteQuestionThunk(currentQuestionId))
      : await dispatch(deleteUserThunk(currentUserId));

    type === TYPE_CATEGORY.QUESTION ? dispatch(fetchAllQuestionsAdminThunk({})) : dispatch(fetchAllUsersAdminThunk({}));
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
