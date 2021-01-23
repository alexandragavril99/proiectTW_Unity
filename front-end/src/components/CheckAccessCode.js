import React, { Component } from "react";
import axios from 'axios';

class checkAccessCode extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    state = {
        activityID: null,
        accessCode: '',
        error: ''
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Submitted');
        const postURL = `http://localhost:8080/api/checkAccessCode/${this.state.activityID}`;
        axios.post(postURL, {
            accessCode: this.state.accessCode
        })
        .then((response) => {
            console.log('Success');
            console.log(response.status);
        })
        .catch((error) => {
            console.log('Error');
            console.log(error);
            switch (error.response.status) {
                case 401:
                    return this.setState({...this.state, error: 'You are not a student.'})
                default:
                    return this.setState({...this.state, error: ''})
            }
        });
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            activityID: this.props.location.state.activityID
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="auth-inner">
                    <h3 className="h-auth">Enter access code</h3>
                    <label className="input-h">Access Code</label>
                    <input
                        type="text"
                        name="accessCode"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter access code"
                        value={this.state.accessCode}
                        onChange={(e) => this.setState({ ...this.state, accessCode: e.target.value })}
                    />
                    {this.state.error && (
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    )}
                    <button type="submit" className="btn-login">OK</button> 
                </div>
            </form>
        );
    }
}

export default checkAccessCode;
