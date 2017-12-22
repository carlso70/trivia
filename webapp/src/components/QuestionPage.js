import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog/Dialog';

const style = {
    margin: 15,
    padding: 15
};
class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            selected: "",
            showModal: false,
            answer: ""
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.game != this.state.game) {
            this.setState({ game: nextProps.game });
        }
    }

    onChangeAnswer = (e, value) => {
        this.setState({
            selected: value
        });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    };

    submitAnswer = () => {
        // We don't want to grab the answer from the latest game state in case the question changes while the modal is open
        this.setState({ 
            showModal: true,
            answer: this.state.game.question.answer
         });
        this.props.broadcast(this.state.selected);
    }

    render() {
        var answerResponse;
        if (this.state.selected == this.state.answer)
            answerResponse = <h3>Correct!</h3>;
        else
            answerResponse = "Sorry, the correct answer was " + this.state.answer;
        return (
            <div >
                <Paper style={style} zDepth={2}>
                    <h4>{this.state.game.question.question}</h4>
                    <RadioButtonGroup name="answer" onChange={this.onChangeAnswer}>
                        {this.state.game.question.choices.map((row, index) => (
                            <RadioButton
                                key={index}
                                value={row}
                                label={row}
                            />
                        ))}
                    </RadioButtonGroup>
                    <Dialog
                        modal={false}
                        open={this.state.showModal}
                        onRequestClose={this.handleClose}
                    >
                        {answerResponse}
                    </Dialog>
                    <RaisedButton
                        primary={true}
                        label="Answer"
                        onClick={() => this.submitAnswer()} />
                </Paper>
            </div>
        );
    }
}


export default QuestionPage;
