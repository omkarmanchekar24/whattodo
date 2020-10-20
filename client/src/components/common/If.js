import React from 'react';

const If = (props) => {
  return <React.Fragment>{props.show ? props.children : null}</React.Fragment>;
};

export default If;
