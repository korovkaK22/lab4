import express from 'express';
import {
  getDriversByCompany,
  createDriver,
  countDrivers,
} from 'src/web/controllers/api/driver';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management
 */

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Retrieve a list of drivers by company
 *     tags: [Drivers]
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id to filter drivers
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         required: false
 *         description: size of the page for pagination
 *       - in: query
 *         name: from
 *         schema:
 *           type: number
 *         required: false
 *         description: number of entities to skip
 *     responses:
 *       200:
 *         description: Retrieve list of drivers assigned to specific company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439011"
 *                   name:
 *                     type: string
 *                     example: "John"
 *                   surname:
 *                     type: string
 *                     example: "Doe"
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   drivingExperience:
 *                     type: integer
 *                     example: 5
 *                   companyId:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439011"
 *                   salary:
 *                     type: number
 *                     example: 50000
 *                   cars:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Car1", "Car2"]
 *       400:
 *         description: Bad request, company is not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company parameter is required."
 *                 status:
 *                   type: number
 *                   example: 400
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-04-01T13:20:50.052Z"
 *       404:
 *         description: Not found, company does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company not found."
 *                 status:
 *                   type: number
 *                   example: 404
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-04-01T13:20:50.052Z"
 */
router.get('/', getDriversByCompany);
/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a new driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     surname:
 *                       type: string
 *                       example: "Doe"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     drivingExperience:
 *                       type: integer
 *                       example: 5
 *                     companyId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     salary:
 *                       type: number
 *                       example: 50000
 *                     cars:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Car1", "Car2"]
 *     responses:
 *       201:
 *         description: Driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: "507f1f77bcf86cd799439011"
 *                  name:
 *                    type: string
 *                    example: "John"
 *                  surname:
 *                    type: string
 *                    example: "Doe"
 *                  age:
 *                    type: integer
 *                    example: 30
 *                  drivingExperience:
 *                    type: integer
 *                    example: 5
 *                  companyId:
 *                    type: string
 *                    example: "507f1f77bcf86cd799439011"
 *                  salary:
 *                    type: number
 *                    example: 50000
 *                  cars:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: ["Car1", "Car2"]
 *       400:
 *         description: Bad request, driver data is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "surname is not provided"
 *                 status:
 *                   type: number
 *                   example: 400
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-04-01T13:20:50.052Z"
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company not found"
 *                 status:
 *                   type: number
 *                   example: 404
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-04-01T13:20:50.052Z"
 */

router.post('/', createDriver);
/**
 * @swagger
 * /drivers/_counts:
 *   post:
 *     summary: Retrievs count of drivers by provided companies
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   companyIds:
 *                     type: string
 *                     example: "asd"
 *     responses:
 *       200:
 *         description: drivers counted successfully
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id1:
 *                    type: number
 *                    example: 5
 *                  id2:
 *                    type: number
 *                    example: 1
 */

router.post('/_counts', countDrivers);

export default router;
