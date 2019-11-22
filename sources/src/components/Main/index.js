import React from 'react';
import DynamicComponent from '../DynamicComponent';

const Main = props => (
  <main  data-studio-component-path={props.cmsId} 
         data-studio-component={props.cmsId}
         data-studio-ice-path={props.cmsId}

        data-studio-ice=""
        data-studio-components-target="col1" 
        data-studio-components-objectid={props.objectId}
        data-studio-zone-content-type="/component/main">    	
        <DynamicComponent items={props.col1.item} />
        {props.objectId}<br/>
        {props.cmsId}
  </main>
);


export default Main;