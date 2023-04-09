import express from 'express';
import {celebrate} from 'celebrate'
import Correction from '../../../controllers/corrections';
import {
    isAuthenticated
} from '../../../middleware/auth';
import asyncHandler from '../../../helpers/errorsHandler/asyncHandler';
import {
    checkAdmin
} from '../../../middleware/isAdmin';
import {
    validate,
    validateParam,
    validateProductId
} from './corrections.validation'
import {
    checkCorrectionFound
} from '../../../middleware/checkItem';
// import theValidation from '../corrections/corrections.validation-rename'; //for using the class
import theValidation from '../corrections/corrections.validation-rename';

const corrections = new Correction();
const router = express.Router();

/**
 * retrieve and create corrections
 */
router
    .route('/')
    .post(
    //     celebrate({
    //     body: validate
    // }), 
    // theValidation.validate , 
    theValidation, 
    isAuthenticated, asyncHandler(checkAdmin), 
    asyncHandler(corrections.createcorrection))
    .get(asyncHandler(corrections.getcorrections))

/**
 * retrieve, delete and update correction
 */
router
    .route('/:correctionId')
    .all(asyncHandler(checkCorrectionFound))
    .get(asyncHandler(corrections.getOnecorrection))
    .delete(asyncHandler(corrections.deleteOnecorrection))
    .put(asyncHandler(corrections.updatecorrection))

/**
 * all products in a correction
 * add a product to a correction
 * remove product in a correction
 */
router
.route('/products/:correctionId')
.all(celebrate({ params: validateParam }))
.post(celebrate({ body: validateProductId }), asyncHandler(corrections.addProductToCorrection))
.delete(celebrate({ body: validateProductId }), asyncHandler(corrections.removeProductInCorrection))


export default router;