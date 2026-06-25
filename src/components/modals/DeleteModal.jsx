import TrashIcon from "../../assets/Trash.svg?react"

const DeleteModal = ({ onConfirm, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[200]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-7 text-center
                      animate-[slideUp_0.18s_ease]" onClick={(e) => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center
                        justify-center text-red-400 text-3xl mx-auto mb-4">
          <TrashIcon />
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1.5">Delete this task?</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          This action is permanent and cannot be undone.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200
                       rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-400
                       hover:bg-red-600 rounded-lg transition-all active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal