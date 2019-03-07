import React, { Component } from "react";
import Files from "react-files";
import FileSaver from "file-saver";
import styled from "styled-components";
import GlobalStyle from "./globalStyle";

const Title = styled.h1`
  font-size: 60px;
  text-align: center;
  text-transform: uppercase;
  color: #1e272e;

  img {
    vertical-align: middle;
    height: 80px;
    width: 80px;
  }
`;

const Dropzone = styled(Files)`
  display: flex;
  vertical-align: middle;
  text-align: center;
  padding: 10px;
  margin-bottom: 30px;
  border: 2px dashed #1e272e;
  cursor: pointer;
`;

const FileList = styled.div`
  display: flex;
  width: 100%;
  ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }
  li:last-child {
    border: none;
  }
`;

const Item = styled.li`
  height: 50px;
  padding: 10px 0px 10px 10px;
`;

const ItemPreview = styled.div`
  height: 50px;
  width: 50px;
  float: left;
`;

const ItemExtension = styled.div`
  text-align: center;
  line-height: 60px;
  color: #fff;
  background-color: #1e272e;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
`;

const ItemContent = styled.div`
  float: left;
  padding-top: 5px;
  padding-left: 10px;
  width: calc(100% - 130px);

  div {
    padding-left: 20px;
    font-size: 15px;
    line-height: 20px;
  }
`;

const ItemRemove = styled.div`
  height: 60px;
  width: 60px;
  float: right;
  cursor: pointer;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4IDEyLjgzbC0yLjgzLTIuODMtMTEuMTcgMTEuMTctMTEuMTctMTEuMTctMi44MyAyLjgzIDExLjE3IDExLjE3LTExLjE3IDExLjE3IDIuODMgMi44MyAxMS4xNy0xMS4xNyAxMS4xNyAxMS4xNyAyLjgzLTIuODMtMTEuMTctMTEuMTd6Ii8+PHBhdGggZD0iTTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+PC9zdmc+)
    no-repeat center center;
  background-size: 30px 30px;
`;

const Button = styled.a`
  border-radius: 3px;
  padding: 10px;
  margin-left: 10px;
  width: 11rem;
  background: transparent;
  color: black;
  border: 2px solid black;
  cursor: pointer;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onFilesChange = files => {
    this.setState(
      {
        files
      },
      () => {
        console.log(this.state.files);
      }
    );
  };

  onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  filesRemoveOne = file => {
    this.refs.files.removeFile(file);
  };

  filesRemoveAll = () => {
    this.refs.files.removeFiles();
  };

  filesCombine = () => {
    const files = this.state.files;

    if (files.length !== 0) {
      var blob = new Blob(files, {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "Combined.txt");
    }
  };

  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <Title>
          {/* <img src="docgluelogo.png" /> */}
          Glue Dog
        </Title>
        <Dropzone
          ref="files"
          className="files-dropzone-list"
          style={{ height: "100px" }}
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          multiple
          maxFiles={10}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Dropzone>
        <Button onClick={this.filesRemoveAll}>Remove All Files</Button>
        <Button onClick={this.filesCombine}>Combine</Button>
        {this.state.files.length > 0 ? (
          <FileList>
            <ul>
              {this.state.files.map(file => (
                <Item key={file.id}>
                  <ItemPreview>
                    {file.preview.type === "image" ? (
                      <img src={file.preview.url} />
                    ) : (
                      <ItemExtension>{file.extension}</ItemExtension>
                    )}
                  </ItemPreview>
                  <ItemContent>
                    <div>{file.name}</div>
                    <div>{file.sizeReadable}</div>
                  </ItemContent>
                  <ItemRemove
                    id={file.id}
                    onClick={this.filesRemoveOne.bind(this, file)}
                  />
                </Item>
              ))}
            </ul>
          </FileList>
        ) : null}
      </div>
    );
  }
}

export default App;
