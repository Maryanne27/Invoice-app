export const invoices = [
  {
    id: "RT3080",
    createdAt: "2026-04-18",
    paymentDue: "2026-05-21",
    paymentTerms: 30,

    description: "two Ankara Kente fabrics for wedding",

    clientName: "Mary Otunba",
    clientEmail: "maryo @gmail.com",
    status: "paid",

    senderAddress: {
      street: "10A Babalola Street",
      city: "Abuja",
      postCode: "100301",
      country: "Nigeria",
    },

    clientAddress: {
      street: "8b runWay road",
      city: "Lagos",
      postCode: "101101",
      country: "Nigeria",
    },

    items: [
      {
        name: "Fabric purchase",
        quantity: 2,
        price: 15000,
      },
    ],

    total: 30000,
  },
];