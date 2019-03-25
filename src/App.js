import React, { Component } from "react";
import GlobalStyle from "./globalStyle";
import FileListView from "./FileListView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <FileListView />
      </div>
    );
  }
}

export default App;
