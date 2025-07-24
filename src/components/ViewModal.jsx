import React from 'react';
import '../css/CommonModal.css'

const ViewModal = ({ id = 'viewModal', isOpen, onClose, data, title = 'View Record', exculudeFields = '', footerShow = true}) => {
    if (!isOpen) return null;


  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
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
