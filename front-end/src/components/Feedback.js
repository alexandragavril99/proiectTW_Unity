import { React, Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import frowny from "../assets/bad.png"
import smiley from "../assets/love.png"
import confused from "../assets/question.png"
import surprised from "../assets/shock.png"
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


class feedback extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    state = {
        grade: null,
        message: '',
        activityID: null,
        error: ''
    }

    handleSubmit(e){
        e.preventDefault();

        if (!this.state.grade) {
            return this.setState({...this.state, error: 'You must select an emoji as grade'})
        } else if(this.state.message.length < 10 || this.state.message.length > 100) {
            return this.setState({...this.state, error: 'Your feedback must be between 10 and 100 characters.'});
        } else {
            this.setState({...this.state, error: ''});

            const postURL = `http://localhost:8080/api/addFeedback/`;
            axios.post(postURL, {
                Text: this.state.message,
                Grade: this.state.grade,
                FeedbackDate: new Date(),
                IdActivity: this.state.activityID
            })
            .then((response) => {
                this.props.history.push({
                    pathname: '/home', 
                    state: { 
                        feedbackSent: true,
                    }
                });
            })
            .catch((error) => {
                console.log('Error');
                console.log(error);
                switch (error.response.status) {
                    case 400:
                        return this.setState({...this.state, error: 'Bad request.'})
                    default:
                        return this.setState({...this.state, error: ''})
                }
            });
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            activityID: this.props.location.state.activityID
        })
    }

    render() {
        return (
            <div>
                <div className="feed-inner-wrapper">
                    <div className="feed-inner">
                        <Button
                            onClick={() => this.setState({...this.state, grade: 1})}
                            color="primary"
                            variant="contained"
                            className="btn-feedback btn-feedback-left">
                            <img  src={frowny} alt="frowny" className="logo"/>
                        </Button>
                        <Button
                            onClick={() => this.setState({...this.state, grade: 2})}
                            color="primary"
                            variant="contained"
                            className="btn-feedback">
                            <img  src={confused} alt="confused" className="logo" />
                        </Button>
                    </div>
                    <div className="feed-inner">
                        <Button
                            onClick={() => this.setState({...this.state, grade: 3})}
                            color="primary"
                            variant="contained"
                            className="btn-feedback btn-feedback-left">
                            <img  src={surprised} alt="surprised" className="logo" />
                        </Button>
                        <Button
                            onClick={() => this.setState({...this.state, grade: 4})}
                            color="primary"
                            variant="contained"
                            className="btn-feedback">
                            <img  src={smiley} alt="smiley" className="logo"/>
                        </Button>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="auth-inner">
                    <label className="input-h">Write your feedback</label>
                    <textarea
                        name="text"
                        className="form-control-feed"
                        placeholder="Enter your feedback"
                        value={this.state.message}
                        onChange={(e) => this.setState({...this.state, message: e.target.value})}
                    ></textarea>

                    {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}

                    <button type="submit" className="btn-login">
                        Send feedback
                    </button>
                </form>
            </div>



        );
    }
}


export default feedback;