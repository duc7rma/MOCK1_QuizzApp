import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './FormAnswer.scss';
import AddAnswer from './add/AddAnswer';
import UpdateAnswer from './update/UpdateAnswer';
import { setListAnswer } from 'stores/answerAdminSlice';

function FormAnswer() {
  const dispatch = useDispatch();

  // init answer exist
  const listAnswers = useSelector((state) => state.questionsAdmin.currentQuestionDetail.answers);

  // init + add answers
  const listAnswersRender = useSelector((state) => state.answerAdmin.answers);

  useEffect(() => {
    dispatch(setListAnswer(listAnswers));
  }, [listAnswers]);

  return (
    <div className="answer-wrapper">
      <h3 className="answer-title">Answer</h3>

      {listAnswersRender &&
        listAnswersRender.length > 0 &&
        listAnswersRender.map((answer) => (
          <UpdateAnswer key={answer.id} content={answer.content} answerId={answer.id} correct={answer.is_correct} />
        ))}
      <AddAnswer />
    </div>
  );
}

export default FormAnswer;
