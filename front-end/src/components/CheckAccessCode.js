import React, { Component } from "react";

class checkAccessCode extends Component {
    render() {
        return (
            <form>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h3 className="h-auth">Enter access code</h3>
                        <div className="form-group">
                            <label>Access Code</label>
                            <input
                                type="text"
                                name="accessCode"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter access code..."
                            />
                        </div>
                       < button type="submit" className="btn btn-primary btn-block">
                            OK
              </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default checkAccessCode;