/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: Assignment submissions endpoints
 */

/**
 * @swagger
 * /api/assignments/{id}/submit:
 *   post:
 *     summary: Submit assignment (student only)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               assignment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Submission created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Only students can submit assignments
 *       400:
 *         description: No file uploaded
 */

/**
 * @swagger
 * /api/assignments/{id}/submissions:
 *   get:
 *     summary: Get all submissions for an assignment (instructor only)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Submission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         assignmentId:
 *           type: integer
 *         studentId:
 *           type: integer
 *         fileId:
 *           type: integer
 *         submittedAt:
 *           type: string
 *           format: date-time
 *         grade:
 *           type: number
 *         file:
 *           type: object
 *         student:
 *          type: object
 */
