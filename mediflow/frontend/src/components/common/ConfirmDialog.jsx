import { AlertTriangle } from 'lucide-react'
import Button from './Button.jsx'
import Modal from './Modal.jsx'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', loading = false, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="confirm-dialog-copy"><span><AlertTriangle size={18} /></span><p>{message}</p></div>
      <div className="modal-actions"><Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button><Button variant="danger" onClick={onConfirm} disabled={loading}>{loading ? 'Deleting...' : confirmLabel}</Button></div>
    </Modal>
  )
}