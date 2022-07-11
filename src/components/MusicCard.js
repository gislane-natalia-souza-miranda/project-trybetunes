import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  // Pega o que foi digitado no input e atualiza o estado.
  onInputChange = ({ target }) => {
    const { music, addFavoriteSong, removeFavoriteSong } = this.props;
    // const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // this.setState({ [name]: value });
    if (value) {
      addFavoriteSong(music);
    } else removeFavoriteSong(music);
  }

  render() {
    const { music: { trackName, previewUrl, trackId }, isFavoritedSong } = this.props;

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
            checked={ isFavoritedSong }
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
  removeFavoriteSong: PropTypes.func.isRequired,
};

export default MusicCard;
