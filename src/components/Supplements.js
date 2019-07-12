import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { CheckboxGroup } from './AntFields';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { addSupplement } from '../redux/actions/logs';

class Supplements extends React.Component {
  state = {
    error: '',
    isAddingSupplement: false,
    value: ''
  };
  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  onSubmit = () => {
    const { value } = this.state;
    const { logs } = this.props;
    if (value.trim() === '') {
      this.setState({ error: 'Uh oh, needs a name..' });
    } else if (logs.supplements.find(item => item === value)) {
      this.setState({ error: "There's already one of those.." });
    } else {
      this.props.addSupplement(value);
      this.setState({
        error: '',
        isAddingSupplement: false,
        value: ''
      });
    }
  };
  render() {
    const { error, isAddingSupplement, value } = this.state;
    const { logs, setFieldValue } = this.props;
    return (
      <div>
        <Field
          component={CheckboxGroup}
          name="supplements"
          label="Supplements"
          onChange={checkedValues => {
            setFieldValue('supplements', checkedValues.sort());
          }}
          style={{ marginBottom: 0 }}
        >
          {logs.supplements.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox value={item}>{item}</Checkbox>
            </div>
          ))}
        </Field>
        <div style={{ marginBottom: 24 }}>
          <div
            onClick={() =>
              this.setState({ isAddingSupplement: !isAddingSupplement })
            }
          >
            <Icon type={isAddingSupplement ? 'down' : 'plus'} />
            <span style={{ paddingLeft: 8, paddingRight: 8 }}>Add new</span>
          </div>
          {isAddingSupplement ? (
            <div style={{ display: 'flex' }}>
              <Form.Item help={error} validateStatus={error ? 'warning' : ''}>
                <Input
                  allowClear
                  autoFocus
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  value={value}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={this.onSubmit}
                  style={{ marginLeft: 8, marginRight: 8 }}
                  type="primary"
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchtoProps = dispatch => ({
  addSupplement: supplement => dispatch(addSupplement(supplement))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Supplements);
