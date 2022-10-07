import { $, $$ } from "../utils/common";
import filestackUpload from "../utils/filestack";
import { create, render, update } from "../utils/features";
import validation from "../utils/validate";
import { categories } from "../api/db";
import { generateID } from "../utils/features";

const EditProductPage = {
	render(id) {
		// console.log("product id: ", id);
		const products = JSON.parse(localStorage.getItem("products"));
		const currentProduct = products.find((item) => item.id == id);
		// const product
		return /* template */ `
		<h1 class="text-center text-3xl font-semibold my-10">Manage Products</h1>
		<div class="flex justify-center flex-grow max-w-6xl mx-auto">
			<form action="" id="edit-product--form" class="flex flex-col gap-5 basis-1/2 border-r pr-5">
                <input type="hidden" name="" value="${id}" id="product-id" disabled>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Products</label>
					<input type="text" class="input input-bordered" value="${
						currentProduct.name
					}" id="name" data-fieldname="Product's name"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Quantity</label>
					<input type="text" class="input input-bordered" value="${currentProduct.qty}" id="qty" data-fieldname="Quantity"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Price</label>
					<input type="text" class="input input-bordered" value="${currentProduct.price}" id="price" data-fieldname="Price"/>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Category</label>
					<select name="" id="category" class="select select-bordered" data-fieldname="Category">
						<option value="">-- Select --</option>
						${categories.map(
							(item) =>
								/* html */ `<option value="${item.id}" ${
									currentProduct.cate == item.id ? "selected" : ""
								}>${item.name}</option>`,
						)}
					</select>
					<small class="error-message text-error font-medium"></small>
				</div>
				<!-- image -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Image</label>
					<input type="button" id="upload-btn" class="btn w-fit normal-case hidden" value="Upload" />
					<div class="flex justify-center items-center max-w-[200px] h-[200px] border relative rounded-xl overflow-hidden">
						<label for="upload-btn" class="font-medium absolute top-0 left-0 right-0 h-full w-full opacity-0 text-center flex justify-center items-center hover:bg-zinc-800 hover:text-white hover:opacity-100 duration-300">Upload</label>
						<img  id="preview" src="${currentProduct.img}" class="text-white max-w-full w-full h-full object-cover object-center">
					</div>
					<small class="error-message text-error font-medium"></small>

				</div>
				<!--  -->
				<div class="form-control gap-1">
					<label class="font-medium italic" for="">Description</label>
					<textarea name="" cols="30" rows="10" id="desc" class="textarea textarea-bordered" data-fieldname="Description">
                        ${currentProduct.desc}
                    </textarea>
					<small class="error-message text-error font-medium"></small>
				</div>

				<button type="submit" class="btn normal-case">Update</button>
			</form>

			
		</div>
        `;
	},
	handleEvents() {
		/* Thêm sản phẩm vào từ form */
		const uploadBtn = $("#upload-btn");
		if (uploadBtn)
			uploadBtn.addEventListener("click", () => {
				filestackUpload();
			});

		const editProductForm = $("#edit-product--form");
		if (editProductForm) {
			editProductForm.addEventListener("submit", (event) => {
				event.preventDefault(); // chặn reload khi submit
				const id = $("#product-id");
				const name = $("#name");
				const qty = $("#qty");
				const price = $("#price");
				const cate = $("#category");
				const desc = $("#desc");
				const image = $("#preview");

				// validate
				if (!validation.areRequired(name, qty, price, cate, desc) && image.src === "") {
					const message = image.parentElement.parentElement.querySelector(".error-message");
					message.innerText = "Image is required";
					return;
				}

				const updatedProduct = {
					id: id.value,
					name: name.value,
					qty: +qty.value,
					price: +price.value,
					cate: cate.value,
					img: image.src,
					desc: desc.value,
				};
				console.log("updated product::", updatedProduct);
				update(updatedProduct);
				// editProductForm.reset();
				location.href = "/manage/product";
			});
		}
	},
};
export default EditProductPage;
