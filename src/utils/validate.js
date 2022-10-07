// get name of each field

/* ========= Các rule thực hiện check các trường input =============*/
const validation = {
	getFieldName(formCtrl) {
		return formCtrl.dataset.fieldname;
	},
	showMessage(formCtrl, message, status) {
		const alert = {
			error: ["input-error", "select-error", "textarea-error"],
			success: ["input-success", "select-success", "textarea-success"],
			warning: ["input-warning", "select-success", "textarea-warning"],
		};
		const successMessage = formCtrl.parentElement.querySelector(".error-message");
		successMessage.innerHTML = message;

		formCtrl.classList.add(...alert[status]);
		for (const status in alert) {
			formCtrl.classList.remove(status);
		}
	},
	areRequired(...formControls) {
		let isntError = true;
		formControls.forEach((formCtrl) => {
			if (formCtrl.value.trim() != "") this.showMessage(formCtrl, "", "success");
			else {
				isntError = false;
				this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
			}
			formCtrl.oninput = () => {
				if (formCtrl.value.trim() != "") this.showMessage(formCtrl, "", "success");
				else {
					isntError = false;
					this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
				}
			};
			formCtrl.onblur = () => {
				if (formCtrl.value.trim() != "") this.showMessage(formCtrl, "", "success");
				else {
					isntError = false;
					this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
				}
			};
			formCtrl.onchange = () => {
				if (formCtrl.value.trim() != "") {
					this.showMessage(formCtrl, "", "success");
				} else {
					isntError = false;
					this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
				}
			};
		});
		return isntError;
	},

	isEmail(formCtrl) {
		let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		formCtrl.oninput = () => {
			regexEmail.test(formCtrl.value)
				? this.showMessage(formCtrl, "", "success")
				: this.showMessage(formCtrl, "Email is invalid", "error");
		};

		return regexEmail.test(formCtrl.value);
	},

	ckMatchingValue(formCtrl1, formCtrl2) {
		formCtrl1.oninput = () => {
			formCtrl1.value == formCtrl2.value
				? this.showMessage(formCtrl1, "")
				: this.showMessage(formCtrl1, `${this.getFieldName(formCtrl1)} is not matching !`, "error");
		};

		return formCtrl1.value == formCtrl2.value;
	},

	checkLength(formCtrl, minLength) {
		formCtrl.oninput = () => {
			formCtrl.value.length >= minLength
				? this.showMessage(formCtrl, "", "success")
				: this.showMessage(
						formCtrl,
						`${this.getFieldName(formCtrl)} must have ${minLength} characters`,
						"error",
				  );
		};

		return formCtrl.value.length >= minLength;
	},

	isValidPassword(formCtrl) {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g;
		formCtrl.oninput = () => {
			regex.test(formCtrl.value)
				? this.showMessage(formCtrl, "", "success")
				: this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is invalid!`, "error");
		};
		return regex.test(formCtrl.value);
	},

	isPhoneNumber(formCtrl) {
		formCtrl.oninput = () => {
			formCtrl.value == +formCtrl.value && formCtrl.value.length == 10
				? this.showMessage(formCtrl, "", "success")
				: this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is invalid`, "error");
		};

		return formCtrl.value == +formCtrl.value && formCtrl.value.length == 10;
	},

	allowedImgExt: /(\.png|\.jpg|\.jiff|\.webp|\.bmp|\.jpeg|\.avif)$/i,
	allowedAudioExt: /(\.mp3|\.flac|\.wav|\.ogg)$/i,

	isValidFile(formCtrl, allowedExtensions) {
		const filePath = formCtrl.value;
		allowedExtensions.test(filePath)
			? this.showMessage(formCtrl, "", "success")
			: this.showMessage(formCtrl, "File's extension is not allowed", "error");
		// Allowing file type
		formCtrl.onchange = () => {
			allowedExtensions.test(filePath)
				? this.showMessage(formCtrl, "", "success")
				: this.showMessage(formCtrl, "File's extension is not allowed", "error");
		};

		return allowedExtensions.test(filePath);
	},
};
export default validation;
