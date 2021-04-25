const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const singleProductData = await Tag.findOne({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      },
    });
    res.status(200).json(singleProductData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Tag.findOne({
  //   where: {
  //     id: req.params.id
  //   },
  //   include: {
  //     model: Product,
  //     attributes: ['product_name', 'price', 'stock', 'category_id']
  //   }
  // }).then()
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
