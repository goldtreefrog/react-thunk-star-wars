// This function will make an AJAX request to the Star Wars API
// It will randomly fail for 25% of requests, and has a 0.5s delay artifically
// inserted so you can check your loading state
import { search } from "./star-wars";

export const SEARCH_CHARACTERS_REQUEST = "SEARCH_CHARACTERS_REQUEST";
export const searchCharactersRequest = () => ({
  type: SEARCH_CHARACTERS_REQUEST
});

export const SEARCH_CHARACTERS_SUCCESS = "SEARCH_CHARACTERS_SUCCESS";
export const searchCharactersSuccess = characters => ({
  type: SEARCH_CHARACTERS_SUCCESS,
  characters
});

export const SEARCH_CHARACTERS_ERROR = "SEARCH_CHARACTERS_ERROR";
export const searchCharactersError = error => ({
  type: SEARCH_CHARACTERS_ERROR,
  error
});

//   // Make this async action using the search function
//   // It should dispatch the three sync actions above

// Official solution:
// export const searchCharacters = name => dispatch => {
//   dispatch(searchCharactersRequest());
//   search(name)
//     .then(characters => dispatch(searchCharactersSuccess(characters)))
//     .catch(error => dispatch(searchCharactersError(error)));
// };

export const searchCharacters = function(name) {
  return function(dispatch) {
    dispatch(searchCharactersRequest());
    search(name)
      .then(characters => dispatch(searchCharactersSuccess(characters)))
      .catch(error => dispatch(searchCharactersError(error)));
  };
};
// .then(characters => dispatch(searchCharactersSuccess(characters)))
// .catch(error => dispatch(searchCharactersError(error)));
// };
