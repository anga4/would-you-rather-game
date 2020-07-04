import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";
import QuestionCard from "./QuestionCard";

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

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabDisplay: "unanswered"
        };
    }
    render() {
        const sortedQuestions = this.props.questions.slice().sort((a, b) => b.timestamp - a.timestamp);
        const answeredQuestions = sortedQuestions.filter(
            (question) => question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser)
        );
        const unansweredQuestions = sortedQuestions.filter(
            (question) => !question.optionOne.votes.includes(this.props.authedUser) && !question.optionTwo.votes.includes(this.props.authedUser)
        );
        return (
            <div>
                <div className="row text-center w-50 mx-auto mt-3" style={{ backgroundColor: "#F7F7F7", border: "2px solid grey" }}>
                    <div
                        onClick={() => this.setState({ tabDisplay: "unanswered" })}
                        className={`col-6 py-3 tab_custom_styles${this.state.tabDisplay === "unanswered" ? " tab__active" : ""}`}
                    >
                        UNANSWERED
                    </div>
                    <div
                        onClick={() => this.setState({ tabDisplay: "answered" })}
                        className={`col-6 py-3 tab_custom_styles${this.state.tabDisplay === "answered" ? " tab__active" : ""}`}
                    >
                        ANSWERED
                    </div>
                </div>
                <div className="row justify-content-center w-50 mx-auto mt-3">
                    {this.state.tabDisplay === "unanswered" &&
                        unansweredQuestions.map((question, i) => <QuestionCard key={i} question={question} users={this.props.users} />)}
                    {this.state.tabDisplay === "answered" &&
                        answeredQuestions.map((question, i) => <QuestionCard key={i} question={question} users={this.props.users} />)}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, { setAuthedUser: setAuthedUser, handleInitialData: handleInitialData })(HomePage);
