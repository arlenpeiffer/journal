import React, { useState } from 'react';
import { Button, Icon, Input, Form } from 'antd';

function AddItem(props) {
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div>
      <div
        onMouseDown={() => {
          setIsAddingItem(!isAddingItem);
        }}
        style={
          props.padding
            ? {
                paddingBottom: isAddingItem ? '0px' : props.padding,
                paddingLeft: props.padding,
                paddingRight: props.padding,
                paddingTop: props.padding,
                cursor: 'pointer'
              }
            : null
        }
      >
        <Icon
          style={{ cursor: 'pointer' }}
          type={isAddingItem ? 'down' : 'plus'}
        />
        <span style={{ cursor: 'pointer', padding: '0 8px' }}>Add new</span>
      </div>
      {isAddingItem ? (
        <div
          style={{
            display: 'flex',
            paddingLeft: props.padding && props.padding,
            paddingRight: props.padding && props.padding
          }}
        >
          <Form.Item
            help={error}
            style={{ marginBottom: props.padding ? props.padding : 0 }}
            validateStatus={error ? 'warning' : ''}
          >
            <Input
              allowClear
              autoFocus
              onChange={event => setInput(event.target.value)}
              onPressEnter={() =>
                props.onSubmit(input, setError, setInput, setIsAddingItem)
              }
              value={input}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: props.padding ? props.padding : 0 }}
          >
            <Button
              onClick={() =>
                props.onSubmit(input, setError, setInput, setIsAddingItem)
              }
              style={{ marginLeft: 8, marginRight: 8 }}
              type="primary"
            >
              Add
            </Button>
          </Form.Item>
        </div>
      ) : null}
    </div>
  );
}

export default AddItem;
