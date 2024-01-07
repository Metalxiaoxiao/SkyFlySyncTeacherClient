import React, {createContext, useContext, useState} from 'react';
import {Snackbar} from 'react-native-paper';

// Create a context for the Snackbar
const GlobalSnackbarContext = createContext();

// Create a provider for the Snackbar context
export const GlobalSnackbarProvider = ({children}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [actionLabel, setActionLabel] = useState('');
  const [onActionPress, setOnActionPress] = useState(() => () => {});

  const showSnackbar = snackbarConfig => {
    const {
      message: newMessage,
      actionLabel: newActionLabel,
      onActionPress: newOnActionPress,
    } = snackbarConfig;

    setMessage(newMessage);
    setActionLabel(newActionLabel || '');
    setOnActionPress(() => newOnActionPress || (() => {}));

    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <GlobalSnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        action={{
          label: actionLabel,
          onPress: onActionPress,
        }}>
        {message}
      </Snackbar>
    </GlobalSnackbarContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useGlobalSnackbar = () => {
  return useContext(GlobalSnackbarContext);
};
