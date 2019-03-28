import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const FileContext = createContext({
  packagePaths: [],
  currentPackagePath: '',
  packageFolders: [],
  currentPackageFolde: '',
  setFilePath: () => {}
});

class FileProvider extends React.Component {
  constructor() {
    super();
    this.setFilePath = this.setFilePath.bind(this);
    this.updateCurrentPackagePath = this.updateCurrentPackagePath.bind(this);
  }

  state = {
    packagePaths: [],
    packageFolders: [],
    currentPackageFolder: '',
    currentPackagePath: ''
  };

  setFilePath({ packagePath, packageFolder }) {
    return new Promise((resolve, reject) => {
      try {
        this.setState(
          prevState => ({
            packagePaths: [packagePath, ...prevState.packagePaths],
            packageFolders: [packagePath, ...prevState.packagePaths],
            currentPackageFolder: packageFolder,
            currentPackagePath: packagePath
          }),
          resolve
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  updateCurrentPackagePath(packagePath, callback) {
    this.setState(
      {
        currentPackagePath: packagePath
      },
      callback
    );
  }

  render() {
    const {
      packagePaths,
      currentPackagePath,
      packageFolders,
      currentPackageFolder
    } = this.state;
    const { children } = this.props;

    return (
      <FileContext.Provider
        value={{
          packagePaths,
          currentPackagePath,
          packageFolders,
          currentPackageFolder,
          setFilePath: this.setFilePath,
          updateCurrentPackagePath: this.updateCurrentPackagePath
        }}
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
