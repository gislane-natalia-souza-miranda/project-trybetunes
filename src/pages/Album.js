import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

const STATE_INITIAL = {
  musicList: [],
  artist: '',
  albumName: '',
};

class Album extends React.Component {
  state = {
    ...STATE_INITIAL,
  }

  componentDidMount = () => {
    this.fetchMusicApi();
  }

  fetchMusicApi = () => {
    this.setState(
      (prevState) => ({ ...prevState }),
      async () => {
        const { match: { params: { id } } } = this.props;
        const data = await getMusics(id);
        console.log('data antes do slice', data);
        // const albumInfo = data.shift(); // O método shift()remove o primeiro elemento de um array e retorna esse elemento
        // console.log('data depois do shift', albumInfo); não deu certo com shift.
        const musicInfo = data.slice(1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        console.log('data depois do slice', musicInfo);
        this.setState({
          musicList: musicInfo,
          artist: data[0].artistName,
          albumName: data[0].collectionName,
        });
      },
    );
  }

  render() {
    const { musicList, artist, albumName } = this.state;

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
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />
          ),
        ) }
      </div>);
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
