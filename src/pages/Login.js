// Rota /
import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const STATE_INITIAL = {
  loading: false,
  name: '',
};

class Login extends React.Component {
  state = {
    ...STATE_INITIAL,
  };

  // Pega o que foi digitado no input e atualiza o estado.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  // verifica se button está habilitado com a restrição de ter mais de 3 caracteres.
  isLoginButtonDisabled = () => {
    const { name } = this.state;
    const MINIMO_CARACTERES = 3;
    return name.trim().length < MINIMO_CARACTERES; // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  }

  onLoginButtonClick = () => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      async () => {
        const { history } = this.props;
        const { name } = this.state;
        await createUser({ name });
        history.push('/search');
      },
    );
  }

  render() {
    const { name, loading } = this.state;

    if (!loading) {
      return (
        <div data-testid="page-login">
          <h1> Faça seu login </h1>
          <form onSubmit={ (event) => event.preventDefault() }>
            {/* Parar submit do form: https://stackoverflow.com/a/39841238 */}

            Nome:
            <input
              type="text"
              value={ name }
              onChange={ this.onInputChange }
              name="name"
              data-testid="login-name-input"
            />

            <button
              type="submit"
              disabled={ this.isLoginButtonDisabled() }
              onClick={ this.onLoginButtonClick }
              data-testid="login-submit-button"
            >
              Entrar
            </button>

          </form>
        </div>);
    }
    return <Loading />;
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
