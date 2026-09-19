import { Router } from 'express';
import {dsaProblem, promptProblem, systemProblem, vulnerabilityProblem} from '../controllers/optionControllers.js'
import {submit, verifyCoupon } from '../controllers/discountController.js';
const router = Router();



router.post('/solve-ptod', dsaProblem);
router.post('/write-prompt', promptProblem);
router.post('/vulnerability', vulnerabilityProblem);
router.post('/system-design ', systemProblem);
router.post('/submit', submit);
router.post('/validate', verifyCoupon);

export default router;
