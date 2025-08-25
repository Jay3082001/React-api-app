import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Form/button/Button"; // adjust import path
import { ModalWrapper } from "./Styled";

const ConfirmModal = ({
  isOpen,
  message = "Are you sure?",
  onConfirm,
  onCancel,
  loading = false,
  confirmText = "Yes",
  cancelText = "No"
}) => {
  if (!isOpen) return null; 

  return (
    <ModalWrapper>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "flex-end" }}>
        <Button onClick={onConfirm} variant="danger" disabled={loading}>
          {loading ? (
            <>
              Deleting...
              <FontAwesomeIcon
                icon="spinner"
                spin
                style={{ marginLeft: "8px" }}
              />
            </>
          ) : (
            confirmText
          )}
        </Button>
        <Button onClick={onCancel} variant="secondary" disabled={loading}>
          {cancelText}
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
