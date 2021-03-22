import React, { Component } from 'react';

class Contents extends Component{
    render(){
      return (
        <footer>
              <h2>{this.props.title}</h2>
              {this.props.desc}
          </footer>
      );
    }
  }
  
  export default Contents; // class 이름과 동일하게 적어줘야 함