import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

import { setIndex } from 'stores/questionSlice';
import FormQuestionSubmitted from './FormQuestionResults';
import { RoutePaths } from 'routes/route-constants';
import { resetQuestions } from 'stores/questionSlice';
import './DisplayResults.scss';

function DisplayResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useSelector((state) => state.questions.total);
  const index = useSelector((state) => state.questions.index);
  const questionsSubmitted = useSelector((state) => state.questions.questionsSubmitted);
  const currentQuestion = questionsSubmitted[index - 1];
  const totalScore = useSelector((state) => state.questions.totalScore);

  const handleChangePagination = (page) => {
    dispatch(setIndex(page));
  };

  const handleBack = () => {
    dispatch(resetQuestions());
    navigate(RoutePaths.GO_TO_PLAY);
  };

  return (
    <div className="results-container">
      <div className="results_score">
        <LoadingButton
          color="primary"
          variant="contained"
          fullWidth
          style={{ margin: '0', width: '150px', display: 'flex' }}
          onClick={handleBack}
        >
          <ArrowBackIcon /> &nbsp; Play again
        </LoadingButton>

        <h2>
          Your score: <span className="results_totalScore">{`${totalScore}`}</span>
        </h2>
      </div>

      <FormQuestionSubmitted
        key={currentQuestion.id}
        title={currentQuestion.title}
        answers={currentQuestion.answers}
        thumbnail={currentQuestion.thumbnail_link}
      />

      <Pagination defaultCurrent={1} total={total} pageSize={1} onChange={handleChangePagination} />
    </div>
  );
}

export default DisplayResults;
