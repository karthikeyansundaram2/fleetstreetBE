import express from 'express';
import Controller from '../controllers/leedController';

let router = express.Router();
router.post('/',Controller.leeds.post);
router.get('/',Controller.leeds.get);
module.exports = router;