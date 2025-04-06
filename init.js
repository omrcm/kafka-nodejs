import {Kafka} from "kafkajs";

const clientId = "init";
const brokers = ["localhost:9094"];

const topicsToCreate = [
    {
        name: "order.created",
        partitions:3,
        replicationFactor:1,
    },
    {
        name: "user.updated",
        partitions:1,
        replicationFactor:1,
    },
];

const kafka = new Kafka({
    clientId,
    brokers,
});

(async () => {
    const admin = kafka.admin();
    try{
        await admin.connect();
        console.log("kafka admin client connected");

        const topics = await admin.listTopics();
        console.log("Existing topics:", topics);

        const created = await admin.createTopics({
            topics: topicsToCreate.map((topic) => ({
                topic: topic.name,
                numPartitions: topic.partitions || 3,
                replicationFactor: topic.replicationFactor || 1,
            })),
        });
    }catch(error){
        console.error("kafka initialization Error: ", error);
    }finally{
        await admin.disconnect();
        console.log("kafka admin client disconnected")
    }
})();