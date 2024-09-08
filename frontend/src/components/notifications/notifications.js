import { FaCheck } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa';

import classes from './notifications.module.css';

// Common styles and settings
const commonSettings = {
  loading: false,
  autoClose: 4000,
  classNames: classes,
  withCloseButton: true,
  position: 'bottom-right',
};

const errorStyle = {
  color: 'red',
  icon: <FaExclamation />,
  style: { backgroundColor: '#ef233c' },
};

const successStyle = {
  color: 'green',
  icon: <FaCheck />,
  style: { backgroundColor: '#588157' },
};

export const NOTIFICATIONS = {
  error_checkconnection: {
    id: 'error-check-connection',
    title: 'Connection Error!',
    message: 'Please connect to the database first.',
    ...commonSettings,
    ...errorStyle,
  },
  error_nullquery: {
    id: 'error-null-query',
    title: 'Error!',
    message: 'Please enter a query first.',
    ...commonSettings,
    ...errorStyle,
  },
  error_credentials: {
    id: 'invalid-credentials',
    title: 'Invalid Credentials!',
    message: 'Please check your credentials and try again.',
    ...commonSettings,
    ...errorStyle,
  },
  success_credentials: {
    id: 'success-credentials',
    title: 'Success!',
    message: 'You have successfully logged in.',
    ...commonSettings,
    ...successStyle,
  },
  error_disconnectdb: {
    id: 'error-disconnect-db',
    title: 'Error!',
    message: 'Error while disconnecting from the database.',
    ...commonSettings,
    ...errorStyle,
  },
  success_disconnectdb: {
    id: 'success-disconnect-db',
    title: 'Success!',
    message: 'Successfully disconnected from the database.',
    ...commonSettings,
    ...successStyle,
  },
  success_fetchmessages: {
    id: 'success-fetch-messages',
    title: 'Success!',
    message: 'Please wait while we fetch the messages.',
    ...commonSettings,
    ...successStyle,
  },
  success_fetchsettings: {
    id: 'success-fetch-settings',
    title: 'Success!',
    message: 'Successfully fetched the settings.',
    ...commonSettings,
    ...successStyle,
  },
  success_switchdb: {
    id: 'success-switch-db',
    title: 'Success!',
    message: 'Successfully switched the database.',
    ...commonSettings,
    ...successStyle,
  },
  error_switchdb: {
    id: 'error-switch-db',
    title: 'Error!',
    message: 'Error while switching the database.',
    ...commonSettings,
    ...errorStyle,
  },
};
