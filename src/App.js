import React, { useState } from "react";
import ReactFetchAutocomplete from "react-fetch-autocomplete";

// import styles from "./styles.css";

// A custom suggestion parser which should always
// return an array of objects
// containing at least a description
const suggestionParser = villes => {
  return villes.map(ville => ({
    description: ville.nom,
    code: ville.code
  }));
};

class App extends React.Component {
  // const [value, setValue] = useState("");
  // const [selection, setSelection] = useState(null);

  state = {
    value: "",
    selection: null
  };

  // fetchUrl is in this case a method that returns
  // a URL but can also be a plain string
  fetchUrl = ({ searchQuery }) =>
    `http://51.75.205.15/backoffice/api/zones/search?q=${searchQuery}`;

  render() {
    return (
      <ReactFetchAutocomplete
        value={this.state.value}
        onChange={value => this.setState({ value })}
        onSelect={selection => this.setState({ selection })}
        fetchUrl={this.fetchUrl}
        suggestionParser={suggestionParser}
      >
        {({ inputProps, getSuggestionProps, suggestions, error, loading }) => {
          return (
            <div>
              <input
                {...inputProps({ placeholder: "Search for something.." })}
              />
              {loading && <div>Loading..</div>}
              {error && <div>We have an error..</div>}
              {suggestions.length > 0 && (
                <div>
                  {suggestions.map(suggestion => (
                    <div {...getSuggestionProps(suggestion)}>
                      <div>{suggestion.description}</div>
                      <div>{suggestion.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </ReactFetchAutocomplete>
    );
  }
}

export default App;
