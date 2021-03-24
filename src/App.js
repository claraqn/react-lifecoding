
import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";



class App extends Component{ //하나의 컴포넌트
  constructor(props){ 
    //render 함수보다 먼저 실행되면서 컴포넌트를 초기화시켜주고 싶으면 constructor를 만들어서 사용
    super(props);
    this.max_content_id=3; // create 할 때 state값으로 넣기 위해 원래 있는 정보 다음 인덱스를 선언
    this.state={
      mode:'create',
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
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data=this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i=i+1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
      var _content=this.getReadContent();
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    }
    else if(this.state.mode === 'create'){
        _article=<CreateContent onSubmit={function(_title,_desc){
        //add content to this.state.contents
        this.max_content_id=this.max_content_id+1;
        // this.state.contents.push( // push < concat -> concat은 원본을 바꾸지 않고 결합해주기 때문에 지향해야함
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat( 
          //  원본을 복제해서 값을 결합하고 새로운 배열에 추가한 다음 setState에 넣어줌 -> 훨씬 좋은 방법
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({ 
          // push 만 하면 react가 모르기 때문에 이거 꼭 해줘야 함
          contents:_contents
        });
        console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update'){
      _content=this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={function(_id,_title,_desc){
        //add content to this.state.contents
        var _contents=Array.from(this.state.contents);
        var i=0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i]={id:_id, title:_title, desc:_desc};
            break;
          }
          i=i+1;
        }
        this.setState({ 
          // push 만 하면 react가 모르기 때문에 이거 꼭 해줘야 함
          contents:_contents
        });
        console.log(_title,_desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
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
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>
        {this.getContent()}
        {/* <Component props_name="props_value"> */}
      </div>
    );
    
    }
}

export default App;
