import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createLecture = async (req, res) => {
  if (!req.user || req.user.role !== "instructor") {
    return res.status(403).json({ error: "Access denied" });
  }

  const courseId = req.params.id;
  const { title, content } = req.body;
  const instructorId = req.user.id;

  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course || course.createdById !== instructorId) {
      return res
        .status(403)
        .json({ error: "You can only add lectures to your own courses" });
    }

    let videoUrl = null;
    if (req.files && req.files.video && req.files.video[0]) {
      videoUrl = req.files.video[0].path;
    }

    let attachmentIds = [];
    if (req.files && req.files.attachment && req.files.attachment.length > 0) {
      for (const file of req.files.attachment) {
        const createdAttachment = await prisma.attachment.create({
          data: {
            filename: file.filename,
            url: file.path,
            uploadedById: instructorId,
            lectureId: undefined,
          },
        });
        attachmentIds.push(createdAttachment.id);
      }
    }

    const lecture = await prisma.lecture.create({
      data: {
        title,
        content,
        courseId: Number(courseId),
        instructorId,
        videoUrl,
      },
    });

    if (attachmentIds.length > 0) {
      await prisma.attachment.updateMany({
        where: { id: { in: attachmentIds } },
        data: { lectureId: lecture.id },
      });
    }

    res.status(201).json(lecture);
  } catch (error) {
    console.error("Lecture creation error:", error);
    res
      .status(500)
      .json({ error: "Lecture creation failed", details: error.message });
  }
};

export const getLectures = async (req, res) => {
  const courseId = req.params.id;

  try {
    const lectures = await prisma.lecture.findMany({
      where: { courseId: Number(courseId) },
      include: {
        attachments: true,
      },
    });
    res.status(200).json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ error: "Failed to retrieve lectures" });
  }
};
