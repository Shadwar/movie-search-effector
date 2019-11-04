import React from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import { $isLoading, $movies, $errorMessage, MountGate } from './model';
import { combine } from 'effector';
import { createComponent } from 'effector-react';

const App = createComponent(combine([$isLoading, $movies, $errorMessage]), (_, [isLoading, movies, errorMessage]) => (
  <div className="App">
    <MountGate />
    <Header text="HOOKED" />
    <Search />

    <p className="App-intro">Sharing a few of our favourite movies</p>

    <div className="movies">
      {isLoading && (<span>loading...</span>)}
      {errorMessage && (<div className="errorMessage">{errorMessage}</div>)}
      {movies.map((movie, index) => (<Movie key={`${index}-${movie.Title}`} movie={movie} />))}
    </div>
  </div>
));


export default React.memo(App);
