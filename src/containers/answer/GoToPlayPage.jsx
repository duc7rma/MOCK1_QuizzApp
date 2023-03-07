import { useSelector } from 'react-redux';

import QuestionPagination from './before-submit/QuestionPaganation';
import EnterQuestions from './before-submit/EnterQuenstion';
import DisplayResults from './after-submit/DisplayResults';

function GoToPlayPage() {
  const total = useSelector((state) => state.questions.total);
  const isSubmitted = useSelector((state) => state.questions.isSubmitted);

  return (
    <div className="go-to-play">
      {total ? !isSubmitted ? <QuestionPagination /> : <DisplayResults /> : <EnterQuestions />}
    </div>
  );
}

export default GoToPlayPage;
