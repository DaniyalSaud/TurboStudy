import { createNotes, deleteNotes, getNotes, getSimilarNotes, updateNote, uploadMiddleware } from "./../../../controllers/ai-controller.js";
import express, { type Request, type Response } from "express";

const router = express.Router();    

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'AI route is working!' });
});

router.get('/notes', getNotes);
router.get('/similar', getSimilarNotes);
router.post('/notes', uploadMiddleware, createNotes);
router.put('/notes', updateNote);
router.delete('/notes', deleteNotes);

export default router;