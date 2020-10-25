import { Router, Request, Response } from "express"
import QuestionLevelController from "../Controllers/QuestionLevelController"
const router = Router();
const questionLevelController = new QuestionLevelController()

router.get("/", async (req, res, next): Promise<void> => {
    questionLevelController.index().then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    questionLevelController.store(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.get("/:id", async (req: Request, res: Response, next): Promise<void> => {
    questionLevelController.detail(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.put("/:id", async (req: Request, res: Response, next): Promise<void> => {
    questionLevelController.update(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
