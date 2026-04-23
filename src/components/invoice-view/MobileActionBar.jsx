const MobileActionBar = ({ onEdit, onDelete, onMarkAsPaid }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#1E2139] p-6 flex items-center justify-center gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <button onClick={onEdit} className="btn-secondary flex-1">
        Edit
      </button>
      <button onClick={onDelete} className="btn-danger flex-1">
        Delete
      </button>
      <button
        onClick={onMarkAsPaid}
        className="btn-primary flex-1 whitespace-nowrap"
      >
        Mark as Paid
      </button>
    </div>
  );
};
 export default MobileActionBar