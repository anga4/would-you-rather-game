import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreateQuestion } from "../actions/questions";
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

class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionOne: "",
            optionTwo: "",
            isSaving: false,
            redirectToHome: false
        };
    }
    handleSaveQuestion = () => {
        console.log(this.props.authedUser, this.state.optionOne, this.state.optionTwo);
        this.setState({ isSaving: true });
        this.props.handleCreateQuestion(this.props.authedUser, this.state.optionOne, this.state.optionTwo);
        setTimeout(() => {
            this.setState({ isSaving: false, redirectToHome: true });
        }, 1000);
    };
    render() {
        return this.state.redirectToHome ? (
            <Redirect to="/" />
        ) : (
            <div className="row mt-5 w-50 mx-auto">
                <div className="card w-100">
                    <div className="card-header">
                        <h3>Would You Rather</h3>
                    </div>
                    <div className="card-body">
                        <span className="pb-3 font-weight-bold">Option 1</span>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                onChange={(e) => this.setState({ optionOne: e.target.value })}
                                value={this.state.optionOne}
                                className="form-control"
                                placeholder="enter option 1"
                                aria-label="optionOne"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <span className="pb-3 font-weight-bold">Option 2</span>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                onChange={(e) => this.setState({ optionTwo: e.target.value })}
                                value={this.state.optionTwo}
                                className="form-control"
                                placeholder="enter option 2"
                                aria-label="optionTwo"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        {this.state.isSaving ? (
                            <div className="spinner-border float-right" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <button onClick={() => this.handleSaveQuestion()} className="btn btn-primary float-right">
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { handleCreateQuestion: handleCreateQuestion })(NewQuestion);
