const express = require('express');
const router = express.Router();

const { School } = require('../db').models;



router.get('/', (req, res, next) => {
  School.findAll()
    .then(schools => res.send(schools))
    .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => res.send(school))
    .catch(error => next(error))
});

// router.post('/', (req, res, next) => {
//   School.create(req.body)
//     .then(school => res.status(201).send(school))
//     .catch(error => next(error))
// });

router.post('/', (req, res, next) => {
  School.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      description: req.body.description,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }
  })
  .then(result => res.status(201).send(result))
  .catch(error => next(error))
})

router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school))
    .catch(error => next(error));
})

router.delete('/:id', (req, res, next) => {
  School.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.sendStatus(204))
  .catch(error => next(error))
})



module.exports = router;
