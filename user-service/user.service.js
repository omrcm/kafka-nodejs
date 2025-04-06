import {Kafka} from "kafkajs";

const topics = ["user.updated","order.created"];

class UserService {
    constructor() {
        this.kafka = new Kafka({
            clientId: "user-service",
            brokers: ["localhost:9094"],
        });

        this.consumer = this.kafka.consumer({groupId: "user-service-group"});
    }

    async connect(){
        await this.consumer.connect();
        console.log("Connected to consumer");

        await this.consumer.subscribe({
            topics,
            fromBeginning: true,
        });

        console.log(`Subscribed to topics: ${topics}`);

        await this.consumer.run({
            eachMessage: async ({message, partition, topic}) => {
                console.log(`topic: ${topic}, partition: ${partition}, offset: ${message.offset}`);

                try{
                    const orderData = JSON.parse(message.value.toString());
                    this.processUserUpdate(orderData);
                }catch(error){
                    console.error("Order process error:", error );
                }
            },
        });
    }

    async disconnect(){
        await this.consumer.disconnect();
    }

    processUserUpdate(orderData){
        console.log("Update user:", {
            orderId: orderData.orderId,
            userEmail: orderData.userEmail,
            items: orderData.items,
            timestamp: new Date().toISOString(),
        });
    }
}

let userService;

async function startUserService() {
    userService = new UserService();

    try{
        await userService.connect();
        console.log("User service connected");
    }catch(error){
        console.error("User service not started. Error:", error);
    }
}

startUserService();

process.on("SIGINT", async () => {
    userService.disconnect();
    console.log("Userservice disconnected from kafka");
    process.exit(0);
});