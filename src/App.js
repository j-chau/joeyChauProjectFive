import React, { Component } from 'react';
import firebase from './firebase.js';

import Post from './components/Posts.js';

import './App.css';
import NewForm from './components/NewForm.js';

// click for new post:
//  x new post form expands from button -> form component
//    o add transitions
//  o onClick newButton trigger function to intake user data
//  o Unsplash API call made when title loses focus after text input
//  o use 'novalidate' and 'required' to set required fields with custom error messages
//  o onClick delete: clear form and close form
//  o onClick post: add date and time to data, push user data to firebase
// likeCounter: increment on click, push value to firebase



class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      showNew: false
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
      const newState = [];
      const data = res.val();
      data.forEach(el => {
        for (let i in el) {
          newState.push({
            key: i,
            content: el[i]
          })
        }
      });
      this.setState({
        posts: newState
      })
    })
  }

  handleClick = () => {
    // console.log("clicked");
    this.setState({
      showNew: true
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <h1 className="block">fresh vibes</h1>
        {!this.state.showNew
          ? <button className="block newBtn" onClick={this.handleClick}>+ New</button>
          : <NewForm />}
        {this.state.posts.map(el => {
          const { description, header, songList } = el.content;
          return (
            <Post
              key={el.key}
              header={header}
              description={description}
              songList={songList}
            />
          )
        })}

      </div>
    );
  }
}

export default App;
