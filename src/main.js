import "./index.css";
import Navigo from "navigo";
import { renderPage, renderPageContent } from "./utils/render";
// import page and layout
import MainLayout from "./layout/main";
import HomePage from "./pages/home";
import ProductPage from "./pages/product";
import StorePage from "./pages/store";
import EditProductPage from "./pages/product-edit";

const router = new Navigo("/", { linksSelector: "a" });

document.addEventListener("DOMContentLoaded", () => {
	router.hooks({
		before: (done) => {
			const products = localStorage.getItem("products");
			if (!products) localStorage.setItem("products", JSON.stringify([]));
			renderPage(MainLayout);
			done();
		},
	});
	router.on({
		"/": () => {
			renderPageContent("#main", HomePage);
		},
		"/manage/product": () => {
			renderPageContent("#main", ProductPage);
			// ProductPage.handleEvents();
		},
		"/manage/product/edit/:id": ({ data }) => {
			console.log(data);
			renderPageContent("#main", EditProductPage, +data.id);
			// ProductPage.handleEvents();
		},
		"/store": () => {
			renderPageContent("#main", StorePage);
		},
	});
	router.resolve();
});
