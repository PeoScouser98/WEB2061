import { categories } from "../api/db";
import ProductCard from "../components/product-card";
import { $, $$ } from "../utils/common";
import { reRender } from "../utils/render";

const StorePage = {
	render() {
		const products = JSON.parse(localStorage.getItem("products"));
		return /* html */ `
            <div class="flex justify-start items-stretch gap-10 max-h-screen flex-grow h-full">
                <aside class="basis-1/4 h-full border-r py-10 px-3">
                    <form action="" class="flex items-center w-full border rounded-lg mb-5" id="search-form">
                        <label for="" class="btn btn-square btn-ghost hover:bg-transparent"><i class="bi bi-search"></i></label>
                        <input type="text" name="keyword" class="input focus:outline-none flex-1" placeholder="Search ...">
                    </form>
                    <ul class="menu">
                        ${categories
							.map(
								(cate) =>
									/* html */ `<li class="cate-filter" data-cate="${cate.id}"><a>${cate.name}</a></li>`,
							)
							.join("")}
                    </ul>
                </aside>
                <section class="w-full mx-auto">
                <h1 class="text-heading text-center">Our Products</h1>
                    <div class="flex justify-around items-stretch flex-wrap gap-x-5 gap-y-10 p-10 max-w-full mx-auto" id="products-list">
                        ${products.map((item) => ProductCard.render(item)).join("")}
                    </div>
                </section>
            </div>
        `;
	},
	handleEvents() {
		let products = JSON.parse(localStorage.getItem("products"));
		products = products.map((item) => {
			const { name } = categories.find((cate) => cate.id == item.cate);
			return { cateName: name, ...item };
		});
		// filter products by category
		const cateFilters = $$(".cate-filter");
		if (cateFilters) {
			cateFilters.forEach((item) =>
				item.addEventListener("click", () => {
					const cateId = item.dataset.cate;
					const productsByCate = products.filter((item) => item.cate == cateId);
					const content =
						productsByCate.length != 0
							? productsByCate.map((item) => ProductCard.render(item)).join("")
							: /* html */ `<h2 class="text-2xl font-semibold">No result! </h2>`;
					reRender("#products-list", content);
				}),
			);
		}
		// search product
		const searchForm = $("#search-form");
		if (searchForm) {
			searchForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const val = event.target["keyword"];
				const result = products.filter(
					(item) =>
						item.name.toLowerCase().includes(val.value.toLowerCase()) ||
						item.cateName.toLowerCase().includes(val.value.toLowerCase()),
				);
				const content =
					result.length != 0
						? result.map((item) => ProductCard.render(item)).join("")
						: /* html */ `<h2 class="text-2xl font-semibold">No result! </h2>`;
				reRender("#products-list", content);
			});
		}
	},
};

export default StorePage;
