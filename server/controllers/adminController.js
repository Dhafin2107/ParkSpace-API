const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')

createAdmin = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const data = {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword
    }

    if (!data) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Admin',
        })
    }

    const new_admin = new Admin(data)

    if (!new_admin) {
        return res.status(400).json({ success: false, error: err })
    }

    new_admin
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: new_admin._id,
                message: 'Admin created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Admin not created!',
            })
        })
}

adminLogin = async (req, res) => {  
    const admin = await Admin.findOne({username: req.body.username})
    if (admin == null){
        return res.status(400).json({ success: false, error: `Admin not found` })
    }
    try {
        if(await bcrypt.compare(req.body.password, admin.password)){
            res.status(200).json({ success: true, data: {
                name: admin.name,
                username: admin.username,
            }})
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
}

updateAdmin = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Admin.findOne({ _id: req.params.id }, (err, found_admin) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Admin not found!',
            })
        }
        found_admin.name = body.name
        found_admin.username = body.username
        found_admin.password = body.password
        found_admin
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Admin updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Admin not updated!',
                })
            })
    })
}

deleteAdmin = async (req, res) => {
    await Admin.findOneAndDelete({ _id: req.params.id }, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!results) {
            return res
                .status(404)
                .json({ success: false, error: `Admin not found` })
        }

        return res.status(200).json({ success: true, data: Admin })
    }).catch(err => console.log(err))
}

getAdminById = async (req, res) => {
    await Admin.findOne({ _id: req.params.id }, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: results })
    }).catch(err => console.log(err))
}

getAdmins = async (req, res) => {
    await Admin.find({}, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!results.length) {
            return res
                .status(404)
                .json({ success: false, error: `Admin not found` })
        }
        return res.status(200).json({ success: true, data: results })
    }).catch(err => console.log(err))
}

module.exports = {
    createAdmin,
    adminLogin,
    updateAdmin,
    deleteAdmin,
    getAdmins,
    getAdminById,
}