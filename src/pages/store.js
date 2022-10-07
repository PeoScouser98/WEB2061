import { categories } from "../api/db";
import ProductCard from "../components/product-card";
import { $, $$ } from "../utils/common";
import { reRender } from "../utils/render";

const StorePage = {
	render() {
		const products = JSON.parse(localStorage.getItem("products"));
		return /* html */ `
            <div class="flex justify-start items-stretch gap-10 max-h-screen flex-grow h-full">
                <aside class="basis-1/4 h-screen border-r py-10 px-3">
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
                <section class="w-full max-h-4/5 overflow-y-auto mx-auto">
                <h1 class="text-heading text-center">Our Products</h1>
                    <div class="grid grid-cols-4 gap-x-5 gap-y-10 p-10 max-w-full mx-auto" id="products-list">
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

		const isValidResult = (ref, val) => {
			if (val.length < 3) return false;
			if (ref.toLowerCase().includes(val.toLowerCase())) return true;
		};
		// search product
		const searchForm = $("#search-form");
		if (searchForm) {
			searchForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const val = event.target["keyword"];
				const result = products.filter(
					(item) => isValidResult(item.name, val.value) || isValidResult(item.cateName, val.value),
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
