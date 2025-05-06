import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

interface PromptProps {
  when: boolean;
  message: string;
}

/**
 * Prompt component for blocking navigation or reload if a condition is met.
 * @param when // when is a boolean value that determines whether the prompt should be displayed or not.
 * @param message // message is the message that will be displayed in the prompt.
 * @returns null (side-effect based component)
 */
function Prompt({ when, message }: PromptProps) {
  // Use unstable useBlocker from react-router-dom to block navigation
  useBlocker(() => {
    if (when) {
      return !window.confirm(message); // Show confirmation dialog for navigation
    }
    return false;
  });

  // Block page reload or close
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!when) return;
  
      // Required for modern browsers to trigger confirmation
      event.preventDefault();
  
      // Required for older browsers (e.g., Chrome) — still works despite being deprecated
      // eslint-disable-next-line deprecation/deprecation
      event.returnValue = message;
      
      return message; // Optional — some environments respect return value
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]);
  

  return null;
}

export default Prompt;
