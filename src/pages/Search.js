import React from 'react';

const STATE_INITIAL = {
  // loading: false,
  artistName: '',
};

class Search extends React.Component {
  state = {
    ...STATE_INITIAL,
  }

  // Pega o que foi digitado no input e atualiza o estado.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    this.setState({ [name]: value });
  }

  // verifica se button está habilitado com a restrição de ter 2 ou mais caracteres.
  isSearchButtonDisable = () => {
    const { artistName } = this.state;
    const MINIMO_CARACTERES = 2;
    return artistName.trim().length < MINIMO_CARACTERES;
  }

  render() {
    const { artistName } = this.state;

    return (
      <div data-testid="page-search">
        Search

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
            // onClick={ this.onSearchButtonClick }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>

        </form>
      </div>);
  }
}

export default Search;
