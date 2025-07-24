import React from 'react';
import '../css/CommonModal.css';

const CommonModal = ({
  id = 'commonModal',
  isOpen,
  onClose,
  title = 'Modal',
  children,
  footer,
  size = 'lg',
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            <div className="modal-body">{children}</div>

            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>

      {/* Manually render backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default CommonModal;
