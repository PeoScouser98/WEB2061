import { $, $$ } from "../utils/common";
import { remove } from "../utils/features";
const ProductItem = {
	render(item, index) {
		return /* html */ `
             <tr class="h-fit">
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>${item.cate}</td>
                  <td>
                     <input type="checkbox" disabled ${item.qty == 0 ? "checked" : ""}>
                  </td>
                  <td>
                    <button class="btn btn-ghost text-error remove-btn" data-id="${
						item.id
					}"><i class="bi bi-trash"></i></button>
                    <a href="/manage/product/edit/${item.id}" class="btn btn-ghost"><i class="bi bi-pencil"></i></a>
                  </td>
               </tr>
        `;
	},
	handleEvents() {
		const removeBtns = $$(".remove-btn");
		if (removeBtns && removeBtns.length != 0) {
			removeBtns.forEach((btn) =>
				btn.addEventListener("click", () => {
					remove(btn.dataset.id);
				}),
			);
		}
	},
};

export default ProductItem;
