import express from "express";
import bodyParser from "body-parser";
import {nanoid} from "nanoid";
import { Kafka } from "kafkajs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9094"],
});

const producer = kafka.producer();

class OrderService{
    constructor(){
        this.connecetKafka();
    }

    async connecetKafka(){
        try{
            await producer.connect();
        }
        catch(error){
            console.error("Kafka connection error:", error);
        }
    }

    async createOrder(orderData){
        try{

            // siparis ile ilgili tum is sureclerinin bittigi varsayilarak direk kafka adimina gecilmistir 

            const key = orderData.userEmail || Date.now().toString();
            console.log("Sending order.create event");

            await producer.send({
                topic: "order.created",
                messages:[
                    {
                        key: key,
                        value: JSON.stringify({
                            orderId: nanoid(10),
                            ...orderData,
                            timestamp: new Date().toISOString(),
                        }),
                    },
                ],
            });

            return {success: true, orderId: key};
        }
        catch(error){
            console.error("Order creatin error:", error);
            throw error;
        }
    }

    async updateUser(userEmail, orderId){
        
        try{
            
            const key = userEmail;
            console.log("Sending user.updated event");
            await producer.send({
                topic: "user.updated",
                messages: [
                    {
                        key: key,
                        value: JSON.stringify({
                           orderId,
                           userEmail,
                           timestamp: new Date().toISOString(), 
                        }),
                    },
                ],
            });

            return {success: true, orderId: key};

        }catch(error){
            console.log("",error);
        }
    }
}

const orderService = new OrderService();

app.post("/api/v1/orders", async (req, res) => {
    try{
        const order = await orderService.createOrder(req.body);

        if(!!req.body.sendUserUpdate){
            await orderService.updateUser(req.body.userEmail, order.orderId);
        }

        res.status(201).json(order);
    }
    catch(error){
        res.status(500).json({error: "Order creation failed"});
    }
});

app.listen(PORT, () => {
    console.log(`OrderService running on port ${PORT}`);
});

process.on("SIGINT", async () => {
    await producer.disconnect();
    console.log("OrderService disconnected from Kafka");
    process.exit(0);
});