import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

const STATE_INITIAL = {
  loading: false,
  musicList: [],
  artist: '',
  albumName: '',
  favoriteSongs: [],
};

class Album extends React.Component {
  state = {
    ...STATE_INITIAL,
  }

  componentDidMount = () => {
    this.fetchMusicApi();
    this.fetchFavoriteSongs();
  }

  fetchMusicApi = () => {
    this.setState(
      (prevState) => ({ ...prevState }),
      async () => {
        const { match: { params: { id } } } = this.props;
        const data = await getMusics(id);
        // console.log('data antes do slice', data);
        // const albumInfo = data.shift(); // O método shift()remove o primeiro elemento de um array e retorna esse elemento
        // console.log('data depois do shift', albumInfo); não deu certo com shift.
        const musicInfo = data.slice(1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice  -  não altera o array inicial
        // console.log('data depois do slice', musicInfo);
        this.setState({
          musicList: musicInfo,
          artist: data[0].artistName,
          albumName: data[0].collectionName,
        });
      },
    );
  }

  // Atualiza loading apos executar addSong
  addFavoriteSong = (song) => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      async () => {
        await addSong(song);
        this.setState((prevState) => ({ ...prevState, loading: false }));
      },
    );
  }

  // busca lista de musicas favoritas do localStorage
  fetchFavoriteSongs = () => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      async () => {
        const favoriteSongs = await getFavoriteSongs() || [];
        console.log('favoiteSongs', favoriteSongs);
        this.setState((prevState) => ({ ...prevState, favoriteSongs, loading: false }));
      },
    );
  }

  // Verifica se a musica esta favoritada
  isFavoritedSong = (song) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(
      (favoriteSong) => favoriteSong.trackName === song.trackName,
    );
  }

  render() {
    const { musicList, artist, albumName, loading } = this.state;

    if (!loading) {
      return (
        <div data-testid="page-album">
          <h2>
            Lista de músicas do album
            {` ${albumName}`}
          </h2>

          <p data-testid="artist-name">
            {`Artista: ${artist}`}
          </p>

          <p data-testid="album-name">
            {`Album: ${albumName}`}
          </p>

          { musicList.map(
            (music) => (
              <MusicCard
                key={ music.trackName }
                music={ music }
                isFavoritedSong={ this.isFavoritedSong(music) }
                addFavoriteSong={ this.addFavoriteSong }
              />
            ),
          ) }
        </div>);
    }
    return <Loading />;
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
