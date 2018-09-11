import React, { Component } from 'react';
import electron from 'electron';

import { Redirect } from 'react-router-dom';
import styles from './Home.css';
import Button from '../button/button';
import { FileContext } from '../../containers/file-provider/fileProvider';

const { dialog } = electron.remote;

export default class Home extends Component {
  constructor() {
    super();

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  state = { hasFile: false };

  onButtonClick(e) {
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

        await this.setFilePath(filePath).this.setState({ hasFile: true });
      }
    );
  }

  render() {
    const { hasFile } = this.state;

    return hasFile ? (
      <Redirect to="/package" />
    ) : (
      <FileContext.Consumer>
        {({ setFilePath }) => {
          this.setFilePath = setFilePath;
          return (
            <div className={styles.container} data-tid="container">
              <Button onClick={this.onButtonClick}>Select Package file</Button>
            </div>
          );
        }}
      </FileContext.Consumer>
    );
  }
}
