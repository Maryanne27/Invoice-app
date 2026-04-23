import { useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../components/modals/DeleteModal"; 
import InvoiceForm from "../components/forms/InvoiceForm";
import MobileActionBar from "../components/invoice-view/MobileActionBar";
import InvoiceDetails from "../components/invoice-view/InvoiceDetails";
import StatusHeader from "../components/invoice-view/StatusHeader";

function InvoiceView({ invoices, setInvoices }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p>Invoice not found</p>;

  const handleEdit = () => setIsEditFormOpen(true);
  
  const handleDelete = () => setIsDeleteModalOpen(true);

  const confirmDelete = () => {
    const updatedList = invoices.filter(inv => inv.id !== id);
    setInvoices(updatedList);
    navigate("/"); 
  };

  const handleMarkAsPaid = () => {
    const updatedList = invoices.map(inv => 
      inv.id === id ? { ...inv, status: 'paid' } : inv
    );
    setInvoices(updatedList);
  };

  return (
    <>
      <div className="pb-32 md:pb-12">
        <StatusHeader 
          status={invoice.status} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onMarkAsPaid={handleMarkAsPaid} 
        />
        <InvoiceDetails invoice={invoice} />
        <MobileActionBar 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onMarkAsPaid={handleMarkAsPaid} 
        />
      </div>

    
      {isDeleteModalOpen && (
        <DeleteModal 
          id={invoice.id} 
          onCancel={() => setIsDeleteModalOpen(false)} 
          onDelete={confirmDelete} 
        />
      )}

      {isEditFormOpen && (
        <InvoiceForm
          isOpen={isEditFormOpen} 
          onClose={() => setIsEditFormOpen(false)} 
          type="edit"
          initialData={invoice}
        />
      )}
    </>
  );
}

export default InvoiceView