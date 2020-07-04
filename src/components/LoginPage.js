import React, { Component } from "react";
import noAvatar from "../images/emptyAvatar.png";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAvatar: noAvatar,
            selectedUser: ""
        };
    }

    handleSelectUser = (id) => {
        let user = this.props.users.filter((user) => user.id === id);
        this.setState((prevState) => ({
            ...prevState,
            userAvatar: user[0].avatarURL,
            selectedUser: id
        }));
    };
    handleSignIn = () => {
        this.props.setAuthedUser(this.state.selectedUser);
    };

    render() {
        const { users } = this.props;
        return (
            <div className="row justify-content-center my-5">
                <div className="card text-center" style={{ width: "50%" }}>
                    <div className="card-header">
                        <h3 onClick={() => console.log(this.props)}>Welcome to the Would You Rather App!</h3>
                        <h4 className="text-muted">Please sign in to continue</h4>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <img src={this.state.userAvatar} alt="avatar" className="mb-2 rounded-circle" width="60%" />
                        </h5>
                        <p className="card-text">
                            {users && users.length > 0 ? (
                                <select
                                    className="custom-select custom-select-lg mb-3"
                                    value={this.state.selectedUser}
                                    onChange={(e) => this.handleSelectUser(e.target.value)}
                                >
                                    <option value="" disabled hidden>
                                        Select User
                                    </option>
                                    {users.map((user, i) => (
                                        <option key={i} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span className="font-weight-bolder" style={{ fontSize: 20 }}>
                                    <span className="spinner-border mr-2" role="status" />
                                    fetching_users
                                </span>
                            )}
                        </p>
                        <button className="btn btn-lg btn-block btn-primary" onClick={this.handleSignIn} disabled={this.state.selectedUser === ""}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
