import { useState, useEffect } from "react";
import { ArrowSideIcon, BinIcon } from "../../assets/icons";
import BackButton from "../BackButton";

const InvoiceForm = ({ isOpen, onClose, type, initialData, setInvoices }) => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id: "",
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
      setFormData({
        id: initialData.id,
        clientName: initialData?.clientName || "",
        clientEmail: initialData?.clientEmail || "",
        description: initialData?.description || "",
        createdAt: initialData?.createdAt || "",
        paymentTerms: initialData?.paymentTerms || 30,

        senderAddress: {
          street: initialData?.senderAddress?.street || "",
          city: initialData?.senderAddress?.city || "",
          postCode: initialData?.senderAddress?.postCode || "",
          country: initialData?.senderAddress?.country || "",
        },

        clientAddress: {
          street: initialData?.clientAddress?.street || "",
          city: initialData?.clientAddress?.city || "",
          postCode: initialData?.clientAddress?.postCode || "",
          country: initialData?.clientAddress?.country || "",
        },
      });
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

    if (!formData.clientName?.trim()) newErrors.clientName = "Required";
    if (!formData.clientEmail?.trim()) newErrors.clientEmail = "Required";

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

  const deleteItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSave = (status) => {
    if (status !== "draft" && !validate()) return;

    // console.log(setInvoices);

    const id = formData.id;

    const finalInvoice = {
      ...formData,
      id,
      status,
      paymentDue: calculateDueDate() || "",
      items: items.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 0,
        price: Number(item.price) || 0,
        total: (Number(item.quantity) || 0) * (Number(item.price) || 0),
      })),
      total: items.reduce(
        (acc, item) =>
          acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0
      ),
    };

    setInvoices((prev) =>
      type === "edit"
        ? prev.map((inv) => (inv.id === formData.id ? finalInvoice : inv))
        : [finalInvoice, ...prev]
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="
relative h-full w-full 
max-w-full md:max-w-[616px] lg:max-w-[730px]
bg-white dark:bg-[#141625] 
flex flex-col
mx-auto
lg:rounded-r-2xl pl-0
"
      >
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-14 md:py-12">
          <BackButton />

          <h1 className="text-2xl font-bold mb-10 dark:text-white">
            {type === "edit" ? `Edit #${initialData?.id}` : "New Invoice"}
          </h1>

          <div className="space-y-8">
            {/* Sender */}
            <section>
              <h3 className="section-title">Bill From</h3>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  className="input-field"
                  value={formData.senderAddress.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    className="input-field"
                    value={formData.senderAddress.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        senderAddress: {
                          ...formData.senderAddress,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="form-group col-span-1">
                  <label className="form-label">Post Code</label>
                  <input
                    className="input-field"
                    value={formData.senderAddress.postCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        senderAddress: {
                          ...formData.senderAddress,
                          postCode: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group col-span-2 md:col-span-1">
                <label className="form-label">Country</label>
                <input
                  className="input-field"
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </section>

            {/* Receiver */}
            <section>
              <h3 className="section-title">Bill To</h3>

              <div className="form-group">
                <label className="form-label">Client’s Name</label>
                <input
                  className="input-field"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client’s Email</label>
                <input
                  className="input-field"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  className="input-field"
                  value={formData.clientAddress.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    className="input-field"
                    value={formData.clientAddress.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientAddress: {
                          ...formData.clientAddress,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Post Code</label>
                  <input
                    className="input-field"
                    value={formData.clientAddress.postCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientAddress: {
                          ...formData.clientAddress,
                          postCode: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  className="input-field"
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </section>

            {/* DATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Invoice Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.createdAt}
                  onChange={(e) =>
                    setFormData({ ...formData, createdAt: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Terms</label>
                <select
                  className="select-field"
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
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label className="form-label">Project Description</label>
              <input
                className="input-field"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* ITEMS */}
            <div className="space-y-6">
              <h3 className="text-[#777F98] text-[18px] font-bold">
                Item List
              </h3>

              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
                >
                  <div className="form-group  md:col-span-4">
                    <label className="form-label">Item Name</label>
                    <input
                      className="input-field"
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[i].name = e.target.value;
                        setItems(updated);
                      }}
                    />
                  </div>

                  <div className=" grid grid-cols-3 gap-4 md:content ">
                    <div className=" form-group">
                      <label className="form-label ">Qty.</label>
                      <input
                        type="number"
                        className="input-field"
                        value={item.quantity}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[i].quantity = Number(e.target.value);
                          setItems(updated);
                        }}
                      />
                    </div>

                    <div className="form-group ">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="input-field"
                        value={item.price}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[i].price = Number(e.target.value);
                          setItems(updated);
                        }}
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <p className="text-[#7E88C3] text-xs mb-2">Total</p>
                      <p className="text-[#0C0E16] dark:text-white font-bold">
                        £ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteItem(i)}
                      className=" flex items-center justify-center md:col-span-2 text-[#888EB0] hover:text-red-500"
                    >
                      <BinIcon />
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={addItem} className="btn-secondary w-full ">
                + Add New Item
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="sticky bottom-0 left-0 w-full 
px-6 md:px-14 py-4 
bg-white dark:bg-[#141625] 
flex flex-col md:flex-row md:justify-between gap-4 
border-t border-[#DFE3FA] dark:border-[#252945]
shadow-[0_-10px_20px_rgba(0,0,0,0.04)] 
dark:shadow-[0_-10px_20px_rgba(0,0,0,0.25)]"
        >
          {/* LEFT BUTTON */}
          {type === "edit" ? (
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          ) : (
            <button onClick={onClose} className="btn-secondary">
              Discard
            </button>
          )}

          {/* RIGHT BUTTONS */}
          <div className="flex gap-2">
            {type !== "edit" && (
              <button
                onClick={() => handleSave("draft")}
                className="btn-secondary"
              >
                Save as Draft
              </button>
            )}

            {type === "edit" ? (
              <button
                onClick={() => handleSave("pending")}
                className="btn-primary"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => handleSave("pending")}
                className="btn-primary"
              >
                Save & Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
