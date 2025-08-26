/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Endpoints for grading submissions
 */

/**
 * @swagger
 * /api/submissions/{id}/grade:
 *   post:
 *     summary: Assign grade to a submission (instructor only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade assigned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Access denied
 *       500:
 *         description: Failed to assign grade
 */
