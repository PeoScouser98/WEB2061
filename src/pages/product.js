import * as filestack from "filestack-js";
import { $, $$ } from "../utils/common";
import filestackUpload from "../utils/filestack";
import { create, render } from "../utils/features";
import validation from "../utils/validate";
import { categories } from "../api/db";
import { generateID } from "../utils/features";

const ProductPage = {
	render() {
		return /* template */ `
		<div class="flex justify-center flex-grow items-stretch max-w-6xl mx-auto py-10">
			<form action="" id="create-product--form" class="flex flex-col gap-5 basis-1/2 border-r pr-5 h-[80vh] overflow-y-scroll">
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Product</label>
					<input type="text" class="input input-bordered" id="name" data-fieldname="Product's name"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Quantity</label>
					<input type="text" class="input input-bordered" id="qty" data-fieldname="Quantity"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Price</label>
					<input type="text" class="input input-bordered" id="price" data-fieldname="Price"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Category</label>
					<select name="" id="category" class="select select-bordered" data-fieldname="Category">
						<option value="">-- Select --</option>
						${categories.map((item) => /* html */ `<option value="${item.id}">${item.name}</option>`)}
					</select>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!-- image -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Image</label>
					<input type="button" id="upload-btn" class="btn w-fit normal-case hidden" value="Upload" />
					<div class="flex justify-center items-center max-w-[200px] h-[200px] border relative rounded-xl overflow-hidden">
						<label for="upload-btn" class="font-medium absolute top-0 left-0 right-0 h-full w-full opacity-50 text-center text-zinc-400 flex justify-center items-center hover:bg-zinc-800 hover:text-white hover:opacity-100 duration-300">Upload</label>
						<img  id="preview" class="text-white max-w-full w-full h-full object-cover object-center">
					</div>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Description</label>
					<textarea name="" cols="30" rows="10" id="desc" class="textarea textarea-bordered" data-fieldname="Description"></textarea>
					<small class="error-message text-error font-medium"></small>
				</div>

				<button type="submit" class="btn">Create New</button>
			</form>

		

			<div class="flex flex-col gap-1 basis-1/2 pl-5 h-full">
				<h2 class="font-medium italic text-center text-2xl">Products List</h2>
				<table class="table h-fit">
					<thead>
						<tr>
							<th>#</th>
							<th>Product's name</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>Out of stock</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody id="product-list">
						<!-- sản phẩm được render vào đây -->
					</tbody>
				</table>
			</div>
		</div>
        `;
	},
	handleEvents() {
		const products = JSON.parse(localStorage.getItem("products"));
		if (products && Array.isArray(products)) render(products);

		/* Thêm sản phẩm vào từ form */
		const uploadBtn = $("#upload-btn");
		if (uploadBtn)
			uploadBtn.addEventListener("click", () => {
				filestackUpload();
			});

		const createProductForm = $("#create-product--form");
		if (createProductForm) {
			createProductForm.addEventListener("submit", (event) => {
				event.preventDefault(); // chặn reload khi submit
				const name = $("#name");
				const qty = $("#qty");
				const price = $("#price");
				const cate = $("#category");
				const desc = $("#desc");

				const image = $("#preview");
				const message = image.parentElement.parentElement.querySelector(".error-message");

				// validate
				if (!validation.areRequired(name, qty, price, cate, desc) && image.src === "") {
					message.innerText = "Image is required";
					return;
				}

				const newProduct = {
					id: generateID(),
					name: name.value,
					qty: +qty.value,
					price: +price.value,
					cate: cate.value,
					img: image.src,
					desc: desc.value,
				};

				create(newProduct);
				createProductForm.reset();
				image.removeAttribute("src");
			});
		}
	},
};
export default ProductPage;
