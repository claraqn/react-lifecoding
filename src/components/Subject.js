import React, { Component } from 'react';

class Subject extends Component{ // 이 코드는 js와 비슷하지만 js 는 아님(jsx임!)
    render(){ 
      //원래 js는 function render() 이렇게 적어줘야 하는데 
      //class 안의 function은 앞의 function 제외 가능
      return( // component 안에는 하나의 최상위 태그만 사용해야 함
        <header>
          <h1><a href="/" onClick={function(e){
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;