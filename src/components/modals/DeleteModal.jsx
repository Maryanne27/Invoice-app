const DeleteModal = ({ id, onCancel, onDelete }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white dark:bg-[#1E2139] w-full max-w-[480px] p-8 md:p-12 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold dark:text-white mb-3">
          Confirm Deletion
        </h2>
        <p className="text-[#888EB0] dark:text-[#DFE3FA] text-sm leading-6 mb-8">
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold hover:bg-[#DFE3FA] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-[#EC5757] text-white px-6 py-4 rounded-full font-bold hover:bg-[#FF9797] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
