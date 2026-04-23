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
        flex flex-col md:flex-row md:items-center md:justify-between md:px-8
      "
      onClick={() => navigate(`/invoice/${invoice.id}`)}
    >
      <div className="flex justify-between items-center md:gap-12 w-full md:w-auto">
        <span className="font-bold text-textPrimary dark:text-white uppercase">
          <span className="text-textSecondary">#</span>
          {invoice.id}
        </span>

        {/* mobile client */}
        <span className="text-textSecondary md:hidden">
          {invoice.clientName}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4 md:mt-0 md:flex-1 md:justify-end md:gap-10 w-full">
        <span className="text-textSecondary text-sm">
          Due {invoice.paymentDue}
        </span>

        <span className="font-bold text-textPrimary dark:text-white">
          £{invoice.total.toLocaleString()}
        </span>

        {/* desktop client */}
        <span className="hidden md:block text-textSecondary w-[120px]">
          {invoice.clientName}
        </span>

        <StatusBadge status={invoice.status} />

        <span className="hidden md:block text-primary text-xl">›</span>
      </div>
    </div>
  );
}

export default InvoiceCard;
