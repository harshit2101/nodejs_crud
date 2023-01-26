const express = require("express");
const router = express.Router();
const {getUsers,getUser,createUser,updateUser,deleteUser}= require('../controllers/users')

router.get("/", getUsers).post('/',createUser).get('/:id',getUser).patch('/:id',updateUser).delete('/:id',deleteUser);

module.exports = router;
