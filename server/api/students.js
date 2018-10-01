const express = require('express');
const router = express.Router();

const { Student } = require('../db').models;



router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(error => next(error))
});


router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.send(student))
    .catch(error => next(error))
});


router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(error => next(error))
});


router.put('/:id', (req, res, next) => {
  // console.log(req.body)
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(error => next(error))
})


router.delete('/:id', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.sendStatus(204))
  .catch(error => console.log(error))
});





module.exports = router;
