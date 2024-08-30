import React, { useEffect, useContext } from 'react';
import { stack } from '../../context/context';
import styles from './dbdetails.module.css';

export const DbDetails = () => {
  const { dbDetails, setDbDetails, setDblist } = useContext(stack);

  // Fetch existing db details from localStorage on page load
  useEffect(() => {
    const details = window.localStorage.getItem('dbDetails');
    if (details) {
      setDbDetails(JSON.parse(details));
      checkconnection(JSON.parse(details));
    }
  }, []);

  // Check the connection with the stored database details
  const checkconnection = async (details) => {
    try {
      const response = await fetch('http://localhost:8000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dbtype: details.dbtype,
          host: details.host,
          port: details.port,
          user: details.user,
          password: details.password,
        }),
      });

      const list = await response.json();
      setDblist(list); // Update the list of databases for dropdown in header
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    if (dbDetails.status === 'active') {
      try {
        const response = await fetch('http://localhost:8000/api/disconnect', {
          method: 'GET',
        });

        // Reset connection details and remove them from localStorage
        setDbDetails({
          dbtype: '',
          host: '',
          port: '',
          user: '',
          status: 'inactive',
        });
        window.localStorage.removeItem('dbDetails');
      } catch (err) {
        console.error(err);
      }
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
