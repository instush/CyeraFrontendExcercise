import { Request, Response, NextFunction } from "express";

const getRandomErrorChance = (): number => {
  return Number.parseFloat(process.env.RANDOM_ERRORS_CHANCE ?? "0.5");
};

export const randomErrorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const randomErrorChance = getRandomErrorChance();
  if (
    process.env.ENVIRONMENT === "production" &&
    Math.random() <= randomErrorChance
  ) {
    const statusCode = Math.random() < 0.5 ? 500 : 400;
    res.status(statusCode).json({ error: `Random ${statusCode} error` });
  } else {
    next();
  }
};
