import multer from "multer";
import path from "path";

const uploadDir = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadLectureFiles = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const videoTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/x-matroska",
      "video/quicktime",
      "video/avi",
      "video/x-msvideo",
    ];
    const attachmentTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (file.fieldname === "video" && videoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (
      file.fieldname === "attachment" &&
      attachmentTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type: ${file.mimetype} for field: ${file.fieldname}`
        ),
        false
      );
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "attachment", maxCount: 10 },
]);
