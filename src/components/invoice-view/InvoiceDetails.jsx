const InvoiceDetails = ({ invoice }) => {
  return (
    <div className="bg-cardLight dark:bg-cardDark p-6 md:p-12 rounded-lg shadow-sm">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
        <div>
          <h1 className="text-xl font-bold dark:text-white uppercase mb-2">
            <span className="text-textSecondary">#</span>{invoice.id}
          </h1>
          <p className="text-textSecondary dark:text-[#DFE3FA]">{invoice.description}</p>
        </div>
        <div className="text-textSecondary dark:text-[#DFE3FA] md:text-right text-sm">
          <p>{invoice.senderAddress.street}</p>
          <p>{invoice.senderAddress.city}</p>
          <p>{invoice.senderAddress.postCode}</p>
          <p>{invoice.senderAddress.country}</p>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="label mb-3">Invoice Date</h3>
            <p className="text-lg font-bold dark:text-white">{invoice.createdAt}</p>
          </div>
          <div>
            <h3 className="label mb-3">Payment Due</h3>
            <p className="text-lg font-bold dark:text-white">{invoice.paymentDue}</p>
          </div>
        </div>

        <div>
          <h3 className="label mb-3">Bill To</h3>
          <p className="text-lg font-bold dark:text-white mb-2">{invoice.clientName}</p>
          <div className="text-textSecondary dark:text-[#DFE3FA] text-sm">
            <p>{invoice.clientAddress.street}</p>
            <p>{invoice.clientAddress.city}</p>
            <p>{invoice.clientAddress.postCode}</p>
            <p>{invoice.clientAddress.country}</p>
          </div>
        </div>

        <div className="col-span-full md:col-span-1">
          <h3 className="label mb-3">Sent to</h3>
          <p className="text-lg font-bold dark:text-white">{invoice.clientEmail}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-t-lg p-6 md:p-8">
        <table className="w-full text-left">
          <thead className="hidden md:table-header-group">
            <tr className="text-textSecondary dark:text-[#DFE3FA] text-xs">
              <th className="pb-8 font-medium">Item Name</th>
              <th className="pb-8 font-medium text-center">QTY.</th>
              <th className="pb-8 font-medium text-right">Price</th>
              <th className="pb-8 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="md:table-row flex flex-wrap justify-between items-center mb-6 md:mb-0">
                <td className="md:py-4 font-bold dark:text-white w-full md:w-auto">{item.name}</td>
                <td className="md:py-4 text-textSecondary dark:text-[#DFE3FA] font-bold text-center hidden md:table-cell">{item.quantity}</td>
                <td className="md:py-4 text-textSecondary dark:text-[#DFE3FA] font-bold text-right hidden md:table-cell">£{item.price.toFixed(2)}</td>
                <td className="md:py-4 font-bold dark:text-white text-right">£{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Bar (Dark Section) */}
      <div className="bg-[#373B53] dark:bg-[#0C0E16] text-white p-6 md:px-8 rounded-b-lg flex items-center justify-between">
        <span className="text-sm">Amount Due</span>
        <span className="text-2xl font-bold">£{invoice.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default InvoiceDetails