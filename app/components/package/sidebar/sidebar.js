import React from 'react';
import Package from 'react-feather/dist/icons/package';
import Email from 'react-feather/dist/icons/mail';
import User from 'react-feather/dist/icons/user';
import ExternalLink from 'react-feather/dist/icons/external-link';

import icon from './imgs/json-icon.svg';
import styles from './sidebar.css';

const PackageSidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.sidebarHeader}>
      <img src={icon} alt="Package icon" className={styles.sidebarImg} />
    </div>
    <div className={styles.details}>
      <div className="info">
        <Package size={22} />
        <h5 className={styles.infoText}>Package GUI</h5>
      </div>
      <div className="info">
        <Email size={22} />
        <h5 className={styles.infoText}>richyafro@gmail.com</h5>
      </div>
      <div className="info">
        <User size={22} />
        <h5 className={styles.infoText}>Richard Umoffia</h5>
      </div>
      <div className="info">
        <a className={styles.infoText} href="">
          <ExternalLink size={22} />
        </a>
      </div>
      <div className="info">
        <div>tags</div>
        {/* <h5 className="info__text"></h5> */}
      </div>
    </div>
  </div>
);

export default PackageSidebar;
