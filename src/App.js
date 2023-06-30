import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Provider from './context/Provider/Provider';
import Foods from './pages/Foods/Foods';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Profile from './pages/Profile/Profile';
import Drinks from './pages/Drinks/Drinks';
import DrinksDetails from './pages/DrinksDetails/DrinksDetails';
import Explore from './pages/Explore/Explore';
import ExploreFoods from './pages/ExploreFoods/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks/ExploreDrinks';
import ExploreFoodsIngredients
from './pages/ExploreFoods/ExploreFoodsIngredients';
import ExploreDrinksIngredients
from './pages/ExploreDrinks/ExploreDrinksIngredients';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import ExploreFoodsNacionalites
from './pages/ExploreFoodsNacionalites/ExploreFoodsNacionalites';
import FoodsInProgress from './pages/FoodsInProgress/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress/DrinksInProgress';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id" component={ FoodDetails } />
          <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinksDetails } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNacionalites }
          />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
