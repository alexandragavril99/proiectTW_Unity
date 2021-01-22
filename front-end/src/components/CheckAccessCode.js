import React, { Component } from "react";

class checkAccessCode extends Component {
    render() {
        return (
            <form>
                    <div className="page-inner">
                        <h3 className="h-auth">Enter access code</h3>
                        
                            <label className="input-h">Access Code</label>
                            <input
                                type="text"
                                name="accessCode"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter access code..."
                            />

                       < button type="submit" className="btn-login">
                            OK
                    </button>
                </div>
            </form>
        );
    }
}

export default checkAccessCode;
