import React from 'react';
import PropTypes from 'prop-types';
import Dependency from './dependency';

import styles from './index.css';

const Dependencies = ({ packageInfo }) => {
  const { dependencies } = packageInfo;

  return Object.keys(dependencies).map(dependency => {
    const pkg = {
      packageName: dependency,
      packageVersion: dependencies[dependency]
    };

    return <Dependency dependency={pkg} key={dependency} />;
  });
};

const DevDependencies = ({ packageInfo }) => {
  const { devDependencies } = packageInfo;

  return Object.keys(devDependencies).map(dependency => {
    const pkg = {
      packageName: dependency,
      packageVersion: devDependencies[dependency]
    };

    return <Dependency dependency={pkg} key={dependency} />;
  });
};

const DependenciesList = ({ packageInfo }) => (
  <div className={styles.container}>
    <section className="dependencies list">
      <h4 className={styles.header}>Dependencies</h4>
      <Dependencies packageInfo={packageInfo} />
    </section>

    <section className="devDependencies list">
      <h4 className={styles.header}>Dev Dependencies</h4>
      <DevDependencies packageInfo={packageInfo} />
    </section>
  </div>
);

DependenciesList.propTypes = {
  packageInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default DependenciesList;
