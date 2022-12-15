import { Header } from './components/Header/Header.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { SearchProvider } from './components/Context/SearchProvider/SearchProvider.js';
import { LocationProvider } from './components/Context/LocationProvider/LocationProvider.js';
import { Contacts } from './components/Contacts/Contacts.js';
import { Location } from './components/Location/Location.js';
import { Companies } from './components/Companies/Companies.js';
import { Login } from './components/Login/Login.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import './App.css';
import { Users } from './components/Users/Users.js';
import { useState } from 'react';


function App() {

  const [auth, setAuth] = useState(false)
  const [logUser, setLogUser] = useState()

  return (
    <div className="App">
      <BrowserRouter>
        <SearchProvider>
        <LocationProvider>
          <Header logUser={logUser} setAuth={setAuth} setLogUser={setLogUser}/>
          <Switch>
            <Route exact path="/">
              <Login setAuth={setAuth} setLogUser={setLogUser}/>
            </Route>
            <Route exact path="/login">
              <Login setAuth={setAuth} setLogUser={setLogUser}/>
            </Route>
            <ProtectedRoute exact path="/contacts" auth={auth} component={Contacts} />
            <ProtectedRoute exact path="/companies" auth={auth} component={Companies} />
            <ProtectedRoute exact path="/users" auth={auth} component={Users} logUser={logUser} setAuth={setAuth} setLogUser={setLogUser}/>
            <ProtectedRoute exact path="/location" auth={auth} component={Location} />
          </Switch>
        </LocationProvider>
        </SearchProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
