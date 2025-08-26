/**
 * @swagger
 * tags:
 *   name: Lectures
 *   description: Endpoints for course lectures
 */

/**
 * @swagger
 * /api/courses/{id}/lectures:
 *   post:
 *     summary: Create a lecture (instructor only, own course)
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *               attachment:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Lecture created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       403:
 *         description: Access denied
 *       500:
 *         description: Lecture creation failed
 */

/**
 * @swagger
 * /api/courses/{id}/lectures:
 *   get:
 *     summary: Get all lectures for a course
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: List of lectures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: Failed to retrieve lectures
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lecture:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         courseId:
 *           type: integer
 *         instructorId:
 *           type: integer
 *         videoUrl:
 *           type: string
 *         attachments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attachment'
 *     Attachment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         filename:
 *           type: string
 *         url:
 *           type: string
 *         uploadedById:
 *           type: integer
 *         lectureId:
 *           type: integer
 */
