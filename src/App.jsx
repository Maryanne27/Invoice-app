import { useState, useEffect } from "react"; 
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InvoiceList from "./pages/InvoiceList";
import InvoiceView from "./pages/InvoiceView";
import InvoiceForm from "./components/forms/InvoiceForm";
import DeleteModal from "./components/modals/DeleteModal";
import { invoices as initialInvoices } from "./data/invoices";

function App() {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("mae_invoices");
    return savedInvoices ? JSON.parse(savedInvoices) : initialInvoices;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [filterStatus, setFilterStatus] = useState([]); 

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    localStorage.setItem("mae_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus.length === 0) return true; 
    return filterStatus.includes(inv.status.toLowerCase());
  });

  const handleDelete = () => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== selectedInvoice.id));
    setShowDelete(false);
  };

  const handleMarkAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "paid" } : inv
      )
    );
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setShowForm(true);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-bgLight dark:bg-bgDark flex flex-col lg:flex-row overflow-x-hidden">
        <Header toggleTheme={toggleTheme} isDarkMode={darkMode} />

        <main className="flex-1 flex justify-center px-6 py-8 md:py-14 lg:py-16">
          <div className="w-full max-w-[730px]">
            <Routes>
              <Route
                path="/"
                element={
                  <InvoiceList 
                    invoices={filteredInvoices} 
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    onOpenForm={() => {
                      setSelectedInvoice(null);
                      setShowForm(true);
                    }}
                  />
                }
              />

              <Route
                path="/invoice/:id"
                element={
                  <InvoiceView
                    invoices={invoices}
                    setInvoices={setInvoices}
                    onEdit={handleEdit}
                    onDelete={(inv) => {
                      setSelectedInvoice(inv);
                      setShowDelete(true);
                    }}
                    onMarkAsPaid={handleMarkAsPaid}
                  />
                }
              />
            </Routes>
          </div>
        </main>

        <InvoiceForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          type={selectedInvoice ? "edit" : "create"} 
          initialData={selectedInvoice}
          setInvoices={setInvoices}
        />

        {showDelete && (
          <DeleteModal
            id={selectedInvoice?.id}
            onCancel={() => setShowDelete(false)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;