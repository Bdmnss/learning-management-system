import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSubmission = async (req, res) => {
  if (!req.user || req.user.role !== "student") {
    return res
      .status(403)
      .json({ error: "Only students can submit assignments" });
  }

  const assignmentId = parseInt(req.params.id);
  const studentId = req.user.id;
  const file = req.file;

  try {
    let createdFile = null;
    if (file) {
      createdFile = await prisma.file.create({
        data: {
          filename: file.filename,
          url: file.path,
          uploadedById: studentId,
        },
      });
    }

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId,
        fileId: createdFile ? createdFile.id : null,
        submittedAt: new Date(),
      },
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit assignment" });
  }
};

export const getSubmissionsByAssignment = async (req, res) => {
  if (!req.user || req.user.role !== "instructor") {
    return res.status(403).json({ error: "Access denied" });
  }

  const assignmentId = parseInt(req.params.id);

  try {
    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      include: { file: true, student: true },
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
