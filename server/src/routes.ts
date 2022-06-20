import express from "express";
import { SubmitFeedbackUseCases } from "./useCases/SubmitFeedbackUseCases";
import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { NodemailerAdapter } from "./adapters/nodemailer/NodemailerAdapter";

const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerAdapter = new NodemailerAdapter();

  const submitFeedbacksUseCase = new SubmitFeedbackUseCases(
    prismaFeedbacksRepository,
    nodemailerAdapter
  );

  await submitFeedbacksUseCase.execute({ type, comment, screenshot });

  return res.status(201).send();
});

export { routes };
