import Button from './Button.jsx'
import Modal from './Modal.jsx'

export default function RecordActionDialog({ selection, onClose }) {
  if (!selection) return null

  const { action, entity, record } = selection
  const recordName = record?.name || record?.patient || record?.id || 'new record'
  const title = action === 'Add' ? `Add ${entity}` : `${action} ${entity}`
  const message = action === 'Add'
    ? `The ${entity.toLowerCase()} form will be connected to the clinic API in a later step.`
    : `${action} actions for ${recordName} are presentation-only until the clinic API is connected.`

  return (
    <Modal open onClose={onClose} title={title}>
      <p className="modal-description">{message}</p>
      {record && <div className="record-preview"><span>Selected record</span><strong>{recordName}</strong><small>{record.id}</small></div>}
      <div className="modal-actions"><Button variant="secondary" onClick={onClose}>Close</Button></div>
    </Modal>
  )
}