const buttons = document.querySelectorAll('.hover-btn');
const infoBox = document.querySelector('.info-box');
let activeContent = null;
let hideTimeout = null;

buttons.forEach(btn => {
	btn.addEventListener('mouseenter', () => {
		clearTimeout(hideTimeout);

		infoBox.classList.add('visible');

		if (activeContent) {
			activeContent.classList.remove('active');
		}

		const contentId = btn.dataset.content;
		const content = document.querySelector(`.content-item[data-item="${contentId}"]`);

		if (content) {
			content.classList.add('active');
			activeContent = content;
		}
	});

	btn.addEventListener('mouseleave', () => {
		hideTimeout = setTimeout(() => {
			if (!infoBox.matches(':hover')) {
				infoBox.classList.remove('visible');
				if (activeContent) {
					activeContent.classList.remove('active');
				}
			}
		}, 300);
	});
});

infoBox.addEventListener('mouseenter', () => {
	clearTimeout(hideTimeout);
});

infoBox.addEventListener('mouseleave', () => {
	infoBox.classList.remove('visible');
	if (activeContent) {
		activeContent.classList.remove('active');
	}
});
// ------------------------------------- categoryList---------------------------

const categories = document.querySelectorAll('.category-item');
const subContainer = document.querySelector('.subcategories-container');
const mainContainer = document.querySelector('.main-container');
const personContainer = document.querySelector('.person-container');

const subcategoriesData = {
	'smartphones-gadgets': {
		smartphones: [
			{ name: 'Apple iPhone 15', stock: 123 },
			{ name: 'Смартфоны ', stock: 227 },
			{ name: 'iPhone 16 ', stock: 120 },
			{ name: 'Складные ', stock: 30 },
			{ name: 'realme ', stock: 120 },
			{ name: 'Huawei Mate X6 ', stock: 100 },
			{ name: 'Кнопочные ', stock: 23 },
			{ name: 'Домашние ', stock: 17 },
			{ name: 'Samsung ', stock: 27 },
		],
		gadgets: [
			{ name: 'Смарт-часы', stock: 15 },
			{ name: 'Смарт-кольца ', stock: 34 },
			{ name: 'Наушники ', stock: 21 },
			{ name: 'Гарнитуры ', stock: 12 },
			{ name: 'Портативное аудио ', stock: 42 },
			{ name: 'Умные гаджеты ', stock: 46 },
			{ name: 'Очки VR ', stock: 49 },
			{ name: 'Для блогеров ', stock: 32 },
		],
	},
	laptops: {
		Ноутбуки: [{ name: 'Asus', stock: 123 }],
	},
	person: {
		Кому: [
			{ name: 'Для мужчин', stock: 123 },
			{ name: 'Для женщин', stock: 63 },
			{ name: 'Папе', stock: 120 },
			{ name: 'Сотрудникам ', stock: 30 },
			{ name: 'Мужу ', stock: 120 },
			{ name: 'Корпоративный ', stock: 100 },
		],
	},
};

// Функция для активации категории
function activateCategory(category) {
	categories.forEach(cat => cat.classList.remove('active'));
	category.classList.add('active');

	const categoryId = category.dataset.category;
	const subcategoriesGroup = subcategoriesData[categoryId];
	if (!subcategoriesGroup) return;

	let html = Object.entries(subcategoriesGroup)
		.map(([groupName, items]) => {
			return `
			<div class="subcategory-group">
				<h5 class="subcategory-title">${formatGroupTitle(groupName)}</h5>
				<ul class="subcategory-list">
					${items.map(item => `<li><a href="#">${item.name} <span class="stock">${item.stock}</span></a></li>`).join('')}
				</ul>
			</div>
		`;
		})
		.join('');

	const rect = category.getBoundingClientRect();
	let targetContainer;

	if (categoryId === 'person') {
		targetContainer = personContainer;
		personContainer.innerHTML = html;
		personContainer.style.top = `${rect.top}px`;
		personContainer.classList.add('active');
		mainContainer.classList.remove('active');
	} else {
		targetContainer = mainContainer;
		mainContainer.innerHTML = html;
		mainContainer.style.top = `${rect.top}px`;
		mainContainer.classList.add('active');
		personContainer.classList.remove('active');
	}
}

// Функция для форматирования названий групп (опционально — можно сделать перевод)
function formatGroupTitle(groupKey) {
	const titles = {
		smartphones: 'Смартфоны',
		gadgets: 'Гаджеты',
	};
	return titles[groupKey] || groupKey;
}

categories.forEach(category => {
	category.addEventListener('click', e => {
		e.stopPropagation();
		activateCategory(category);
	});
});

const initialCategories = [document.querySelector('.category-item[data-category="smartphones-gadgets"]'), document.querySelector('.category-item[data-category="person"]')];

initialCategories.forEach(category => {
	if (category) {
		activateCategory(category);
	}
});
// Закрытие при клике вне
// document.addEventListener('click', () => {
// 	subContainer.classList.remove('active');
// 	categories.forEach(cat => cat.classList.remove('active'));
// });
document.addEventListener('click', () => {
	mainContainer.classList.remove('active');
	personContainer.classList.remove('active');
	categories.forEach(cat => cat.classList.remove('active'));
});

subContainer.addEventListener('click', e => {
	e.stopPropagation();
});
// ------------------------------ header-scroll------------------------------
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
});

// -------------------- burger ------------------
document.addEventListener('DOMContentLoaded', function () {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav__wrapper');

	function closeMenu() {
		burger.classList.remove('burger--active');
		console.log('Меню закрыто');
	}

	burger.addEventListener('click', function (e) {
		e.stopPropagation();
		this.classList.toggle('burger--active');
		nav.classList.toggle('nav__wrapper--active');
	});

	document.addEventListener('click', closeMenu);
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeMenu();
	});
});
