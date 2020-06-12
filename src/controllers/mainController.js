const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let inSale = products.filter(function(elemento) {
			return elemento.category == 'in-sale'
		});
		let visited = products.filter(function(elemento) {
			return elemento.category == 'visited'
		});
		res.render('index', {
			productosInsale: inSale,
			productosVisited: visited
		});
	},
	search: (req, res) => {
		res.send('ok')
	},
};

module.exports = controller;