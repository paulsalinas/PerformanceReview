import React, {Component} from 'react';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// the component should be in editing mode if there's no feedback(undefined).
// this will prompt the user to put in their feedback.
// when there's feedback, the user can go back and edit it.
export default class FeedbackForm extends Component {
  state = {
    feedback: this.props.review.feedback ? this.props.review.feedback : '',
    editing: this.props.review.feedback === undefined
  }

  render() {
    const {onDone} = this.props;
    const {grade, notes} = this.props.review;
    const {feedback, editing} = this.state;

    const onDoneHandler = () => {
      onDone(feedback);
      this.setState(Object.assign({}, this.state, {editing: false}))
    };

    const onEditHandler = () => {
      this.setState(Object.assign({}, this.state, {editing: true}));
    };

    return(
      <div>
        <h4>
          {grade}
        </h4>
        <p>
          {notes}
        </p>
        {
          editing ?
            <div>
              <FormGroup controlId="feedback" >
                <FormControl
                  value={feedback}
                  componentClass="textarea"
                  placeholder="What's your feedback?"
                  onChange={this._feedbackChangeHandler}
                />
              </FormGroup>
              <Button onClick={onDoneHandler}>
                Submit
              </Button>
            </div>
          :
          <div>
            <p><span style={{fontWeight: 'bold'}}>your feedback: </span>{feedback}</p>
            <Button onClick={onEditHandler}>
              Edit
            </Button>
          </div>

        }
      </div>
    );
  }

  _feedbackChangeHandler = (e) => {
    this.setState(
      Object.assign(
        {},
        this.state,
        {feedback: e.target.value}
      )
    );
  }
}
