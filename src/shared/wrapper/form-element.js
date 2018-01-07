import React from 'react';
import {TextField} from 'redux-form-material-ui';

export const inputRender = ({input, mProps, meta: {touched, error, warning}}) => (
  <div>
    <div>
      <TextField {...input} {...mProps}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
