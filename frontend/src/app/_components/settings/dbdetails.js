import React from 'react';
import styles from './dbdetails.module.css';

export const DbDetails = () => {
  const dbDetails = {
    dbtype: 'MySQL',
    host: 'localhost',
    port: '3306',
    user: 'root',
    status: 'active', // Change this value to 'active' or 'inactive'
  };

  const handleDisconnect = () => {
    if (dbDetails.status === 'active') {
      console.log('Disconnected from the database');
    }
  };

  return (
    <div className={styles.dbDetails}>
      <h2 className={styles.heading}>Database Connection Details</h2>

      {dbDetails ? (
        <div className={styles.details}>
          <p>
            <strong>Database Type:</strong> {dbDetails.dbtype}
          </p>
          <p>
            <strong>Host:</strong> {dbDetails.host}
          </p>
          <p>
            <strong>Port:</strong> {dbDetails.port}
          </p>
          <p>
            <strong>Username:</strong> {dbDetails.user}
          </p>
          <div className={`${styles.status} ${dbDetails.status === 'active' ? styles.active : styles.inactive}`}>
            <span className={styles.statusDot}></span>
            <strong>{dbDetails.status === 'active' ? 'Connection Active' : 'Connection Inactive'}</strong>
          </div>

          <button
            onClick={handleDisconnect}
            className={styles.disconnectButton}
            disabled={dbDetails.status !== 'active'}
          >
            {dbDetails.status === 'active' ? 'Disconnect' : 'Connect to a DB first'}
          </button>
        </div>
      ) : (
        <p className={styles.noDetails}>No database details available yet.</p>
      )}
    </div>
  );
};
