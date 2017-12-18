import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

// Game Page is shown when a user enters a game
class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.game) {
            this.setState({ game: nextProps.game });
        }
    }

    render() {
        return (
                <div>
                <h4>QuesitonPage</h4>
                </div>
        );
    }
}


export default QuestionPage;