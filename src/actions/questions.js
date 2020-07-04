import { saveQuestion, saveQuestionAnswer } from "../database/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

export function createQuestion(question) {
    return {
        type: CREATE_QUESTION,
        question
    };
}

export function addQuestionAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    };
}

export function handleCreateQuestion(author, optionOneText, optionTwoText) {
    return (dispatch) => {
        return saveQuestion({
            author,
            optionOneText,
            optionTwoText
        }).then((question) => dispatch(createQuestion(question)));
    };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        const data = {
            authedUser,
            qid,
            answer
        };
        saveQuestionAnswer(data).then(() => {
            dispatch(addQuestionAnswer(authedUser, qid, answer));
        });
    };
}
