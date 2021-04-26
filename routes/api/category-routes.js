const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const singleCatId = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ]
    })
    res.status(200).json(singleCatId);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if(!catUpdate){
      res.status(404).json({Message: "The category ID you tried updating does not exist!"});
    }
    res.status(200).json(catUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catDelete = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if(!catDelete){
      res.status(404).json({Message: "The category ID you tried deleting does not exist!"});
    }
    res.status(200).json(catDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
