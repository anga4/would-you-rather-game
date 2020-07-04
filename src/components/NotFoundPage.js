import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="row justify-content-center mt-5">
            <div className="card col-7 text-center">
                <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: 200 }}>
                        404
                    </h5>
                    <p className="card-text">
                        <h1 className="text-muted">Page Not Found</h1>
                    </p>
                    <Link className="btn btn-primary" to="/">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default NotFoundPage;
