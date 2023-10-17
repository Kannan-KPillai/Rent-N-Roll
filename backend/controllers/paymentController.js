import { Stripe } from "stripe";
import dotenv from 'dotenv';
import asyncHandler from "express-async-handler";


dotenv.config();

const key = process.env.STRIPE_KEY


const stripe = new Stripe(key); 

const payment = asyncHandler(async(req, res)=>{
    const {price, name, car} =  req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            line_items:[
                {
                price_data:{
                    currency: 'inr',
                product_data: {
                    name: name,
                },
                unit_amount: price * 100,    
                },
                quantity: 1,
            },
        ],
            success_url: 'http://localhost:5000/carDetails/success',
            cancel_url: `http://localhost:5000/carDetails/${car}`
        })

        res.json({ id: session.id });
    } catch (error) {
        
    }
})

export {payment}