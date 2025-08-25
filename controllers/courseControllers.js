import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const user = req.user;

  if (!user || (user.role !== "admin" && user.role !== "instructor")) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        createdById: user.id,
      },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Course creation failed" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve courses" });
  }
};

export const enrollCourse = async (req, res) => {
  const user = req.user;
  const courseId = parseInt(req.params.id);

  if (!user || user.role !== "student") {
    return res.status(403).json({ error: "Only students can enroll" });
  }

  try {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        students: {
          connect: { id: user.id },
        },
      },
    });
    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ error: "Enrollment failed" });
  }
};

export const getCourseById = async (req, res) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        students: true,
        createdBy: true,
        lectures: {
          include: {
            attachments: true,
          },
        },
      },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve course" });
  }
};
