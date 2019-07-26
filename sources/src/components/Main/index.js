import React from 'react';
import PropTypes from 'prop-types';
import DynamicComponent from '../DynamicComponent';

const Main = props => (
  <main data-studio-component-path={props.cmsId} 
        data-studio-component={props.cmsId}
        data-studio-ice-path={props.cmsId}
        data-studio-ice="" 

        data-studio-components-target="col1" 
        data-studio-components-objectid={props.objectId}>
    	
		    <DynamicComponent items={props.col1.item} />
  </main>
);

Main.propTypes = {
  col1: PropTypes.array
};

export default Main;