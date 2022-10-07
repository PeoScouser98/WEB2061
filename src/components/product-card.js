import { categories } from "../api/db";
const ProductCard = {
	render(item) {
		const { name } = categories.find((cate) => cate.id == item.cate);
		return /* html */ `
            <div class="card bg-base-100 shadow-xl max-w-xs h-fit flex-grow ">
                <figure class="basis-1/2"><img src="${item.img}" alt="Movie" class="w-full h-[12rem] object-cover object-center"/></figure>
                <div class="card-body !p-5">
                    <h2 class="card-title">${item.name}</h2>
                    <p class="font-semibold text-accent">$${item.price}</p>
                    <p class="font-semibold text-zinc-400">${name}</p>
                    <p class="italic w-[-webkit-fill-available] truncate">${item.desc}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-accent gap-2 normal-case"><i class="bi bi-cart3"></i> Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
	},
};

export default ProductCard;
