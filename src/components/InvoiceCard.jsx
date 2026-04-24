import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

function InvoiceCard({ invoice }) {
  const navigate = useNavigate();
  if (!invoice) return null;

  return (
    <div
      className="
        group bg-white dark:bg-cardDark 
        mb-4 p-6 rounded-lg shadow-sm 
        border border-transparent 
        hover:border-primary 
        transition-all cursor-pointer
        grid grid-cols-2 md:grid-cols-[80px_1fr_auto_auto_auto_20px] 
        items-center gap-y-2 md:gap-x-8 md:px-8
      "
      onClick={() => navigate(`/invoice/${invoice.id}`)}
    >
      <span className="col-start-1 font-bold text-textPrimary dark:text-white uppercase text-sm md:text-base">
        <span className="text-textSecondary">#</span>
        {invoice.id}
      </span>

      <span className="col-start-2 text-right md:text-left text-textSecondary dark:text-white text-sm md:col-start-auto">
        {invoice.clientName}
      </span>

      <span className="col-start-1 text-textSecondary text-sm md:col-start-auto">
        Due {invoice.paymentDue}
      </span>

      <span className="col-start-1 font-bold text-textPrimary dark:text-white text-lg md:col-start-auto md:text-base">
        £{invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>

      <div className="col-start-2 row-start-2 row-span-3 flex justify-end items-center md:row-auto md:col-start-auto md:row-span-1">
        <StatusBadge status={invoice.status} />
      </div>

      <span className="hidden md:block text-primary text-xl font-bold text-right">
        ›
      </span>
    </div>
  );
}

export default InvoiceCard;
