import { Router } from "express"
import Task from "../modules/task.js"

const router = Router()


router.get("/", async (req, res) => {
    const data = await Task.find()
    res.status(200).json(data)
})

router.post("/", async (req, res) => {
    const { title, status, favor } = req.body

    const taskDouble = await Task.findOne({ title: title })
    if (taskDouble) {
        return res.status(400).json({ message: 'Such a task you already have one.' })
    }
    const data = {
        title,
        status,
        favor
    }
    const result = await Task.create(data)
    res.status(201).json(result)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    await Task.findByIdAndDelete(id)
    res.status(200).json({ message: "Successfully deleted!!!" })
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id

    const oldTask = await Task.findById(id)

    const title = req.body.title ? req.body.title : oldTask.title
    const status = req.body.status ? req.body.status : oldTask.status
    const favor = req.body.favor ? req.body.favor : oldTask.favor

    const newTask = {
        title,
        favor,
        status
    }

    const data = await Task.findByIdAndUpdate(id, newTask, { returnDocument: 'after' })
    res.status(200).json(data)
})

router.put("/favor/:id", async (req, res) => {
    const id = req.params.id
    const newTask = await Task.findByIdAndUpdate(id, [
        {
            $set: {
                favor: {
                    $not: "$favor"
                }
            }
        }
    ], { returnDocument: 'after',updatePipeline: true })
    console.log(newTask)
    res.status(200).json(newTask)
})
export default router