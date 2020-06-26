import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "./actions/authedUser";
import { handleInitialData } from "./actions/shared";
import LoginPage from "./components/LoginPage";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavComponent from "./components/NavComponent";
import LeaderBoard from "./components/LeaderBoard";
import NewQuestion from "./components/NewQuestion";

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

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        return (
            <div>
                <NavComponent {...this.props} />
                <div className="container">
                    {this.props.authedUser === null ? (
                        <LoginPage {...this.props} />
                    ) : (
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/leaderboard" exact component={LeaderBoard} />
                            <Route path="/question" exact component={NewQuestion} />
                        </Switch>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { setAuthedUser: setAuthedUser, handleInitialData: handleInitialData })(App);
