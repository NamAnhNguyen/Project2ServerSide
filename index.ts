import express from "express"
const cors = require("cors")
const bodyParser = require('body-parser');

import BranchApi from './Routes/BranchApi'
import TopicApi from './Routes/TopicApi'
import LectureApi from './Routes/LectureApi'
import QuestionTypeApi from './Routes/QuestionTypeApi'
import QuestionLevelApi from './Routes/QuestionLevelApi'

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

APP.use(express.static('public'))

APP.use("/branches", BranchApi)
APP.use("/topics", TopicApi)
APP.use("/lectures", LectureApi)
APP.use("/questionTypes", QuestionTypeApi)
APP.use("/questionLevels", QuestionLevelApi)