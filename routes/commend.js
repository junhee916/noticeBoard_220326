const express = require('express')
const router = express.Router()
const commendModel = require('../models/commend')
const checkAuth = require('../middleware/check_auth')

// get commend
router.get('/:commendId', checkAuth, async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findById(id)
                                    .populate('user', ['email'])
                                    .populate('board', ['board'])
            if(!commend){
                return res.status(403).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendData : commend
                })
            }
        }
        else{
            res.status(402).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})
// save commend
router.post('/save/:boardId', checkAuth, async (req, res) => {
    const {commend} = req.body
    const newCommend = new commendModel({
        user : res.locals.user.id,
        board : req.params.boardId,
        commend
    })
    try{
        if(res.locals.user){
            await newCommend.save()
            res.status(200).json({
                msg : "save commend",
                commendData : commend
            })
        }
        else{
            res.status(402).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})
// update commend
router.post('/update/:commendId', checkAuth, async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                                commend : req.body.commend
                            }})
            if(!commend){
                return res.status(403).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})
// delete commend
router.post('/delete/:commendId', checkAuth, async (req,res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id)
            if(!commend){
                return res.status(403).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})
module.exports = router