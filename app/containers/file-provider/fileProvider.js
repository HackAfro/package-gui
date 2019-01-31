import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const FileContext = createContext({});

class FileProvider extends React.Component {
  constructor() {
    super();
    this.setFilePath = this.setFilePath.bind(this);
  }

  state = {
    packagePath: '',
    packageFolder: ''
  };

  setFilePath({ packagePath, packageFolder }) {
    return new Promise((resolve, reject) => {
      try {
        this.setState({ packagePath, packageFolder }, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  render() {
    const { packagePath, packageFolder } = this.state;
    const { children } = this.props;

    return (
      <FileContext.Provider
        value={{ packagePath, packageFolder, setFilePath: this.setFilePath }}
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
