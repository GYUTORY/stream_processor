import moment from "moment";
import loaders from "./loaders/index";

(async () => {
    console.log(moment().format("YYYY-MM-DD HH:mm:ss") + " Kafka Consumer Run!");

    await loaders.serverLoad()
})();
