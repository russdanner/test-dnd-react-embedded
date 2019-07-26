import React from 'react';
import PropTypes from 'prop-types';
import DynamicComponent from '../DynamicComponent';

const TwoCol = props => (
  <div className={props.classes}>
    <DynamicComponent items={props.col1} />
    <DynamicComponent items={props.col2} />
  </div>
);

TwoCol.propTypes = {
  col1: PropTypes.array,
  col2: PropTypes.array
};

export default TwoCol;
