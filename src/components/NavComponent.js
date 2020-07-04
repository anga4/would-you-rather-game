import React from "react";
import { Link } from "react-router-dom";

function NavComponent(props) {
    const loggedUser = props.authedUser ? props.users.filter((user) => user.id === props.authedUser)[0] : "";
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    WYR
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {props.authedUser && (
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">
                                    New Question
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/leaderboard">
                                    Leader Board
                                </Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <span className="text-white font-weight-bold mr-2">Hello, {loggedUser.name}</span>
                            <img src={loggedUser.avatarURL} alt="girl" width="40px" />
                            <button
                                onClick={() => this.props.setAuthedUser(null)}
                                className="btn btn-sm btn-secondary ml-2 my-2 my-sm-0"
                                type="submit"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavComponent;
