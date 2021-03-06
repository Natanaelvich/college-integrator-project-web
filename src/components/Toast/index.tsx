import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/modules/ToastContext';

interface ToastProps {
  message: ToastMessage;
  removeToast(messageId: string): void;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};
const Toast: React.FC<ToastProps> = ({ message, removeToast, style }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      style={style}
      key={message.id}
      hasdescription={Number(!!message.description)}
      type={message.type}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        data-testid="button-close-toast"
        type="button"
        onClick={() => removeToast(message.id)}
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
