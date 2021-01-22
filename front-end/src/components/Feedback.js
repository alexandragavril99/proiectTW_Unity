import { React, Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import frowny from "../assets/bad.png"
import smiley from "../assets/love.png"
import confused from "../assets/question.png"
import surprised from "../assets/shock.png"

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


class feedback extends Component {
    render() {
        return (
            <div>
                <div className="feed-inner">
                <Button
                    color="primary"
                    variant="contained"
                    className="btn-feedback">
                    <img  src={frowny} alt="frowny" className="logo"/>
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className="btn-feedback">
                    <img  src={confused} alt="confused" className="logo" />
                </Button>
                </div>
                <div className="feed-inner">
                <Button
                    color="primary"
                    variant="contained"
                    className="btn-feedback">
                    <img  src={smiley} alt="smiley" className="logo" />
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className="btn-feedback">
                    <img  src={surprised} alt="surprised" className="logo"/>
                </Button>
                </div>

                <div className="auth-inner">
                <label className="input-h">Write your feedback</label>
                    <input
                    type="text"
                    name="text"
                    onChange={this.handleChange}
                    className="form-control-feed"
                    placeholder="Enter your feedback"
                    />

                <button type="submit" className="btn-login">
                    Send feedback
                </button>
                </div>  
            </div>



        );
    }
}


export default feedback;