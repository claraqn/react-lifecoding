
import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import Contents from "./components/Content";
import Subject from "./components/Subject";




class App extends Component{ //하나의 컴포넌트
  constructor(props){ 
    //render 함수보다 먼저 실행되면서 컴포넌트를 초기화시켜주고 싶으면 constructor를 만들어서 사용
    super(props);
    this.state={
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wid Web!'},
      // state를 통해 값을 이 안의 값으로 초기화 시켜주는 것
      // 값을 은닉할 때 유용함
      welcome:{title:'Welcome', desc:'Hello,React!!'},
      contents:[
        {id:1, title:'HTML', desc:'Html is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JS', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
      var i = 0;
      while(i<this.state.contents.length){
        var data=this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i=i+1;
      } 
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({ // (렌더링을 해야하니까 꼭 이렇게!)
            mode:'welcome'
          });
        }.bind(this)} //bind 함수 -> 객체를 주입하게 되는 것
        >
        </Subject>
        <TOC onChangePage={function(id){ // 받아온 id 값
          this.setState({ // (렌더링을 해야하니까 꼭 이렇게!)
            mode:'read',
            selected_content_id:Number(id) // 여기에 id 값 뿌려줌 ( 문자열-> 숫자 로 변환해서!)
          });
        }.bind(this)}
        data={this.state.contents}></TOC>
        <Contents title={_title} desc={_desc}></Contents>
        {/* <Component props_name="props_value"> */}
      </div>
    );
    
    }
}

export default App;
