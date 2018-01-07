import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class SimpleModal extends Component {
  constructor(props) {
    super(props);
    let fields = {};
    props.inputs.forEach(el => fields[el.key] = '');
    this.state = fields;
  }

  static PropTypes = {
    open: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
    inputs: PropTypes.array.isRequired,
    changeModal: PropTypes.func.isRequired
  };

  createHandler(key) {
    return (e) => {
      this.setState({[key]: e.target.value});
    };
  }

  handler() {
    this.props.handler(this.state);
  }

  closeModal() {
    this.props.changeModal(false);
  }

  render() {
    const {open, inputs} = this.props;
    const actions = [
      <FlatButton
        key='1'
        label='Cancel'
        primary={true}
        onTouchTap={::this.closeModal}
      />,
      <FlatButton
        key='2'
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={::this.handler}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={::this.closeModal}
        >
          {inputs.map((el, i) =>
            <TextField
              key={i}
              hintText={el.hint}
              type={el.type}
              value={this.state[el.key]}
              onChange={this.createHandler(el.key)}
            />)}
        </Dialog>
      </div>
    );
  }
}
