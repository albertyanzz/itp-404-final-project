import React, {useState} from "react";
import { createPortal } from "react-dom";

export default function AddCategoryModal({ onClose, saveCategory }) {
    const [category, setCategory] = useState("");

    function onSave(){
			if(category !== ""){
				saveCategory(category);
			}
		}
		
		function handleCategoryChange(event){
			setCategory(event.target.value);
		}

    return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add a category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
							<input
								type="text"
								value={category}
								onChange={handleCategoryChange}
								className="form-control"
								id="newCategory"
							/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
								onClick={onSave}
								data-dismiss="modal"
                disabled={category === ""}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </>,
    document.getElementById("modal-container")
    );
}