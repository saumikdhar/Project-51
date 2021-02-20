const express=require('express')
const router = express.Router();
const {getBusinessCase}=require('./../controllers/businessCase')
router.get('/getBusinessCase/:id',getBusinessCase)
module.exports = router;