import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
    color: "#fff"
}

/*Once you make a class, it now becomes available to you as a tag */
class Aggregate extends Component{
    render(){
        return(
            //...allows you to have an object that you can extend
           <div style={{...defaultStyle,width:"40%", display: "inline-block"}}>
               <h2>Number Text</h2>
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
          <h1 style={{...defaultStyle,'font-size':'54px'}}>Title</h1>
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
