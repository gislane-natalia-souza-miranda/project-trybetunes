import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Projeto TrybeTunes</h1>

        {/* Roteando as rotas */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />

            <Route
              path="/search"
              render={ (props) => (
                <>
                  <Header { ...props } />
                  <Search { ...props } />
                </>) }
            />

            <Route
              path="/album/:id"
              render={ (props) => (
                <>
                  <Header { ...props } />
                  <Album { ...props } />
                </>) }
            />

            <Route
              path="/favorites"
              render={ (props) => (
                <>
                  <Header { ...props } />
                  <Favorites { ...props } />
                </>) }
            />

            <Route
              path="/profile/edit"
              render={ (props) => (
                <>
                  <Header { ...props } />
                  <ProfileEdit { ...props } />
                </>) }
            />

            <Route
              path="/profile"
              render={ (props) => (
                <>
                  <Header { ...props } />
                  <Profile { ...props } />
                </>) }
            />

            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
