import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";
import { Score } from "@prisma/client";

const getScores = async () =>
  await prisma.score.findMany({
    take: 100,
    orderBy: [{ score: "desc" }, { player: "asc" }],
  });

const score = async (req: NextApiRequest, res: NextApiResponse) => {
  // GET
  if (req.method === "GET") {
    try {
      const result = await getScores();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(403).json({ err: "Failed to retrieve scores" });
    }
  }

  // POST
  if (req.method === "POST") {
    try {
      const { player, score }: Pick<Score, "player" | "score"> = JSON.parse(
        req.body
      );
      const result = await prisma.score.create({ data: { player, score } });
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(403).json({ err: "Failed to save score" });
    }
  }
};

export default score;
