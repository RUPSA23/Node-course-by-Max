// const db = require('../util/database');
// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
// // sql..................
//   save() {
//      return db.execute('INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)',
//     [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static deleteById(id) {

//     }

//   static fetchAll() {
//    return db.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
// }
// };
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Product;