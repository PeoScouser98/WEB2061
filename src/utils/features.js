import ProductItem from "../components/product-item";
import toast from "../components/toast";
import { $, $$ } from "./common";

export const generateID = () => {
	return Date.now();
};

// render
export const render = (data) => {
	console.log(data);
	const product = $("#product-list");
	// kiểm tra data render ra có phải là mảng
	if (product && Array.isArray(data)) console.log(data);
	product.innerHTML = data
		.map((item, index) => {
			return ProductItem.render(item, index);
		})
		.join("");
	ProductItem.handleEvents();
};

// create new product
export const create = (data) => {
	// lấy mảng sản phẩm trong localstorage
	const product = JSON.parse(localStorage.getItem("products"));
	product.push(data); // thêm sản phẩm mới vào mảng
	localStorage.setItem("products", JSON.stringify(product)); // lưu lại vào localstorage
	render(product);
	toast("success", "Create new product!");
};

// delete product
export const remove = (productId) => {
	let product = JSON.parse(localStorage.getItem("products"));
	product = product.filter((item) => item.id != productId);
	render(product);
	localStorage.setItem("products", JSON.stringify(product)); // lưu lại vào localstorage
};

export const update = (data) => {
	const products = JSON.parse(localStorage.getItem("products"));
	const afterUpdated = products.map((item) => (item.id == data.id ? data : item));
	console.log("after updated::", afterUpdated);
	localStorage.setItem("products", JSON.stringify(afterUpdated));
	toast("success", "Updated product successfully!");
};
