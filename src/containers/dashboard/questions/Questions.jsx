import ResultsQuestions from './results/ResultsQuestions';
import SearchQuestionsForm from './search/SearchQuestionsForm';
import './Questions.scss';

function Questions() {
  return (
    <div className="question-container">
      <h1 className="question-container_title">Questions</h1>
      <SearchQuestionsForm />
      <ResultsQuestions />
    </div>
  );
}

export default Questions;
