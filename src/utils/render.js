import { $ } from "./common";

export const renderPage = (page, id) => {
	const app = $("#app");
	if (app) app.innerHTML = page.render(id);
	if (page.handleEvents) page.handleEvents();
};

export const renderPageContent = (selector, pageContent, id) => {
	const container = $(selector);
	if (container) container.innerHTML = pageContent.render(id);
	if (pageContent.handleEvents) pageContent.handleEvents();
};

export const reRender = (selector, content) => {
	const container = $(selector);
	if (container) container.innerHTML = content;
};
