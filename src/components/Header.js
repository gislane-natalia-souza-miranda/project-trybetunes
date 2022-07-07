import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: false,
    name: '',
  };

  // exibir informação na tela
  componentDidMount = () => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      async () => {
        const { name } = await getUser();
        this.setState({ loading: false, name });
      },
    );
  }

  render() {
    const { name, loading } = this.state;

    if (!loading) {
      return (
        <div>
          <header data-testid="header-component">
            Cabeçalho
          </header>

          <h2 data-testid="header-user-name">
            { name }
          </h2>

          <nav>
            <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
            <br />
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Músicas Favoritas
            </Link>
            <br />
            <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
            <br />
          </nav>
        </div>
      );
    }
    return <Loading />;
  }
}

export default Header;
