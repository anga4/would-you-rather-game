import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users).map((key) => {
            return users[key];
        })
    };
}

class LeaderBoard extends Component {
    render() {
        const rankedUsers = this.props.users
            .slice()
            .sort((a, b) => Object.keys(b.answers).length + b.questions.length - (Object.keys(a.answers).length + a.questions.length));
        return (
            <div className="row w-50 mx-auto mt-5">
                {rankedUsers.map((user, i) => (
                    <div key={i} className="card mb-3 col-12">
                        <div className="row align-items-center no-gutters">
                            <div className="col-md-3">
                                <img src={user.avatarURL} className="card-img" alt={user.name} />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>

                                    <p className="card-text">
                                        <span>Created Questions : {user.questions.length}</span>
                                    </p>
                                    <p className="card-text">
                                        <span>Answered Questions : {Object.keys(user.answers).length}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-header">Score</div>
                                    <div className="card-body bg-success text-white text-center font-weight-bolder">
                                        <span>{Object.keys(user.answers).length + user.questions.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(mapStateToProps)(LeaderBoard);
