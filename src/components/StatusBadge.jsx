const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-paid/10 text-paid",
    pending: "bg-pending/10 text-pending",
    draft: "bg-draft/10 text-draft",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;