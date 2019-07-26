import React from 'react';
import DynamicComponent from '../DynamicComponent';



export default class App extends React.Component {


  componentDidMount() {
    this.getPageRecipe();
  }

  updateState(results) {
  	this.setState(results)
  }

  getPageRecipe() {
    fetch('/api/page.json?id=/site/website/index.xml')
       .then(response => response.json())
       .then(data => this.updateState(data));

/*
    fetch('/api/1/site/graphql', {
    	method:'post',
    	headers: {
      		'Content-Type': 'application/json'
    	}, 
    	body:'{"query":"query Page { page: pages { items { localId content__type } } }","variables":null,"operationName":"Page"}'})
       .then(response => response.json())
       .then(data => this.updateState(data));
       */
  }
  
  render() {
  	if(!this.state) return "";
	return ( <div  data-studio-component-path="/site/website/index.xml" 
		           data-studio-component="/site/website/index.xml"
                   data-studio-ice-path="/site/website/index.xml"
                   data-studio-ice="" 
                   data-studio-ice-label="Column 1"

                   data-studio-components-target="col1" 
                   data-studio-components-objectId={this.state.objectId}>
				<DynamicComponent items={this.state.col1.item} />
			</div>)
  }
}