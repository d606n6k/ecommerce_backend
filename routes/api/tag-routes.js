const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag, as: 'tags_for_products' }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const singleProductData = await Tag.findOne({
      include: [{ model: Product, through: ProductTag, as: 'tags_for_products'}],
    });
    res.status(200).json(singleProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
try {
  const postTag = await Tag.create(req.body, {
    where: {
      id: req.params.id
    },
  });
  if(!postTag){
    res.status(404).json({Message: "The tag you are looking for is in another castle!"});
  }
  res.status(200).json(postTag);
} catch (err) {
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try {
  const tagUpdate = await Tag.update(req.body, {
    where: {
      id: req.params.id
    },
    
  });
  if(!tagUpdate){
    res.status(404).json({Message: "The tag ID you are trying to update does not exist!"});
  }
  res.status(200).json(tagUpdate);
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try {
  const tagDelete = await Tag.destroy({
    where: {
      id: req.params.id
    },
  });
  if(!tagDelete){
    res.status(404).json({Message: "The tag id you are trying to delete does not exist!"});
  }
  res.status(200).json(tagDelete);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
