import React, { Component } from "react";
import { Link } from "react-router-dom";

class QuestionCard extends Component {
    render() {
        const questionAuthor = this.props.users.filter((user) => user.id === this.props.question.author)[0];
        return (
            <Link className="nav-link" to={`/questions/${this.props.question.id}`}>
                <div className="card mb-3 col-12">
                    <div className="row no-gutters align-items-center">
                        <div className="col-md-4">
                            <img src={questionAuthor.avatarURL} className="card-img" alt={questionAuthor.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Would You Rather</h5>
                                <p className="card-text text-dark">1. {this.props.question.optionOne.text}</p>
                                <p className="card-text text-dark">2. {this.props.question.optionTwo.text}</p>
                                <p className="card-text">
                                    <small className="text-muted">Created on {new Date(this.props.question.timestamp).toDateString()}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default QuestionCard;
