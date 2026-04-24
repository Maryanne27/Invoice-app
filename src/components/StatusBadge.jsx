const StatusBadge = ({ status }) => {
  // Mapping the colors to your Tailwind config or custom colors
  const styles = {
    paid: {
      container: "bg-[#33D69F]/10 text-[#33D69F]",
      dot: "bg-[#33D69F]",
    },
    pending: {
      container: "bg-[#FF8F00]/10 text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
    },
    draft: {
      container: "bg-[#373B53]/10 text-[#373B53] dark:bg-white/5 dark:text-white",
      dot: "bg-[#373B53] dark:bg-white",
    },
  };

  const currentStyle = styles[status] || styles.draft;

  return (
    <div
      className={`
        flex items-center justify-center gap-2 
        w-[104px] h-[40px] rounded-md font-bold text-sm
        ${currentStyle.container}
      `}
    >
      {/* The Dot Indicator */}
      <div className={`w-2 h-2 rounded-full ${currentStyle.dot}`} />
      
      <span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default StatusBadge;