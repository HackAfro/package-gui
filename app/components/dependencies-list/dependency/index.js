import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPackageInfo, installPackage } from '../../../utils';

import styles from './index.css';
import { FileContext } from '../../../containers/file-provider/fileProvider';

class Dependency extends Component {
  static contextType = FileContext;

  state = {
    versions: [],
    packageUrl: ''
  };

  componentDidMount() {
    this.getPackageDetails();
  }

  onVersionChange = e => {
    e.preventDefault();

    const { value } = e.target;

    this.installPackageVersion(value);
  };

  async getPackageDetails() {
    const { dependency } = this.props;
    const versionsPromise = getPackageInfo({
      pkg: dependency.packageName,
      variant: 'versions'
    });
    const urlPromise = getPackageInfo({
      pkg: dependency.packageName,
      variant: 'url'
    });

    const [versionsString, url] = await Promise.all([
      versionsPromise,
      urlPromise
    ]);
    const versions = versionsString
      .slice(1, versionsString.length - 2)
      .split(',')
      .map(string => string.trim().replace(/\n/, ''));
    const last5Versions = versions.slice(versions.length - 5);
    this.setState({
      versions: last5Versions,
      packageUrl: url
    });
  }

  async installPackageVersion(version) {
    const { packageFolder } = this.context;
    const { dependency } = this.props;
    const { packageName } = dependency;

    const response = await installPackage({
      pkg: packageName,
      packageFolder,
      version
    });

    console.log(response);
  }

  render() {
    const { versions, packageUrl } = this.state;
    const { dependency } = this.props;

    return (
      <div className={styles.item}>
        <a href={packageUrl} target="__blank" className={styles.packageName}>
          {dependency.packageName}
        </a>
        <div>
          <select
            name="version"
            className="package-versions"
            defaultValue={dependency.packageVersion}
            onChange={this.onVersionChange}
          >
            {versions.map(version => (
              <option value={version} key={version}>
                {version}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

Dependency.propTypes = {
  dependency: PropTypes.shape({
    packageName: PropTypes.string,
    packageVersion: PropTypes.string
  }).isRequired
};

export default Dependency;
