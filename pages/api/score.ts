import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";

interface PostReq {
  player: string;
  score: number;
}

const postScore = async (data: PostReq) => await prisma.score.create({ data });

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
      const { player, score }: PostReq = JSON.parse(req.body);
      const result = await postScore({ player, score });
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(403).json({ err: "Failed to save score" });
    }
  }
};

export default score;
