import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { Redirect } from "react-router-dom";

function mapStateToProps({ users, questions, authedUser }) {
    return {
        users: Object.keys(users).map((key) => {
            return users[key];
        }),
        questions: Object.keys(questions).map((key) => {
            return questions[key];
        }),
        authedUser: authedUser
    };
}

class QuestionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteChoice: null,
            redirectToHome: false
        };
    }

    handleSubmmit = (authUser, qid, answer) => {
        if (this.state.voteChoice) {
            this.props.handleSaveQuestionAnswer(authUser, qid, answer);
            this.setState({ redirectToHome: true });
        } else {
            window.alert("Select an option");
        }
    };
    render() {
        const question = this.props.questions.filter((question) => question.id === this.props.match.params.id)[0];
        const questionAuthor = this.props.users.filter((user) => user.id === question.author)[0];
        return this.state.redirectToHome ? (
            <Redirect to="/" />
        ) : (
            <div className="row w-50 mx-auto mt-5">
                <div className="card mb-3 col-12">
                    <div className="row no-gutters align-items-center">
                        <div className="col-md-4">
                            <img src={questionAuthor.avatarURL} className="card-img" alt={questionAuthor.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">{questionAuthor.name} asks: </h3>
                                <h5>Would You Rather</h5>
                                {question.optionOne.votes.includes(this.props.authedUser) ||
                                question.optionTwo.votes.includes(this.props.authedUser) ? (
                                    <>
                                        <br />
                                        <span>
                                            {question.optionOne.text} <br /> (Votes : {question.optionOne.votes.length})
                                        </span>
                                        <div class="progress">
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width:
                                                        (question.optionOne.votes.length /
                                                            (question.optionOne.votes.length + question.optionTwo.votes.length)) *
                                                            100 +
                                                        "%"
                                                }}
                                            >
                                                {(question.optionOne.votes.length /
                                                    (question.optionOne.votes.length + question.optionTwo.votes.length)) *
                                                    100}
                                                %
                                            </div>
                                        </div>
                                        <br />
                                        <span>
                                            {question.optionTwo.text} <br /> (Votes : {question.optionTwo.votes.length})
                                        </span>
                                        <div class="progress">
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width:
                                                        (question.optionTwo.votes.length /
                                                            (question.optionOne.votes.length + question.optionTwo.votes.length)) *
                                                            100 +
                                                        "%"
                                                }}
                                            >
                                                {(question.optionTwo.votes.length /
                                                    (question.optionOne.votes.length + question.optionTwo.votes.length)) *
                                                    100}
                                                %
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-check">
                                            <input
                                                onChange={(e) => e.target.checked && this.setState({ voteChoice: e.target.value })}
                                                className="form-check-input"
                                                type="radio"
                                                name="options"
                                                id="optionOne"
                                                value="optionOne"
                                            />
                                            <label className="form-check-label" htmlFor="optionOne">
                                                {question.optionOne.text}
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onChange={(e) => e.target.checked && this.setState({ voteChoice: e.target.value })}
                                                className="form-check-input"
                                                type="radio"
                                                name="options"
                                                id="optionTwo"
                                                value="optionTwo"
                                            />
                                            <label className="form-check-label" htmlFor="optionTwo">
                                                {question.optionTwo.text}
                                            </label>
                                        </div>
                                    </>
                                )}
                                <br />
                                <p>
                                    {question.optionOne.votes.includes(this.props.authedUser) ||
                                    question.optionTwo.votes.includes(this.props.authedUser) ? null : (
                                        <button
                                            onClick={() => this.handleSubmmit(this.props.authedUser, question.id, this.state.voteChoice)}
                                            className="btn btn-sm btn-primary mr-2"
                                        >
                                            Submit
                                        </button>
                                    )}

                                    {/* {questionAuthor.id === this.props.authedUser && (
                                        <button onClick={() => console.log(this.props)} className="btn btn-sm btn-danger">
                                            Delete
                                        </button>
                                    )} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer: handleSaveQuestionAnswer })(QuestionInfo);
