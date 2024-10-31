import { Kafka, Consumer, EachMessagePayload } from 'kafkajs'; // Kafka 라이브러리 임포트
import moment from 'moment'; // Kafka 라이브러리 임포트
import Logger from '../modules/Logger'; // Logger 임포트 (경로는 필요에 따라 조정)

class Loaders {
    private consumer: Consumer; // Kafka Consumer를 위한 변수 선언

    constructor() {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092'], // 브로커 주소
        });

        this.consumer = kafka.consumer({ groupId: 'test-group' }); // Consumer 초기화
    }

    async serverLoad() {
        Logger.info("Initialize start!");

        await this.consumer.connect(); // Consumer 연결
        Logger.info('Kafka Consumer connected');

        await this.consumer.subscribe({ topic: 'MTS', fromBeginning: true }); // 토픽 구독

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message: ${moment().format("YYYY-MM-DD HH:mm:ss")} - ${message.value?.toString()}`); // 메시지 수신
                console.log(`Received message: ${moment().format("YYYY-MM-DD HH:mm:ss")} - ${topic.toString()}`); // 메시지 수신
                console.log(`Received message: ${moment().format("YYYY-MM-DD HH:mm:ss")} - ${partition.toString()}`); // 메시지 수신
            },
        });

        Logger.info("Express Customer Service Initialized");
    }
}

export default new Loaders();
