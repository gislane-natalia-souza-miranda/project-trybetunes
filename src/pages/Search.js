import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

const STATE_INITIAL = {
  loading: false,
  artistName: '',
};

class Search extends React.Component {
  state = {
    ...STATE_INITIAL,
    artistNameSearched: '',
    albums: [],
  }

  // Pega o que foi digitado no input e atualiza o estado.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  // verifica se button está habilitado com a restrição de ter 2 ou mais caracteres.
  isSearchButtonDisable = () => {
    const { artistName } = this.state;
    const MINIMO_CARACTERES = 2;
    return artistName.trim().length < MINIMO_CARACTERES; // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  }

  onSearchButtonClick = () => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      async () => {
        const { artistName } = this.state;
        const albums = await searchAlbumsAPIs(artistName);
        this.setState({ ...STATE_INITIAL, artistNameSearched: artistName, albums });
      },
    );
  }

  // Mostra os albuns do artista ou da banda pesquisada
  showAlbums = () => {
    const { artistNameSearched, albums } = this.state;

    if (albums.length) {
      return (
        <>
          <h2>
            Resultado de álbuns de:
            {` ${artistNameSearched}`}
          </h2>

          {albums.map((album) => (
            <Link
              key={ album.collectionId }
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <p>{album.artworkUrl100}</p>
              <p>{album.collectionName}</p>
              <p>{album.artistName}</p>
            </Link>))}
        </>
      );
    }
    return (<p> Nenhum álbum foi encontrado </p>);
  }

  render() {
    const { artistName, loading } = this.state;

    if (!loading) {
      return (
        <>
          <div data-testid="page-search">
            <h1> Tela de pesquisa </h1>

            <form onSubmit={ (event) => event.preventDefault() }>
              {/* Parar submit do form: https://stackoverflow.com/a/39841238 */}

              Nome da banda ou do artista:
              <input
                type="text"
                value={ artistName }
                onChange={ this.onInputChange }
                name="artistName"
                data-testid="search-artist-input"
              />

              <button
                type="submit"
                disabled={ this.isSearchButtonDisable() }
                onClick={ this.onSearchButtonClick }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>
          </div>
          { this.showAlbums()}
        </>
      );
    }
    return <Loading />;
  }
}

export default Search;
