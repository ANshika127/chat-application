import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ConfirmationDialog.css";

function ConfirmationDialog({ 
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  danger= false,
  }) {

    useEffect(()=>{
      const handleEscape =(event) =>{
        if (event.key === "Escape"){
          onCancel();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () =>{
        document.removeEventListener("keydown", handleEscape);
      };
    },[onCancel]);


    return createPortal(
      <div 
        className="confirmation-overlay"
        onMouseDown={(event) => {
          if(event.target === event.currentTarget){
            onCancel();
          }
        }}
      >
        <section
          className="confirmation-dialog"
          role="alertdialog"
          aria-modal= "true"
          aria-labelledby="confirmation-title"
          aria-describedby="confirmation-description"
        >
          <h2 id="confirmation-title">{title}</h2>
          <p id = "confirmation-description">{description}</p>

          <div className="confirmation-actions">
            <button 
              type="button"
              className="confirmation-cancel"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              className={`confirmation-confirm ${danger ? "confirmation-danger" : ""}`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </section>
      </div>,
      document.body
    );
  }
  export default ConfirmationDialog;
