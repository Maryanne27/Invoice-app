import { useState, useEffect, useRef } from "react";
import { ArrowDownIcon, PlusIcon } from "../assets/icons";
import InvoiceCard from "../components/InvoiceCard";
import EmptyState from "../components/EmptyState";

function InvoiceList({ invoices, filterStatus, setFilterStatus, onOpenForm }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleFilter = (status) => {
    setFilterStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
            Invoices
          </h1>
          <p className="text-textSecondary text-sm">
            {invoices.length === 0
              ? "No invoices"
              : `There are ${invoices.length} total invoices`}
          </p>
        </div>

          {/* FILTER */}
        <div className="flex items-center gap-4 md:gap-10">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 font-bold dark:text-white"
            >
              <span>
                Filter <span className="hidden md:inline">by status</span>
              </span>
              <ArrowDownIcon
                className={`${
                  isDropdownOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 p-6 bg-white dark:bg-[#252945] shadow-xl rounded-lg z-50">
                {["Draft", "Pending", "Paid"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-3 mb-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filterStatus.includes(status.toLowerCase())}
                      onChange={() => toggleFilter(status.toLowerCase())}
                    />
                    <div
                      className={`w-4 h-4 rounded-sm border border-primary flex items-center justify-center transition-colors ${
                        filterStatus.includes(status.toLowerCase())
                          ? "bg-primary"
                          : "bg-[#DFE3FA] dark:bg-[#1C1F2E]"
                      }`}
                    >
                      {filterStatus.includes(status.toLowerCase()) && (
                        <span className="text-[10px] text-white">✓</span>
                      )}
                    </div>
                    <span className="font-bold dark:text-white group-hover:text-primary">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenForm}
            className="bg-primary hover:bg-[#9277FF] text-white p-2 md:pr-4 rounded-full flex items-center gap-2 font-bold transition-colors"
          >
            <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <PlusIcon className="text-primary" />
            </span>
            <span>
              New <span className="hidden md:inline">Invoice</span>
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {invoices.length === 0 ? (
          <EmptyState />
        ) : (
          invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)
        )}
      </div>
    </>
  );
}

export default InvoiceList;
