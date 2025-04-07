const express = require('express')

const router = express.Router()



let notes = []
router.use('/',(req,res,next) =>{
    console.log('notes route visited');
    next()
    
})

router.post('/',(req,res) => {
    const note = {id:Date.now(), ...req.body}
    notes.push(note)
    res.send(`a note with id: ${note.id} was created`)
})


router.get('/',(req,res) =>{
    res.send(notes)
    // console.log(req);
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