// document.addEventListener('DOMContentLoaded', () => {
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
// });
// ------------------------------------- categoryList---------------------------

const categories = document.querySelectorAll('.category-item');
const subContainer = document.querySelector('.subcategories-container');

// Данные подкатегорий (можно загружать через AJAX)
const subcategoriesData = {
	'smartphones-gadgets': {
		smartphones: ['Apple iPhone 15', 'Samsung Galaxy S24', 'Xiaomi 14'],
		gadgets: ['Умные часы', 'Наушники', 'Фитнес-браслеты'],
	},
	// ... другие категории
};

// Функция для активации категории
function activateCategory(category) {
	categories.forEach(cat => cat.classList.remove('active'));
	category.classList.add('active');

	const categoryId = category.dataset.category;
	const subcategories = subcategoriesData[categoryId];

	if (!subcategories) return;

	let html = `<h4>${category.textContent.trim()}</h4><ul>`;
	subcategories.forEach(item => {
		html += `<li>${item}</li>`;
	});
	html += '</ul>';

	const rect = category.getBoundingClientRect();
	subContainer.style.top = `${rect.top}px`;

	subContainer.innerHTML = html;
	subContainer.classList.add('active');
}

// Назначаем обработчики клика
categories.forEach(category => {
	category.addEventListener('click', e => {
		e.stopPropagation();
		activateCategory(category);
	});
});

// Инициализируем первую активную категорию (например, "smartphones")
const initialCategory = document.querySelector('.category-item[data-category="smartphones"]');
if (initialCategory) {
	activateCategory(initialCategory);
}

// Закрытие при клике вне
document.addEventListener('click', () => {
	subContainer.classList.remove('active');
	categories.forEach(cat => cat.classList.remove('active'));
});

// Предотвращаем закрытие при клике внутри контейнера
subContainer.addEventListener('click', e => {
	e.stopPropagation();
});
