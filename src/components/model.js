import { createStore, createEffect, createEvent, merge, forward, sample } from 'effector';
import { createGate } from 'effector-react';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

export const MountGate = createGate();
export const searched = createEvent();
export const searchValueChanged = createEvent();

export const fxGetMovies = createEffect({
    handler: async () => {
        const response = await fetch(MOVIE_API_URL);
        const json = await response.json();
        return json.Search;
    }
});

export const fxSearchMovies = createEffect({
    handler: async value => {
        const response = await fetch(`https://www.omdbapi.com/?s=${value}&apikey=4a3b711b`);
        const json = await response.json();
        if (json.Response === "True") {
            return json.Search;
        }
        throw new Error(json.Error);
    }
});

export const $isLoading = createStore(false)
    .on(merge([fxGetMovies, fxSearchMovies]), () => true)
    .on(merge([fxGetMovies.finally, fxSearchMovies.finally]), () => false);

export const $movies = createStore([])
    .on(merge([fxGetMovies, fxSearchMovies]), () => [])
    .on(merge([fxGetMovies.done, fxSearchMovies.done]), (_, { result }) => result);

export const $errorMessage = createStore(null)
    .on(fxSearchMovies.fail, (_, { error }) => error.message)
    .reset(fxSearchMovies);

export const $searchValue = createStore(null)
    .on(searchValueChanged, (_, e) => e.target.value)
    .reset(fxSearchMovies);

forward({
    from: MountGate.open,
    to: fxGetMovies,
});

searched.watch(e => e.preventDefault());

sample({
    source: $searchValue,
    clock: searched,
    target: fxSearchMovies,
});
