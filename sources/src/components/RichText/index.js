import React from 'react';
import PropTypes from 'prop-types';

const RichText = props => (
  <div className={props.classes} 
  data-studio-component-path={props.cmsId} 
  data-studio-component={props.cmsId}
  data-studio-ice-path={props.cmsId}
  data-studio-ice="" >
    <div
      dangerouslySetInnerHTML={{
        __html: props.copy
      }}
    />
  </div>
);

RichText.propTypes = {
  copy: PropTypes.string.isRequired
};

export default RichText;
