export default {

  phoneMask: '###########',
  requiredRules: [
    v => !!v || 'This field is required'
  ],
  requiredEmailRules: [
    v => !!v || 'E-mail is required'
  ],
  emailRules: [
    v => !!v && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
  ],
  phoneRules: [
    v => !!v || 'Phone is required',
    v => !!v && v.length == 11 || 'Phone number must be 11 digits'
  ],
  dateRules: [
    v => !!v || 'Date is required',
    v => !!v && v.length == 10 || 'Date must be in the format dd/mm/yyyy'
  ],
  minCountRules: [
    v => !!v || 'Sizes is required',
    v => !!v && v.length > 0 || 'Must have at least 1 size'
  ],
  yesNoRules: [
    v => v != null || 'This field is required'
  ],
  nameRules: [
    v => !!v || 'This field is required',
    v => !!v && /^((\w.+\s).+)$/.test(v) || 'Enter First & Last Name'
  ]
}