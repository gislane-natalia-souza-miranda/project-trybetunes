import React from 'react';
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
        </div>
      );
    }
    return <Loading />;
  }
}

export default Header;
