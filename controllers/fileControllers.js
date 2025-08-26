import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createFile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const file = req.file;
  const uploadedById = req.user.id;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const createdFile = await prisma.file.create({
      data: {
        filename: file.filename,
        url: file.path,
        uploadedById,
      },
    });
    res.status(201).json(createdFile);
  } catch (error) {
    res.status(500).json({ error: "Failed to create file" });
  }
};

export const getFilesById = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await prisma.file.findUnique({
      where: { id: Number(id) },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};
