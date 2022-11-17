const express = require('express')

const AdminController = require('../controllers/adminController')

const router = express.Router()

router.post('/admin', AdminController.createAdmin)
router.post('/admin/login', AdminController.adminLogin)
router.put('/admin/:id', AdminController.updateAdmin)
router.delete('/admin/:id', AdminController.deleteAdmin)
router.get('/admin/:id', AdminController.getAdminById)
router.get('/admins', AdminController.getAdmins)

module.exports = router