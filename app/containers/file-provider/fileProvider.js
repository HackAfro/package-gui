import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const FileContext = createContext('');

class FileProvider extends React.Component {
  constructor() {
    super();
    this.setFilePath = this.setFilePath.bind(this);
  }

  state = {
    packagePath: ''
  };

  setFilePath(path) {
    return new Promise((resolve, reject) => {
      try {
        this.setState({ packagePath: path }, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  render() {
    const { packagePath } = this.state;
    const { children } = this.props;

    return (
      <FileContext.Provider
        value={{ packagePath, setFilePath: this.setFilePath }}
      >
        {children}
      </FileContext.Provider>
    );
  }
}

FileProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default FileProvider;
