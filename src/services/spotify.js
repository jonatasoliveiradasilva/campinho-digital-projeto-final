import axios from "axios";

export async function getSpotifyToken() {

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const response = await axios.post(

        "https://accounts.spotify.com/api/token",

        new URLSearchParams({ grant_type: "client_credentials" }),

        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
        }
    );

    return response.data.access_token;
}

export async function fetchAlbumData(albumId) {

    const token = await getSpotifyToken();

    const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {

        headers: {
            Authorization: `Bearer ${token}`
        },

    });

    const albumData = albumResponse.data;

    return albumData;
}
