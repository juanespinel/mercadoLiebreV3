const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products', {
			productos: products
		})
	},
	
	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = req.params.productId;
		for(let i = 0; i < products.length; i++) {
			if(products[i].id == idProducto) {
				res.render('detail', {
					producto: products[i],
					alert: null
				});
			};
		};
	},
	
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let nuevoProdcuto = {
			id: Number(products.length + 1),
			...req.body
		};
		products.push(nuevoProdcuto);
		let productosActualizados = JSON.stringify(products);
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productosActualizados);
		res.redirect('/products/detail/' + nuevoProdcuto.id)
	},
	
	// Update - Form to edit
	edit: (req, res) => {
		idProdcuto = req.params.productId;
		for(let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.productId) {
				res.render ('product-edit-form', {
					producto: products[i]
				})
			}
		}
	},
	// Update - Method to update
	update: (req, res) => {
		let prodcutoActualizado = {
			id: req.params.productId,
			...req.body
		};
		for(let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.productId) {
				products[i] = prodcutoActualizado;
				fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productosActualizados);
				res.redirect('/products/detail' + prodcutoActualizado.id, {
					alert: {
						Status: "success",
						message: "El producto a sido modificado"
					}
				})
			}
		}

				res.render ('product-edit-form', {
					producto: products[i]

		products.push(nuevoProdcuto);
		let productosActualizados = JSON.stringify(products);
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productosActualizados);
		res.redirect('/products/detail/' + nuevoProdcuto.id)
	},
	
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		for(let i = 0; i < products.length; i++) {
			if(products[i].id == req.params.productId) {
				
			}
		}
	}
};

module.exports = controller;