import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string'


let defaultStyle = {
    color: "#fff"
};
let fakeServerData = {
    user: {
        name: 'Dovid',
        playlists: [
            {
                name: 'Suummer 2018',
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
                <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
                Filter
            </div>
        );
    }
}

class Playlist extends Component{
    render(){
        let playlist = this.props.playlist;
        return(
            <div style={{...defaultStyle,width:"25%",display:"inline-block"}}>
                <img src={playlist.imageUrl} style={{width:'160px'}}/>
                <h3> {playlist.name}</h3>
                <ul>
                    {
                        playlist.songs.map(song => <li>{song.name}</li>)
                    }
                </ul>
            </div>
        );

    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            serverData: {},
            filterString: ''
        }
    }

    //componentDidMount() is called the first time the component is rendered to the DOM
    componentDidMount() {
        // store the token into an object by parsing the querystring
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
if(!accessToken){
    return;
}

        /*http request
            1st argument: API endpoint. ie)'https://api.spotify.com/v1/me'
            2nd argument: Object literal. Pass the token as a header.
                ie) headers: {'Authorization': 'Bearer'  + access_token}
            fetch will return a promise so call .then on that promise. .then will get a response that we want to get as JSON.
            This in turn return a promise which we call .then, this is the actual data.
            I use that data to update the serverData
        */

        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then((response) => response.json())
            .then(data => this.setState({
                user: {
                    name: data.display_name
                }
            }))


        /* fetch Spotify playlist data  (me can be replaced with user_id)*/
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
            .then(data => this.setState({
              playlists: (data.items).map(item => {
                  console.log(data.items);
                  return {
                        name: item.name,
                      imageUrl: item.images[0].url,
                        songs: []
                    }
              })
           }))


    }
    //render() is called everytime the app needs to render
    render() {
        /* ternary operator: first check if userData is set, if so do all this stuff (filter) */
        let playlistToRender =
            this.state.user &&
            this.state.playlists
            ? this.state.playlists.filter(playlist =>
                playlist.name.toLowerCase().includes(
                    this.state.filterString.toLowerCase()))
            : []
        return (
            <div className="App">
                {/* '&&' so will only fill variable once serverData has user.name properties;
                    I changed && to '?' and ended div with ':' to get 'loading...' (ternary operator)
                */}
                {this.state.user ?
                <div>
                    <h1 style={{...defaultStyle, 'font-size': '54px'}}>
                        {this.state.user.name}'s Playlists
                    </h1>
                    {/* This will make playlists available within PlaylistCounter class's props */}
                    <PlaylistCounter playlists={playlistToRender}/>
                    {/* This will make playlists available within HoursCounterr class's props */}
                    <HoursCounter playlists={playlistToRender}/>
                    <Filter onTextChange={text => {
                        this.setState({filterString: text})
                    }}/>
                    {/* map transforms an array to another array of the same length */}
                    {playlistToRender.map(playlist =>
                        <Playlist playlist={playlist}/>
                    )}

                </div> : <button onClick={()=>window.location = 'http://localhost:8888/login'}
                        style={{'font-size':'50px'}}>Login with Spotify</button>
                }
            </div>
        );
    }
}

export default App;
