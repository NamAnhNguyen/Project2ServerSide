import { Router, Request, Response } from "express"
import multer from 'multer'
const upload = multer();

import LectureController from "../Controllers/LectureController"
const router = Router();
const lectureController = new LectureController()

router.get("/", async (req, res, next): Promise<void> => {
    lectureController.index().then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.post("/", upload.any(), async (req: Request, res: Response, next): Promise<void> => {
    let inputs = {
        ...req.body,
        files: req.files,
    }
    lectureController.store(inputs).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.get("/:id", async (req: Request, res: Response, next): Promise<void> => {
    console.log("in")
    lectureController.detail(req.body).then((data) => {
        console.log(data)
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.put("/:id", upload.any(), async (req: Request, res: Response, next): Promise<void> => {
    let inputs = {
        ...req.body,
        files: req.files,
    }
    lectureController.update(inputs).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
