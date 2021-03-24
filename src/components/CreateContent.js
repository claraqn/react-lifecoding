import React, { Component } from 'react';

class CreateContent extends Component{
    render(){
      return (
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){ //페이지전환 없이
              e.preventDefault();
              this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
              );
              alert('submit!');
            }.bind(this)}
          >
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name="desc" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }
  
  export default CreateContent; // class 이름과 동일하게 적어줘야 함