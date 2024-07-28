import Razorpay from 'razorpay';
import { userRoutes } from '@/data/apiRoutes';

const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
};

export const makePayment = async (id: String) => {

  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }

  // Make API call to the serverless API
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.createOrder}`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'uuid': id})
  }).then((res) => res.json());
  
  var options = {
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Enter the Key ID generated from the Dashboard
    name: "FoodHub Pvt Ltd",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: "Thankyou for your order",
    image: "https://www.freecodecamp.org/news/content/images/size/w1000/2021/12/Screenshot-2021-12-21-at-12.25.43-PM.png",
    handler: function (response: any) {
      // Validate payment at server - using webhooks is a better idea.
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Suman Debnath",
      email: "sumexxx666@gmail.com",
      contact: "8974863731",
    },
  };

  const paymentObject: any = new (window as any).Razorpay(options);
  paymentObject.open();
};
