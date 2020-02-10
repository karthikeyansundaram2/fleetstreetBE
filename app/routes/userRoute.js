import express from 'express';
import Controller from '../controllers/UserController';

let router = express.Router();
router.post('/',Controller.register.post)
router.post('/login',Controller.login.post)
module.exports = router;