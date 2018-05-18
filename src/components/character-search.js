import React from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
// import { searchCharacters } from "../actions";
import { searchCharactersRequest, searchCharactersSuccess, searchCharactersError } from "../actions";
// import createStore from "../store";
import { search } from "../star-wars";

export class CharacterSearch extends React.Component {
  renderResults() {
    // console.log("this.props: ", this.props);
    // console.log("createStore.getState() ", createStore.getState());

    if (this.props.loading) {
      return <Spinner spinnerName="circle" noFadeIn />;
    }

    if (this.props.error) {
      return <strong>{this.props.error}</strong>;
    }

    const characters = this.props.characters.map((character, index) => <li key={index}>{character}</li>);

    return <ul className="character-search-results">{characters}</ul>;
  }

  search(e) {
    e.preventDefault();
    // Official solution uses the line below and puts the dispatch etc. inside the actions.js file instead of here. Compare.
    // this.props.dispatch(searchCharacters(this.input.value));
    // Then consider putting it in the reducers.js file instead (not that I like that any better). See https://redux.js.org/faq/code-structure#structure-business-logic. Then ponder another solution, such as redux-logic and other approaches in https://medium.com/@jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1
    const name = this.input.value;
    this.props.dispatch(searchCharactersRequest(name));
    search(name)
      .then(characters => this.props.dispatch(searchCharactersSuccess(characters)))
      .catch(error => this.props.dispatch(searchCharactersError(error)));
  }

  render() {
    return (
      <div className="character-search">
        {/* When this form is submitted you should submit the
                    searchCharacters action */}
        <form onSubmit={e => this.search(e)}>
          <input type="search" ref={input => (this.input = input)} />
          <button>Search</button>
        </form>
        <ul className="character-search-results">{this.renderResults()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  characters: state.characters,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(CharacterSearch);
