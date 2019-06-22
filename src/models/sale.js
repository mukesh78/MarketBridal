export default {
  employee: '',
  enquiry: null,
  date: new Date().toISOString().substr(0, 10),
  name: '',
  address: '',
  city: '',
  postcode: '',
  phone: '',
  weddingDate: null,
  email: '',
  saleItems: [
      {
          category: '',
          code: '',
          size: null,
          colour: null,
          price: '0',
      }
  ],
  total: 0,
  deposit: 0,
  balance: 0,
  installments: 0,
  payment: null,
  repayment: null,
  paymentType:'',
  paymentItems: [],
  comments: []
}