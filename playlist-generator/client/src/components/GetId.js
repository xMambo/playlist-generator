import React, {
    Component
} from "react";


export class GetId extends Component {
    state = {
        title: '',
        cityState: ''
    }

   
    getId = () => {

        console.log(this.state.title)

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: "artist",
            query: userInput
        }, function (err, data) {
            var ID = data.artists.items[0].id;
            if (err) {
                return console.log("Error occured: " + err);
            } {
                console.log("\n----------------------------------");
                console.log("Artist_id: " + ID)
                console.log("----------------------------------\n");

            }
        });

    }
    getId()
}



export default GetId