import { Kafka } from "kafkajs";

const topics = ["order.created"];

class MailerService{
    constructor(){
        this.kafka = new Kafka({
            clientId: "mailer-service",
            brokers: ["localhost:9094"],
        });
        
        // kafka topic'lerinden mesajlari okuyacak olan her bir okuyucuya consumer denir. Her bir consumer bir consumer-group'a ait olmalidir.
        this.consumer = this.kafka.consumer({groupId:"mailer-service-group"});
    }

    async connect(){
        await this.consumer.connect();

        await this.consumer.subscribe({
            topics,
            fromBeginning: true,
        });

        console.log(`Consumer subscribed to topic: ${topics}`);

        await this.consumer.run({
            eachMessage: async ({ message, partition, topic}) => {
                console.log(`topic: ${topic}, partition: ${partition}, offsef: ${message.offset}`);

                try{
                    const orderData = JSON.parse(message.value.toString());
                    this.processOrderNotification(orderData);
                } catch(error){
                    console.error("Order process error:", error);
                }
            },
        });
    }

    async disconnect(){
        await this.consumer.disconnect();
    }

    processOrderNotification(orderData){
        console.log("Sending order notification:", {
            orderId: orderData.orderId,
            userEmail: orderData.userEmail,
            items: orderData.items,
            timestamp: new Date().toISOString(),
        });
    }
}

let mailerService;

async function startMailerService() {

    mailerService = new MailerService();

    try{
        await mailerService.connect();
        console.log("Mailer Service connected and is listening");
    }catch(error){
        console.error("Mailer Service not started:", error);
    }
}

startMailerService();

process.on("SIGINT", async () => {
    mailerService.disconnect();
    console.log("Mailer service disconnected from Kafka");
    process.exit(0);
});