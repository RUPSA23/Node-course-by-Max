const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
   // console.log(title, imageUrl, price, description);
    // sequelize>>>>>>>>>>>>>>>>>>>
      // Product.create({
  // })
  req.user.createProduct({
    title: title,
    price: price,
    imageURL: imageUrl,
    description: description,
     // userId: req.user.id
  })
  .then(result => {
    console.log(result);
    return res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
  // sql>>>>>>>>>>>>>>>>>>>>>>
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  // .save()
  // .then(() => {
  //   res.redirect('/');
  // })
  // .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts({where: {id: prodId}})
  // Product.findByPk(prodId)
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      // console.log(
      //   product
      // );
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // {"title":"First book lalalal","price": 20,"description":"good fruit","imageURL": "http://wdwdewd.com"}
  Product.findByPk(prodId)
    .then(product => {
      // const product = {"title":"First book","price": 20,"description":"good fruit","imageURL": "http://wdwdewd.com"}
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageURL = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
  .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCTS');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};