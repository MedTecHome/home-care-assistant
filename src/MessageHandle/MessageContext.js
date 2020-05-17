import React, { createContext, useCallback, useContext, useState } from 'react';
import { ERROR_MESSAGE } from '../commons/globalText';

const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessage] = useState(null);

  const RegisterMessage = useCallback((type, message, origin) => {
    setMessage({ type, message: type === ERROR_MESSAGE ? message : message, origin });
  }, []);

  const clearMessages = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages,
        RegisterMessage,
        clearMessages
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const values = useContext(MessageContext);
  if (!values) throw new Error('Call useMessageContext only works inside MessageContextProvider');
  return {
    messages: values.messages,
    RegisterMessage: values.RegisterMessage,
    clearMessages: values.clearMessages
  };
};