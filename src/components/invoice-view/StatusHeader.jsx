import StatusBadge from "../StatusBadge";
const StatusHeader = ({ status, onEdit, onDelete, onMarkAsPaid }) => {
  return (
    <div className="bg-cardLight dark:bg-cardDark p-6 md:px-8 rounded-lg shadow-sm flex items-center justify-between mb-6">
      <div className="flex items-center justify-between w-full md:w-auto md:gap-5">
        <span className="text-textSecondary dark:text-[#DFE3FA] text-sm font-medium">Status</span>
        <StatusBadge status={status} />
      </div>

      <div className="hidden md:flex items-center gap-2">
        <button onClick={onEdit} className="btn-secondary">Edit</button>
        <button onClick={onDelete} className="btn-danger">Delete</button>
        {status !== 'paid' && (
          <button onClick={onMarkAsPaid} className="btn-primary">Mark as Paid</button>
        )}
      </div>
    </div>
  );
};

export default StatusHeader;

