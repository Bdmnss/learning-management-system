import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const assignGrade = async (req, res) => {
  if (!req.user || req.user.role !== "instructor") {
    return res.status(403).json({ error: "Access denied" });
  }

  const submissionId = parseInt(req.params.id);
  const { grade } = req.body;

  try {
    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { grade },
    });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign grade" });
  }
};
