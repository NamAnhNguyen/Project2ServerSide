import { Router, Request, Response } from "express"
import QuestionTypeController from "../Controllers/QuestionTypeController"
const router = Router();
const questionTypeController = new QuestionTypeController()

router.get("/", async (req, res, next): Promise<void> => {
    questionTypeController.index().then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    questionTypeController.store(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.get("/:id", async (req: Request, res: Response, next): Promise<void> => {
    questionTypeController.detail(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.put("/:id", async (req: Request, res: Response, next): Promise<void> => {
    questionTypeController.update(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
