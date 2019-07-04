import React, { Component } from "react";

export class GetTracks extends Component {




        state = {
            items: [],
            isLoaded: false,
        }



    getTracks = () => {

        var keys = require("./Keys");
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);


        const BASEURL = "https://api.spotify.com/v1/artists/";
        const TOPTRACKS = "/top-tracks?country=US"

        spotify
            .request(BASEURL + "your old droog" + TOPTRACKS)
            .then(function (data) {
                console.log("Track 1: " + data.tracks[0].name + " - " + data.tracks[0].popularity);
                console.log("Track 2: " + data.tracks[1].name + " - " + data.tracks[1].popularity)
                console.log("Track 3: " + data.tracks[2].name + " - " + data.tracks[2].popularity)
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
        }
        getTracks()
    
    }
    render() {
    return this.props.newLat
  }



export default GetTracks