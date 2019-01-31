import React, { Component } from 'react';
import electron from 'electron';

import { Redirect } from 'react-router-dom';
import styles from './Home.css';
import Button from '../button/button';
import { FileContext } from '../../containers/file-provider/fileProvider';

const { dialog } = electron.remote;

export default class Home extends Component {
  static contextType = FileContext;

  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  state = { hasFile: false };

  onButtonClick(e) {
    const { setFilePath } = this.context;

    e.preventDefault();

    dialog.showOpenDialog(
      {
        title: 'Select package.json file',
        buttonLabel: 'Select',
        properties: ['openFile'],
        filters: [{ name: 'Package files', extensions: ['json'] }]
      },
      async fileArray => {
        const [filePath] = fileArray;
        const packageIndex = filePath.indexOf('package.json');
        const packageFolder = filePath.slice(0, packageIndex);

        await setFilePath({ packagePath: filePath, packageFolder });
        this.setState({ hasFile: true });
      }
    );
  }

  render() {
    const { hasFile } = this.state;

    return hasFile ? (
      <Redirect to="/package" />
    ) : (
      <div className={styles.container} data-tid="container">
        <Button onClick={this.onButtonClick}>Select Package file</Button>
      </div>
    );
  }
}
