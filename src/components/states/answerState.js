import { createContainer } from 'unstated-next';

function useAnswers(initialState = {}) {
  let [answers, setAnswers] = useState(initialState)
  let update = (step, stepAnswers) => {
    let _answers = {...answers};
    _answers[step] = stepAnswers;
    setAnswers(_answers);
  }
  return { answers, decrement, increment }
}
let Answers = createContainer(useAnswers)
