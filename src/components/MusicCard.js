import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    favoriteSong: false,
  }

  componentDidMount = () => {
    const { isFavoritedSong } = this.props;
    console.log('Eu aqui', isFavoritedSong);
    this.setState({ favoriteSong: isFavoritedSong });
  }

  // Pega o que foi digitado no input e atualiza o estado.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  componentDidUpdate = () => {
    const { music, addFavoriteSong } = this.props;
    const { favoriteSong } = this.state;
    if (favoriteSong) {
      addFavoriteSong(music);
    }
  }

  render() {
    const { favoriteSong } = this.state;
    const { music: { trackName, previewUrl, trackId } } = this.props;

    return (
      <div>
        <p>
          Nome da música:
          <span>{trackName}</span>
        </p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            checked={ favoriteSong }
            onChange={ this.onInputChange }
            name="favoriteSong"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf.isRequired,
  addFavoriteSong: PropTypes.func.isRequired,
  isFavoritedSong: PropTypes.bool.isRequired,
};

export default MusicCard;
