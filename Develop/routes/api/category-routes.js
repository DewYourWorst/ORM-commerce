const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 Category.findAll({
  attributes: [
    'id',
    'category_name'
  ],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
    }
  ]
 })
 .then(Data => res.json(Data))
 .catch(err => {
  console.log(err);
  res.status(500).json(err);
 })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
  .then(Data => {
    if (!Data) {
      res.status(404).json({ message: 'No Category found with this id! '});
      return;
    }
    res.json(Data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(Data => res.json(Data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Category found with this id, so category name update could not be completed' });
        return;
      }
      res.json(Data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(Data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
