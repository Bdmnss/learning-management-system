import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAssignment = async (req, res) => {
  if (!req.user || req.user.role !== "instructor") {
    return res.status(403).json({ error: "Access denied" });
  }

  const courseId = parseInt(req.params.id);
  const { title, description, dueDate } = req.body;
  const instructorId = req.user.id;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course || course.createdById !== instructorId) {
      return res
        .status(403)
        .json({ error: "You can only add assignments to your own course" });
    }

    let finalDueDate;
    if (!isNaN(dueDate)) {
      const days = parseInt(dueDate);
      finalDueDate = new Date();
      finalDueDate.setDate(finalDueDate.getDate() + days);
    } else {
      finalDueDate = new Date(dueDate);
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: finalDueDate,
        courseId,
        instructorId,
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

export const getAssignmentsByCourse = async (req, res) => {
  const courseId = parseInt(req.params.id);

  try {
    const assignments = await prisma.assignment.findMany({
      where: { courseId },
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};
