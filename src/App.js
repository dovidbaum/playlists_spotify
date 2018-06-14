import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
    color: "#fff"
};
let fakeServerData = {
    user: {
        name: 'Dovid',
        playlists: [
            {
                name: 'Summer 2018',
                songs: [{name: 'live that long', duration: 1375},
                    {name: 'Fu-gee-la', duration: 4583}, {name:'North Korea', duration: 7352}]
            },
            {
                name: 'State of Jazz',
                songs: [{name:'Thinkin of', duration: 6532},
                    {name:'Somethin my Hear Trusts', duration: 2314}, {name: 'Need you still', duration: 6321}]
            },
            {
                name: 'My Shazzam Tracks',
                songs: [{name: 'colors', duration: 3594},
                    {name: 'Just Listen', duration: 2397}, {name:'Ball and Biscuit', duration: 3654}]
            },
            {
                name: 'This is Mos Def',
                songs: [{name:'Ms. Fat Booty', duration: 3541},
                    {name: 'Mathematics', duration: 3687}, {name:'Fear not of man', duration: 5421}]
            },
        ]
    }
};

/*Once you make a class, it now becomes available to you as a tag */
class PlaylistCounter extends Component{
    render(){
        return(
            //...allows you to have an object that you can extend
           <div style={{...defaultStyle,width:"40%", display: "inline-block"}}>
               <h2>{this.props.playlists.length} playlists</h2>
           </div>
        );
    }
}
class HoursCounter extends Component{
    render(){
        /* reduce() reduces to a single value. Reduce the playlist to a list of songs */
        /* we have an acc that starts off as nothing and we add eachPlaylists songs to that*/
        let allSongs = this.props.playlists.reduce((acc,eachPlaylist)=> {
            return acc.concat(eachPlaylist.songs)
        },[]);
        let totalDuration = allSongs.reduce((acc,eachSong)=>{
            return (acc + eachSong.duration)
        },0);
        return(
            <div style={{...defaultStyle,width:"40%", display: "inline-block"}}>
                <h2>{Math.floor(totalDuration/60)} hours</h2>
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
                <h3> {this.props.playlist.name}</h3>
                <ul>
                    {
                        this.props.playlist.songs.map(song => <li>{song.name}</li>)
                    }
                </ul>
            </div>
        );

    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {serverData: {}}
    }

    //componentDidMount() is called the first time the component is rendered to the DOM
    componentDidMount() {
        /* wrapping in setTimeout to fake the loading */
        setTimeout(() => {
                this.setState({serverData: fakeServerData});
            },
            2000);
    }

    //render() is called everytime the app needs to render
    render() {
        let name = 'Dovid';
        return (
            <div className="App">
                {/* '&&' so will only fill variable once serverData has user.name properties;
                    I changed && to '?' and ended div with ':' to get 'loading...' (ternary operator)
                */}
                {this.state.serverData.user ?
                <div>
                    <h1 style={{...defaultStyle, 'font-size': '54px'}}>
                        {this.state.serverData.user.name}'s Playlists
                    </h1>
                    <PlaylistCounter
                        /* This will make playlists available within PlaylistCounter class's props */
                        playlists={this.state.serverData.user.playlists}/>
                    <HoursCounter
                        /* This will make playlists available within HoursCounterr class's props */
                        playlists={this.state.serverData.user.playlists}/>
                    <Filter/>
                    {/* map transforms an array to another array of the same length */}
                    {this.state.serverData.user.playlists.map(playlist =>
                        <Playlist playlist={playlist}
                        />
                    )}

                </div> : <h1>Loading...</h1>
                }
            </div>
        );
    }
}

export default App;
