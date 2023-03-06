import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { showHideModalSubmitQuestion } from 'stores/modalSlice';
import { submitQuestionsThunk } from 'stores/questionSlice';

function ModalSubmitQuestion() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isShowSubmitQuestion);
  const listQuestions = useSelector((state) => state.questions.questions);

  const handleOk = async () => {
    const questionsSubmit = listQuestions.map((question) => ({
      id: question.id,
      answersSubmittedId: question.answersSubmittedId ? question.answersSubmittedId : [],
    }));

    const payload = {
      listQuestionSubmitted: [...questionsSubmit],
    };
    dispatch(submitQuestionsThunk(payload));
    dispatch(showHideModalSubmitQuestion(false));
  };

  const handleCancel = () => {
    dispatch(showHideModalSubmitQuestion(false));
  };

  return (
    <Modal title={'Submit?'} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Do you really want to delete this question?</p>
    </Modal>
  );
}

export default ModalSubmitQuestion;
