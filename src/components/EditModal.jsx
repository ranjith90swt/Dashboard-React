import React, { useEffect, useState } from 'react';
import '../css/CommonModal.css';

const EditModal = ({
  id = 'editModal',
  isOpen,
  onClose,
  data = {},
  title = 'Edit Transaction details',
  excludeFields = 'products',
  footerShow = true,
  onSave
}) => {
  const [formData, setFormData] = useState({});
  const [fieldColors, setFieldColors] = useState({});

  useEffect(() => {
    setFormData(data);
    // generateRandomColors();
  }, [data]);

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
 

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById(id));
    modalInstance.hide();
  };

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
            {formData && Object.entries(formData)
              .filter(([key]) => !excludeFields.includes(key))
              .map(([key, value]) => (
                <div key={key} className="mb-2 d-flex justify-content-between align-items-center py-1">
                  <label className="text-capitalize w-25">{key}:</label>
                  <input
                    className="form-control w-75"
                    // style={{ backgroundColor: fieldColors[key] || '#fff' }}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
          </div>

          {footerShow && (
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
