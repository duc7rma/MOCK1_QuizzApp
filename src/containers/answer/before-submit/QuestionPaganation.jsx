import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import FormQuestion from 'containers/question/FormQuestion';
import { setIndex } from 'stores/questionSlice';

function QuestionPagination() {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.questions.total);
  const index = useSelector((state) => state.questions.index);
  const allQuestions = useSelector((state) => state.questions.questions);
  const currentQuestion = allQuestions[index - 1];

  const handleChangePagination = (page) => {
    dispatch(setIndex(page));
  };
  return (
    <div className="play-container">
      <FormQuestion
        key={currentQuestion.id}
        title={currentQuestion.title}
        answers={currentQuestion.answers}
        thumbnail={currentQuestion.thumbnail_link}
      />

      <Pagination defaultCurrent={1} total={total} pageSize={1} onChange={handleChangePagination} />
    </div>
  );
}

export default QuestionPagination;
