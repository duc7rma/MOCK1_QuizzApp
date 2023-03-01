import { useSelector } from 'react-redux';

import FormQuestion from './FormQuestion';
import './ListQuestions.scss';

function ListQuestions() {
  const listQuestions = useSelector((state) => state.questions.questions);

  return (
    <div className="list-questions">
      {listQuestions.map((question) => (
        <FormQuestion key={question.id} title={question.title} answers={question.answers} />
      ))}
    </div>
  );
}

export default ListQuestions;
