import { useState, useEffect } from "react";
import { ArrowSideIcon } from "../../assets/icons";


const InvoiceForm = ({ isOpen, onClose, type, initialData, setInvoices }) => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    description: "",
    createdAt: "",
    paymentTerms: 30,

    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },

    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (type === "edit" && initialData) {
      setItems(initialData.items || []);
      setFormData(initialData);
    } else {
      setItems([]);
      setFormData({
        clientName: "",
        clientEmail: "",
        description: "",
        createdAt: "",
        paymentTerms: 30,
        senderAddress: { street: "", city: "", postCode: "", country: "" },
        clientAddress: { street: "", city: "", postCode: "", country: "" },
      });
    }
  }, [initialData, type, isOpen]);

  const calculateDueDate = () => {
    if (!formData.createdAt) return "";
    const date = new Date(formData.createdAt);
    date.setDate(date.getDate() + Number(formData.paymentTerms || 0));
    return date.toISOString().split("T")[0];
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.clientName.trim()) newErrors.clientName = "Required";
    if (!formData.clientEmail.trim()) newErrors.clientEmail = "Required";
    if (!/\S+@\S+\.\S+/.test(formData.clientEmail))
      newErrors.clientEmail = "Invalid email";

    if (!formData.createdAt) newErrors.createdAt = "Required";
    if (!formData.description.trim()) newErrors.description = "Required";

    if (items.length === 0) newErrors.items = "Add at least one item";

    items.forEach((item, i) => {
      if (!item.name) newErrors[`name-${i}`] = "Required";
      if (item.quantity <= 0) newErrors[`qty-${i}`] = "Invalid";
      if (item.price <= 0) newErrors[`price-${i}`] = "Invalid";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);

  const deleteItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  const handleSave = (status) => {
    if (status !== "draft" && !validate()) return;

    const id =
      type === "edit"
        ? initialData.id
        : `RT${Date.now().toString().slice(-6)}`;

    const finalInvoice = {
      ...formData,
      id,
      status,
      paymentDue: calculateDueDate(),
      items,
      total: items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    setInvoices((prev) =>
      type === "edit"
        ? prev.map((inv) => (inv.id === id ? finalInvoice : inv))
        : [finalInvoice, ...prev]
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative h-full w-full max-w-[720px] bg-white dark:bg-[#141625] overflow-y-auto p-8 md:p-14 lg:ml-[103px]">

      
        <button onClick={onClose} className="mb-6 text-sm text-textSecondary flex items-center gap-3 font-bold ">
         <ArrowSideIcon /> 
         <span> Go back</span>
        
        </button>

        <h1 className="text-2xl font-bold mb-10 dark:text-white">
          {type === "edit" ? `Edit #${initialData?.id}` : "New Invoice"}
        </h1>

        <div className="space-y-10 pb-32">

          {/* Sender */}
          <section>
            <h3 className="text-primary font-bold mb-4">Bill From</h3>

            {["street", "city", "postCode", "country"].map((field) => (
              <input
                key={field}
                placeholder={field}
                className="input-field mb-3"
                value={formData.senderAddress[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            ))}
          </section>

          {/* Receiver */}
          <section>
            <h3 className="text-primary font-bold mb-4">Bill To</h3>

            <input
              className="input-field mb-3"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />

            <input
              className="input-field mb-3"
              placeholder="Client Email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
              }
            />

            {["street", "city", "postCode", "country"].map((field) => (
              <input
                key={field}
                placeholder={field}
                className="input-field mb-3"
                value={formData.clientAddress[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            ))}
          </section>

          {/* DATE */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="input-field"
              value={formData.createdAt}
              onChange={(e) =>
                setFormData({ ...formData, createdAt: e.target.value })
              }
            />

            <select
              className="input-field"
              value={formData.paymentTerms}
              onChange={(e) =>
                setFormData({ ...formData, paymentTerms: e.target.value })
              }
            >
              <option value={1}>Net 1 Day</option>
              <option value={7}>Net 7 Days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <input
            className="input-field"
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* ITEMS */}
          <div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 mb-3">
                <input
                  className="col-span-5 input-field"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i].name = e.target.value;
                    setItems(updated);
                  }}
                />
                <input
                  type="number"
                  className="col-span-2 input-field"
                  value={item.quantity}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i].quantity = Number(e.target.value);
                    setItems(updated);
                  }}
                />
                <input
                  type="number"
                  className="col-span-3 input-field"
                  value={item.price}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i].price = Number(e.target.value);
                    setItems(updated);
                  }}
                />
                <button onClick={() => deleteItem(i)}>🗑️</button>
              </div>
            ))}

            <button onClick={addItem} className="btn-secondary w-full">
              + Add New Item
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white dark:bg-[#141625] flex justify-between">
          <button onClick={onClose} className="btn-secondary">
            Discard
          </button>

          <div className="flex gap-2">
            {type !== "edit" && (
              <button onClick={() => handleSave("draft")} className="btn-secondary">
                Save Draft
              </button>
            )}

            <button onClick={() => handleSave("pending")} className="btn-primary">
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;