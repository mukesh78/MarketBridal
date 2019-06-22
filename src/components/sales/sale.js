class Sale {

    id = ''
    customerNo = ''
    saleNo = ''
    date = ''
    total = 0
    deposit = 0
    balance = 0
    installments = []
    paymentType = ''
    repaymentType = ''
    moneyType = ''
    employee = ''
    items = []
    payments = []
    comment = Comment
}

class Comment {

    id = ''
    date = ''
    type = ''
    comments = ''
}

class Payment {

    id = ''
    customerNo = ''
    date = ''
    category = ''
    amount = 0
    moneyType = ''
    employee = ''
    comment = Comment
    
}