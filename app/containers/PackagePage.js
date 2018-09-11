import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { FileContext } from './file-provider/fileProvider';
import Package from '../components/package/package';

export default class PackagePage extends Component {
  render() {
    return (
      <FileContext.Consumer>
        {({ packagePath }) =>
          packagePath ? (
            <Package packagePath={packagePath} />
          ) : (
            <Redirect to="/" />
          )
        }
      </FileContext.Consumer>
    );
  }
}
