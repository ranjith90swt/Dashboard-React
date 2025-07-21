import React, { useEffect } from 'react';
import '../css/CommonModal.css'

const ViewModal = ({ id = 'viewModal', isOpen, onClose, data, title = 'View Record', exculudeFields = '', footerShow = true}) => {
  useEffect(() => {
    const modal = new bootstrap.Modal(document.getElementById(id));
    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }

    const handleHidden = () => {
      onClose();
    };

    const modalEl = document.getElementById(id);
    modalEl.addEventListener('hidden.bs.modal', handleHidden);

    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [isOpen, id, onClose]);

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {data ? (
              Object.entries(data)
              .filter(([key]) => !exculudeFields.includes(key))
              .map(([key, value]) => (
                <div key={key} className="mb-2 d-flex justify-content-between py-1">
                  <strong className="text-capitalize w-25">{key}:</strong> <div className='w-75'>{String(value)}</div> 
                </div>
              ))
            ) : (
              <p>No data</p>
            )}
          </div>

          {
            footerShow && (
                <div className="modal-footer">
                    <button
                    type="button"
                    className="btn close-btn"
                    data-bs-dismiss="modal"
                    >
                    Close
                    </button>
                </div>
            )
          }

          

        </div>
      </div>
    </div>
  );
};

export default ViewModal;
