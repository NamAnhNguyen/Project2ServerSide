import * as  express from "express"
const cors = require("cors")
const bodyParser = require('body-parser');

import BranchApi from './Routes/BranchApi'
import TopicApi from './Routes/TopicApi'

const APP = express();
APP.use(cors());
APP.use([
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true,
    })
]);


APP.get('/', (req, res) => {
    console.log('REQUEST AT ROOT...');
    res.json({ status: true });
});
APP.listen(8082, () => {
    console.log('SERVER IS LISTENING AT PORT 8082');
});

APP.use("/branches", BranchApi)
APP.use("/topics", TopicApi)