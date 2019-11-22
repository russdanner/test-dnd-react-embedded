import React from 'react';

import Main from '../Main';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';


import RichText from '../RichText';
import TwoCol from '../TwoCol';



export default class DynamicComponent extends React.Component {
  constructor(props) {
    super(props);

    this.renderElement = this.renderElement.bind(this);
    this.recurseElements = this.recurseElements.bind(this);
  }

    renderElement(item) {
        var components = {
          '/component/main': Main,
          '/component/shelf': Shelf, 
          '/component/filter': Filter,
          '/component/githubcorner': GithubCorner,
          '/component/floatcart': FloatCart,
          '/component/rich-text': RichText,
          '/component/2-col': TwoCol,
        }

        if(components[item["content-type"]]) {
          item.key = item.objectId
          return React.createElement(components[item["content-type"]], item);
        }
        
        return (<div>No component found for type: {item["content-type"]}</div>)
  }

	recurseElements(item) {
        return (Object.prototype.toString.call(item) === '[object Array]')
            ? item.map(this.recurseElements)
            : this.renderElement(item);
    }

  render() {
  	var content = []; 

    if(this.props.items)        
      this.props.items.map(item => { return content.push(this.recurseElements(item)) })
  
    return content
  }
}



