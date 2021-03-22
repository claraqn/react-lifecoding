import React, { Component } from 'react';

class TOC extends Component{
    render(){ 
      var lists=[];
      var data = this.props.data;
      var i =0;
      while(i<data.length){
        //데이터를 바꿨다고 로직을 바꾸지 않아도 되는 형식으로 만들어준 것
        //lists.push(<li><a href={"/content/"+data[i].id}>{data[i].title}</a></li>); ->이렇게 쓰면 개발자툴에서 오류발생->key를 사용해야 함
        lists.push(
          <li key={data[i].id}>
            <a 
              href={"/content/"+data[i].id}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id); // 선택된 id 값을 넘겨줌
              }.bind(this)}
            >{data[i].title}</a>
          </li>);

        i=i+1;
      }
      return (
        <nav>
              <ul>
                  {lists}
              </ul>
          </nav>
      );
    }
  }
  
  export default TOC;