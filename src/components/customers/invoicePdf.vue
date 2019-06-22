<template>
    <div id="invoice" style="background-color: #fff; width: 710px; padding: 20px">
        <div style="width:100%; display: -webkit-box;">
            <div style="width: 50%; padding: 5px; text-align: center;">
                <span style="font-size: 65px"><i>Elite Bridal</i></span><br/>
                <span style="font-size: 25px">boutique outlets</span>
            </div>
            <div style="width: 50%; padding: 5px; text-align: -webkit-right;">
                <span> Elite Designer Fashions Ltd </span><br/>
                <span> Unit 2, Ashley Industrial Estate </span><br/>
                <span> Carr Wood Rd </span><br/>
                <span> Glasshoughton</span><br/>
                <span>WF10 4SR</span><br/>
                <span>Tel: 01977 519303</span><br/>
                <span>www.elite.gb.net </span><br/>
            </div>
        </div>
        <div style="width:100%; margin-top: 20px">
            <p style="width:100%; text-align:center; font-size: 24px">Sales Assist: <strong> Nicola Walton</strong></p>
            <p style="width:100%; text-align:center; font-size: 24px"><strong> Sales Receipt</strong></p>
        </div>
        <hr>
        <div style="width:100%; margin-top: 20px; text-align:center;" >
            <span><strong>Name:</strong> {{customer.name}}</span><br/>
            <span><strong>Customer no:</strong> {{customer.customerNo}}</span><br/>
            <span><strong>Sale no:</strong> </span><br/>
            <span><strong>Wedding Date:</strong> {{ new Date(payment.date).toLocaleString('en-gb', dateOptions)}}</span><br/>
        </div><br>
        <hr>
        <div style="width:100%; display: -webkit-box;">
            <div style="width: 50%; padding: 5px; text-align: center;">
                <span><strong>Date:</strong> {{ new Date(payment.date).toLocaleString('en-gb', dateOptions)}}</span>
            </div>
            <div style="width: 50%; padding: 5px; text-align: center;">
                <span><strong>Type: </strong> {{ payment.moneyType}}</span>
            </div>
        </div>
        <hr>
        <div style="width:100%; display: -webkit-box;">
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>Product Code</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>Item</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>In/Out of stock</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>Price</span>
            </div>
        </div>
        <hr>
        <div style="width:100%; display: -webkit-box;">
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>XHB08C01S14</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>Wedding Dress</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>I</span>
            </div>
            <div style="width: 25%; padding: 5px; text-align: center;">
                <span>£{{payment.amount}}</span>
            </div>
        </div>
        <hr>
        <div style="width:100%; display: -webkit-box; margin-top: 100px">
            <div style="width: 50%; padding: 5px">
                <br/><br/><br/>
                <span style="margin-bottom: -20px"><strong>Comments: </strong></span>
            </div>
            <div style="width: 50%; padding: 5px; text-align: -webkit-right;">
                <span>Total: £{{payment.amount}}</span><br/>
                <hr style="width: 40%;">
                <span>Initial Payment:  £{{payment.amount}}</span><br/>
                <span>Previous Balance:  £0</span><br/>
                <hr style="width: 40%;">
                <span>Current Balance:  £0</span><br/>
            </div>
        </div>
        <div style="width:100%; margin-top: 10px; border:1px solid gray;">
            <p style="padding: 10px; text-align: center">
                {{payment.comment}}
            </p>
        </div><br/>
        <h1 style="width:100%; text-align: center"> Payment Plan</h1>
        <div style="width:100%; display: -webkit-box; margin-top:20px; text-align: center">
            <div style="width: 25%; padding: 5px">
                <span>Payment no:</span>
            </div>
            <div style="width: 25%; padding: 5px">
                <span>Amount:</span>
            </div>
            <div style="width: 25%; padding: 5px">
                <span>Date: </span>
            </div>
            <div style="width: 25%; padding: 5px">
                <span>Day:</span>
            </div>
        </div>
        <hr/>
        <h1 style="text-align: center">No Payments Due</h1>
        <div style="width:100%; margin-top:40px; text-align: center">
            <p>I have read, accepted and understood the terms & conditions overleaf: <span style="font-size: 35px"><i>x</i></span> </p>
            <hr/>
            <p>Effective as of 12 April 2017, Elite regret that due to staff shortages we can no longer offer alterations on bridesmaid dresses purchased after this date and this service is now only available on wedding gowns purchased from Elite. A list of self employed seamstresses is available on request.</p>
            <hr/>
            <p>Thank	you	for	your	recent	purchase	from	Elite,	we	would	like	to	advise	you	that	the	item(s)	are	non	refundable/returnable. Statutory rights unaffected </p>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['payment', 'customer'],
      data() {
        return {
          dateOptions: {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }
        };
      },
    };
</script>
