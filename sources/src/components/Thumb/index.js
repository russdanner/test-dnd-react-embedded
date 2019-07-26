import React from 'react';
import PropTypes from 'prop-types';

const Thumb = props => (
  <div className={props.classes}
  		data-studio-component-path={props.cmsId} 
        data-studio-component={props.cmsId}
        data-studio-ice-path={props.cmsId}
        data-studio-ice="" >

    <img src={props.src} alt={props.alt} title={props.title} />
  </div>
);

Thumb.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  src: PropTypes.string.isRequired,
  cmsId: PropTypes.string.isRequired
};

export default Thumb;
