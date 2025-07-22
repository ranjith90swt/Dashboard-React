// CommonModal.js
import React, { useEffect } from 'react';
import '../css/CommonModal.css';

const CommonModal = ({
  id = 'commonModal',
  isOpen,
  onClose,
  title = 'Modal',
  children,
  footer,
  size = 'lg',
  staticBackdrop = false,
}) => {
  useEffect(() => {
    const modalEl = document.getElementById(id);
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: staticBackdrop ? 'static' : true,
      keyboard: !staticBackdrop,
    });

    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }

    const handleHidden = () => {
      onClose();
    };

    modalEl.addEventListener('hidden.bs.modal', handleHidden);
    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [isOpen, id, onClose, staticBackdrop]);

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div className="modal-body">
            {children}
          </div>

          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
