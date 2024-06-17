import React from 'react';

const ToastNotification = ({ showToast, setShowToast }) => {
  return (
    <div
      className={`toast position-fixed top-0 end-0 m-3 ${showToast ? 'show' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 9999 }}
    >
      <div className="toast-header">
        <strong className="me-auto">Notification</strong>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowToast(false)}></button>
      </div>
      <div className="toast-body">
        Draft saved in local storage!
      </div>
    </div>
  );
};

export default ToastNotification;
