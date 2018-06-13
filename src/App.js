import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,

}

/*Once you make a class, it now becomes available to you as a tag */
class Aggregate extends Component{
    render(){
        return(
           <div style={{width:"40%", display: "inline-block"}}>
               <h2 style={{color:"purple"}}>Number Text</h2>
           </div>
        );
    }
}

class Filter extends Component{
    render(){
        return(
            <div style={defaultStyle}>
                <img/>
                <input type="text"/>
                Filter
            </div>
        );
    }
}

class Playlist extends Component{
    render(){
        return(
            <div style={{...defaultStyle,width:"25%",display:"inline-block"}}>
                <img/>
                <h3> Playlist Name</h3>
                <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
            </div>
        );

    }
}



class App extends Component {
  render() {
      let name = 'Dovid';
    return (
      <div className="App">
          <h1 style={{color:defaultTextColor}}>Title</h1>
          <Aggregate/>
          <Aggregate/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
      </div>
    );
  }
}

export default App;
