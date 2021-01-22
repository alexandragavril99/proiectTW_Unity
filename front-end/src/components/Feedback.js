import { React, Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEmotionsTwoTone from '@material-ui/icons/EmojiEmotionsTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentDissatisfiedTwoTone';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));



class feedback extends Component {
    render() {
        return (
            <div>

                <Button
                    variant="contained"
                    color="primary"



                >
                    <img src="../assets/bad.png" />
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"

                >
                    <img src="../assets/bad.png" />
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"

                >
                    <img src="../assets/bad.png" />
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"

                >
                    <img src="../assets/bad.png" />
                </Button>

                <input type="text"
                    name="accessCode"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter access code..."> </input>

            </div>



        );
    }
}


export default feedback;