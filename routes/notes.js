const express = require('express')
const Note = require('../models/notes')
const router = express.Router()



let notes = []
router.use('/',(req,res,next) =>{
    console.log('notes route visited');
    next()
    
})

router.post('/',async(req,res) => {
    try {
        const {title, content} = req.body
        const note = new Note({title,content})
        await note.save()
        res.send('note created successfully')
        
    } catch (error) {
        res.status(501).json({message:'server error', error:error.message})
    }
})


router.get('/',async(req,res) =>{
try {
        const notes = await Note
    
        res.send(notes)
        // console.log(req);
} catch (error) {
        res.status(501).json({message:'server error', error:error.message})
    }
})



router.put('/:id', (req,res) => {
    const {id}= req.params
    // console.log(req.params);
    const noteIndex = notes.findIndex(note => note.id == id)

    if(noteIndex < 0){
        res.status(404).send('Note not found')
    }

    notes[noteIndex] = {...notes[noteIndex], ...req.body}
 res.send(notes[noteIndex])
})

router.delete('/:id' ,(req,res)=>{
    const {id} = req.params
    notes = notes.filter(note => note.id != id)
    res.send(`note with id ${id} has been deleted successfully`)
})


module.exports = router