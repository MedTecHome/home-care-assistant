import React, { createContext, useCallback, useContext, useState } from 'react';
import { ERROR_MESSAGE } from '../commons/globalText';
import { IsValidJSONString } from '../helpers/utils';

const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessage] = useState(null);

  const RegisterMessage = useCallback((type, message, origin) => {
    // eslint-disable-next-line no-console
    let messageDetail = '';
    let codeError = '';
    if (type === ERROR_MESSAGE) {
      if (IsValidJSONString(message.message)) {
        const { message: text, code } = JSON.parse(message.message);
        codeError = code;
        messageDetail = text;
      } else {
        codeError = 'error-interno';
        messageDetail = 'Ha ocurrido un error interno.';
      }
    } else {
      messageDetail = message;
    }
    setMessage({ type, codeError, message: messageDetail, origin });
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
