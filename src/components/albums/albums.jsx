import React, { useEffect, useState } from "react";

import { fetchAlbumData } from "../../../src/services/spotify";

function Albums() {

    const [albums, setAlbums] = useState([]);

    const albumIds = [
        "3wSWMuHQOJ2gU22t5sCouR",
        "60UzB8mOCMpc7xkuJE6Bwc",
        "2lIZef4lzdvZkiiCzvPKj7",
        "1HRONdLhKvok05NgMKtKpj",
        "6BzxX6zkDsYKFJ04ziU5xQ",
        "5EYKrEDnKhhcNxGedaRQeK",
        "0hvT3yIEysuuvkK73vgdcW",
        "6lCHEpHcYgC24XO87InJjZ",
        "1q37MEHkdOivTuJJbwRkGS",
        "5QsVRNOKVMCeVAIUoOQJ13",
    ];

    useEffect(() => {

        async function fetchAlbums() {

            const albumDataArray = await Promise.all(albumIds.map(fetchAlbumData));

            setAlbums(albumDataArray);
        }

        fetchAlbums();

    }, []);

    return (
        <main className="albums-container">
            {
                albums.length > 0 ? (

                    albums.map((album) => (

                        <div className="album" key={album.id}>

                            <img
                                className="album-imagem"
                                src={album.images[0]?.url}
                                alt={`${album.name}`}
                            />

                            <h4 className="album-nome">{album.name}</h4>

                            <p
                                className="album-artista">
                                {
                                    album.artists.map((artist) => artist.name)
                                }
                            </p>

                        </div>
                    ))

                ) : (
                    <p>Carregando...</p>
                )
            }
        </main>
    );
}

export default Albums;
