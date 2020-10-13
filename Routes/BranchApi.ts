import { Router, Request, Response } from "express"
import BranchController from "../Controllers/BranchController"
const router = Router();
const branchController = new BranchController()

router.get("/", async (req, res, next): Promise<void> => {
    branchController.index().then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    branchController.store(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.get("/:id", async (req: Request, res: Response, next): Promise<void> => {
    branchController.detail(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})

router.put("/:id", async (req: Request, res: Response, next): Promise<void> => {
    branchController.update(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
