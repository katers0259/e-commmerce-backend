const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findOne({
        where: {
          id: req.params.id
        },
        include: [ Product]
      }).then((response) => res.json(response))
  
    } catch (err) {
      res.status(400).json(err);
  
    }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryPostData = await Category.create({
      category_name : req.body.category_name,
    });
    res.status(200).json(categoryPostData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.findByPk(req.params.id);
    updateCategory.category_name = req.body.category_name;
    await updateCategory.save()
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err)
  }


});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deleteCategory) {
      res.status(400).json({ message: "No category by this ID"})
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
