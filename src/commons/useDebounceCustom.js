import { useState, useEffect } from 'react';

function useDebounceCustom(value, delay = 500) {
  const [text, setText] = useState('');

  useEffect(() => {
    const timeOute = setTimeout(() => {
      setText(value);
    }, delay);
    return () => {
      clearTimeout(timeOute);
    };
  }, [setText, value, delay]);
  return text;
}

export default useDebounceCustom;
