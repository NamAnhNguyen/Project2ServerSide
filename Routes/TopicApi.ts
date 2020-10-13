import { Router, Request, Response } from "express"
import TopicController from "../Controllers/TopicController"
const router = Router();
const topicController = new TopicController()

router.get("/", async (req, res, next): Promise<void> => {
    topicController.index().then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    topicController.store(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.get("/:id", async (req: Request, res: Response, next): Promise<void> => {
    topicController.detail(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.put("/:id", async (req: Request, res: Response, next): Promise<void> => {
    topicController.update(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
