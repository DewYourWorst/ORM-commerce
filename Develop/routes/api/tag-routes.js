const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        as: 'product_tags',
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
  .then(Data => res.json(Data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'tag_name'
    ],
    include: [
      {
        model: Product,
        as: 'product_tags',
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
  .then(Data => {
    if (!Data) {
      res.status(404).json({ message: 'No Tag found with this id! '});
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
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(Data => res.json(Data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'There was no tag for this item, your action could not be completed.' });
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
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Tag found with this id' });
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
