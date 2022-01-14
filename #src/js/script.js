document.addEventListener(
	"DOMContentLoaded",
	function () {
		// Слайдеры

		let mainSlider = new Swiper(".main-slider__container", {
			slidesPerView: 1,
			spaceBetween: 20,

			autoplay: {
				delay: 10000,
			},

			pagination: {
				el: ".main-slider__pagination",
				type: "progressbar",
			},

			navigation: {
				nextEl: ".main-slider__next",
				prevEl: ".main-slider__prev",
			},

			on: {
				init: function () {
					let slider = document.querySelector(".main-slider__container");
					if (slider !== null) {
						let sliderCurrent = slider.querySelectorAll(".main-slider__index-current");
						sliderCurrent.forEach((el) => {
							if (this.activeIndex + 1 < 10) {
								el.textContent = "0" + (this.activeIndex + 1);
							} else {
								el.textContent = this.activeIndex + 1;
							}
						});

						let sliderAll = slider.querySelectorAll(".main-slider__index-all");
						sliderAll.forEach((el) => {
							if (this.slides.length < 10) {
								el.textContent = "0" + this.slides.length;
							} else {
								el.textContent = this.slides.length;
							}
						});
					}
				},

				slideChange: function () {
					let slider = document.querySelector(".main-slider__container");
					if (slider !== null) {
						let sliderCurrent = slider.querySelectorAll(".main-slider__index-current");
						sliderCurrent.forEach((el) => {
							if (this.activeIndex + 1 < 10) {
								el.textContent = "0" + (this.activeIndex + 1);
							} else {
								el.textContent = this.activeIndex + 1;
							}
						});
					}
				},
			},
		});

		let sectionProduct = document.querySelector(".new-product");

		if (sectionProduct != null) {
			if (sectionProduct.classList.contains("authorized")) {
				let newProductSlider = new Swiper(".new-product__slider-container", {
					slidesPerView: 2,
					spaceBetween: 10,
					observer: true,
					observeParents: true,
					navigation: {
						nextEl: ".new-product__next",
						prevEl: ".new-product__prev",
					},
					breakpoints: {
						992: {
							slidesPerView: 3,
							spaceBetween: 20,
						},

						1300: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					},
				});
			} else {
				let newProductSlider = new Swiper(".new-product__slider-container", {
					slidesPerView: 2,
					spaceBetween: 10,
					observer: true,
					observeParents: true,
					navigation: {
						nextEl: ".new-product__next",
						prevEl: ".new-product__prev",
					},
					breakpoints: {
						768: {
							slidesPerView: 3,
							spaceBetween: 20,
						},

						992: {
							slidesPerView: 4,
							spaceBetween: 20,
						},

						1170: {
							slidesPerView: 5,
							spaceBetween: 20,
						},

						1560: {
							slidesPerView: 6,
							spaceBetween: 30,
						},
					},
				});
			}
		}

		let sliderReviews = new Swiper(".reviews-block__container", {
			slidesPerView: 1,
			spaceBetween: 20,

			navigation: {
				nextEl: ".reviews-block__next",
				prevEl: ".reviews-block__prev",
			},

			breakpoints: {
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
				},

				768: {
					slidesPerView: "auto",
					spaceBetween: 30,
				},
			},

			on: {
				beforeResize() {
					if (window.innerWidth >= 768) {
						sliderReviews.slides.css("width", "");
					}
				},
			},
		});

		let sliderIndividualBox = new Swiper(".individual-box__slider-container", {
			fadeEffect: { crossFade: true },
			speed: 1000,
			virtualTranslate: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: true,
			},
			slidersPerView: 1,
			effect: "fade",
		});

		let commonSlider = new Swiper(".common-slider__container", {
			slidesPerView: 2,
			spaceBetween: 10,

			navigation: {
				nextEl: ".common-slider__next",
				prevEl: ".common-slider__prev",
			},

			breakpoints: {
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},

				1300: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});

		let sliderProductSmall = new Swiper(".product-slider-small", {
			slidesPerView: 4,
			direction: "vertical",
			spaceBetween: 17,
		});

		let sliderProductBig = new Swiper(".product-slider-big", {
			slidesPerView: 1,
			direction: "vertical",
			spaceBetween: 17,
			thumbs: {
				swiper: sliderProductSmall,
			},
		});

		let dontForgetBuySlider = new Swiper(".dont-forget-buy__slider-cont", {
			slidesPerView: 2,
			spaceBetween: 10,

			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},

				1170: {
					slidesPerView: 4,
					spaceBetween: 20,
				},

				1300: {
					slidesPerView: 6,
					spaceBetween: 30,
				},
			},

			navigation: {
				nextEl: ".dont-forget-buy__next",
				prevEl: ".dont-forget-buy__prev",
			},
		});
	},
	false
);

$(document).ready(function () {
	// Клон элементов в мобильное меню

	$.each($(".js-mobile-menu > li"), function (index, val) {
		let clone = $(val).clone();
		$("#menu > ul").append(clone);
	});

	// Активация мобильного меню

	$("#menu").mmenu({
		extensions: ["pagedim-black", "position-left"],
		navbar: {
			title: "Меню",
		},
	});

	var $menu = $("#menu");
	var $icon = $(".mobile-menu");
	var API = $menu.data("mmenu");

	function openMenu() {
		API.open();
	}

	function closeMenu() {
		API.close();
	}

	API.bind("open:finish", function () {
		$icon.addClass("is-active");
		$("html").addClass("lock");
	});
	API.bind("close:finish", function () {
		$icon.removeClass("is-active");
		$("html").removeClass("lock");
	});

	let match = [window.matchMedia("(max-width: 1170px)")];

	// Открытие мобильного меню при клике на иконку
	function activeModileMenu() {
		if (match[0].matches) {
			$icon.on("click", openMenu);
		} else {
			$icon.off("click", openMenu);
			closeMenu();
		}
	}

	activeModileMenu();
	match[0].addListener(activeModileMenu);

	// Перенос меню для авторизованного пользователя
	$(window).on("load", function () {
		if ($(".header").hasClass("authorized")) {
			$(".mobile-menu").append($(".nav-menu"));
		}
	});

	// Перенос кнопок слайдера при загрузке страницы
	$(window).on("load", function () {
		$.each($(".new-product__tab-item "), function (index, val) {
			let elementId = $(val).attr("id");
			$(val).find(".new-product__button-wrap").attr("data-button-slider", elementId);
		});

		$.each($(".new-product__tab-button"), function (index, val) {
			if ($(val).hasClass("active")) {
				$(".new-product__arrows").append($($(val).attr("href")).find(".new-product__button-wrap"));
			}
		});
	});

	// Скрипт табов
	$(".js-tab").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).attr("href");

		$(this).parent().find(".js-tab").removeClass("active");

		$(elementId).parent().find(".js-tab-item").removeClass("active");

		$(this).addClass("active");

		$(elementId).addClass("active");

		if ($(this).hasClass("new-product__tab-button")) {
			let buttonid = $(".new-product__arrows").find(".new-product__button-wrap").attr("data-button-slider");
			let currentButton = $(".new-product__arrows").find(".new-product__button-wrap");

			$("#" + buttonid)
				.find(".new-product__slider-container")
				.append(currentButton);

			$(".new-product__arrows").append($(elementId).find(".new-product__button-wrap"));
		}
	});

	// Колесо продуктов
	$(".tab-disposal__button").hover(function () {
		if (!$(this).hasClass("active")) {
			$(this).parent().find(".tab-disposal__button").removeClass("active");

			$(this).addClass("active");

			let elementId = $(this).attr("data-disposal");

			$(elementId).parent().find(".tab-disposal__item").removeClass("active");

			$(elementId).addClass("active");
		}
	});

	// Устанавливаем текущее значение выбранных продуктов при загрузке страницы
	$(window).on("load", function () {
		$.each($(".add-product"), function (index, val) {
			$(val).find(".add-product__quantity-current").text($(val).attr("data-current-added"));
		});
	});

	// Скрипт выбора продуктов на странице "Собрать свою коробку"
	$(".js-add-product").on("click", function () {
		let maxAdd = parseInt($(this).parents(".add-product").attr("data-max-added"));
		let counter = parseInt($(this).parents(".add-product").attr("data-current-added"));

		if (!$(this).hasClass("added")) {
			if (maxAdd > counter) {
				$(this).addClass("added");
				$(this)
					.parents(".add-product")
					.attr("data-current-added", (counter += 1));

				$(this).parents(".add-product").find(".add-product__quantity-current").text(counter);
			}
		} else {
			$(this).removeClass("added");
			$(this)
				.parents(".add-product")
				.attr("data-current-added", (counter -= 1));

			$(this).parents(".add-product").find(".add-product__quantity-current").text(counter);
		}

		if (maxAdd <= counter) {
			$.each($(this).parent().find(".js-add-product"), function (index, val) {
				if (!$(val).hasClass("added")) {
					$(val).addClass("disabled");
				}
			});
		} else {
			$.each($(this).parent().find(".js-add-product"), function (index, val) {
				if ($(val).hasClass("disabled")) {
					$(val).removeClass("disabled");
				}
			});
		}
	});

	// Показать распроданные продукты
	$(".add-product__button-all").on("click", function (e) {
		e.preventDefault();
		let productSoldOut = $(this).parents(".add-product").find(".card-add-product.sold-out");
		if (productSoldOut.is(":hidden")) {
			productSoldOut.css({ display: "block" });
			$(this).text("Скрыть");
		} else {
			productSoldOut.css({ display: "none" });
			$(this).text("Проданные продукты");
		}
	});

	// Раскрытие фильтров каталога
	$(".js-filter-show").on("click", function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).next().slideUp();
		} else {
			$(this).addClass("active");
			$(this).next().slideDown();
		}
	});

	// Активация range в фильтрах, минимальное значение передается в атрибут data-min-value, максимальное data-max-value,
	//если data-fractional установлено 1 шаг будет целым числом, если 0 шаг дробное число
	$.each($(".filters-product__range-slider"), function (index, val) {
		let stepRange;
		$(val).attr("data-fractional") == "1" ? (stepRange = 0.01) : (stepRange = 1);
		$(val).slider({
			range: true,
			step: stepRange,
			min: parseInt($(val).parent().find(".filters-product__input.--one").attr("data-min-value")),
			max: parseInt($(val).parent().find(".filters-product__input.--two").attr("data-max-value")),
			values: [parseInt($(val).parent().find(".filters-product__input.--one").attr("data-min-value")), parseInt($(val).parent().find(".filters-product__input.--two").attr("data-max-value"))],
			slide: function (event, ui) {
				$(val).parent().find(".filters-product__input.--one").val(ui.values[0]);
				$(val).parent().find(".filters-product__input.--two").val(ui.values[1]);
			},
		});
		$(val).parent().find(".filters-product__input.--one").val($(val).slider("values", 0));
		$(val).parent().find(".filters-product__input.--two").val($(val).slider("values", 1));
	});

	$.each($(".common-slider"), function (index, val) {
		$(val).find(".common-slider__arrows").append($(val).find(".common-slider__button-wrap"));
	});

	// Раскрытие группы фильтров для мобилки
	function activeClickMobileFilter() {
		if (match[0].matches) {
			$(".filters__group-head").on("click", function () {
				$(this).next().slideToggle();
			});
		} else {
			$(".filters__group-head").off("click");
			$(".filters__group-head").next().removeAttr("style");
		}
	}

	activeClickMobileFilter();
	match[0].addListener(activeClickMobileFilter);

	// Перенос поиска для мобилок
	function moveSearch() {
		if (match[0].matches) {
			$(".catalog__column.--one").prepend($(".catalog__search"));
		} else {
			$(".catalog__column.--two").prepend($(".catalog__search"));
		}
	}

	moveSearch();
	match[0].addListener(moveSearch);

	// Активация плавающего блока отзывов
	var stickyElement;

	if ($(".reviews__row-all-rev").length > 0) {
		stickyElement = $(".reviews__row-all-rev").sticksy({ topSpacing: 10, listen: true }, true);
	}

	// Скрываем отзывы начиная с 3
	if ($(".reviews__list").find(".card-review").length < 3) {
		$(".reviews__button-wrap").css({ display: "none" });
	} else {
		$.each($(".reviews__list").find(".card-review"), function (index, val) {
			if (index > 2) {
				$(val).addClass("--hidden");
			}

			stickyElement[0].hardRefresh();
		});

		$(".reviews__view-all").on("click", function (e) {
			e.preventDefault();
			$.each($(".reviews__list").find(".card-review"), function (index, val) {
				if (index > 2) {
					if ($(val).hasClass("--hidden")) {
						$(val).slideDown();
						$(val).removeClass("--hidden");
						$(".reviews__view-all").text("скрыть");
					} else {
						$(val).slideUp();
						$(val).addClass("--hidden");
						$(".reviews__view-all").text("посмотреть все");
					}
				}
			});

			setTimeout(() => {
				stickyElement[0].hardRefresh();
			}, 500);
		});
	}

	// Плавающий блок корзины
	var stickyOrderResult;

	if ($(".order-result").length > 0) {
		stickyOrderResult = $(".order-result").sticksy({ topSpacing: 10, listen: true }, true);
	}

	$(".filters-product__check-wrap").mCustomScrollbar({
		theme: "my-theme-one",
	});

	$(".product__tab-item-wrap").mCustomScrollbar({
		theme: "my-theme-one",
	});

	// Чекбокс корзины
	$(".delivery-order__item").on("click", function () {
		if ($(this).find("input").is(":checked") === false) {
			$(this).find("input").prop("checked", true);
		}
	});

	$("select").niceSelect();

	// Показать скрыть пароль
	$("body").on("click", ".wrap-input__icon-pass", function () {
		let elInput = $(this).parent().find("input");

		if (elInput.attr("type") == "text") {
			elInput.attr("type", "password");
		} else {
			elInput.attr("type", "text");
		}
	});

	// ПЛАВНЫЙ ЯКОРЬ
	$(".js-anchor").click(function () {
		let target = $(this).attr("href");
		$("html, body").animate(
			{
				scrollTop: $(target).offset().top - 150,
			},
			800
		);
		return false;
	});

	// Показать, скрыть содержимое корбки в заказах
	$(".js-show-box").on("click", function () {
		let boxList = $(this).parents(".order-profile-basket__item").find(".js-box-list");

		if (boxList.hasClass("--hidden")) {
			boxList.slideDown();
			boxList.removeClass("--hidden");
			$(this).text("Скрыть содержимое коробки");
		} else {
			boxList.slideUp();
			boxList.addClass("--hidden");
			$(this).text("Посмотреть состав коробки");
		}
	});

	// Скрипт скрытия элементов
	$(".js-view-all").on("click", function (e) {
		e.preventDefault();

		let button = $(this);

		let textDown = $(this).attr("data-text-down");

		let textUp = $(this).attr("data-text-up");

		let arrEl = $(this).parents(".js-view-wrap").find(".js-view-item");

		$.each(arrEl, function (index, val) {
			if ($(val).hasClass("--hidden")) {
				if ($(val).is(":hidden")) {
					$(val).slideDown();
					button.text(textDown);
				} else {
					$(val).slideUp();
					button.text(textUp);
				}
			}
		});
	});

	//Рейтинг

	$(".wrap-input__rating .rating__item").on("click", function () {
		$(".wrap-input__rating .rating__item").removeClass("added");

		for (let i = $(this).index(); i <= 4; i++) {
			$(".wrap-input__rating .rating__item").eq(i).addClass("added");
		}
	});

	//Попапы
	$(".js-show-popup a").on("click", function (e) {
		e.preventDefault();
		$(".modal").fadeOut();

		$(".popup-overlay").fadeIn();
		$($(this).attr("href")).fadeIn();
		$($(this).attr("href")).css({ "max-height": $(window).height() });
	});

	$(".js-modal-close").on("click", function (e) {
		$(this).parents(".modal").fadeOut();
		$(".popup-overlay").fadeOut();
	});

	$(".popup-overlay").on("click", function (e) {
		$(".modal").fadeOut();
		$(this).fadeOut();
	});

	//===============ANIMATION SCROLL======================
	const animItems = $(".anim-items");

	if (animItems.length > 0) {
		$(window).on("scroll", animOnScroll);
		function animOnScroll() {
			$.each(animItems, function (index, val) {
				const animItem = animItems.eq(index);
				const animItemHeight = animItem.innerHeight();
				const animItemOffset = animItem.offset().top;
				const animStart = 10; // начало анимации при достижении скролом 1/10 части элемента

				let animItemPoint = $(window).height() - animItemHeight / animStart;

				if (animItemHeight > $(window).height()) {
					animItemPoint = $(window).height() - $(window).height() / animStart;
				}

				if ($(window).scrollTop() > animItemOffset - animItemPoint && $(window).scrollTop() < animItemOffset + animItemHeight) {
					animItem.addClass("animate");
				} else {
					if (!animItem.hasClass("anim-no-scrollTop")) {
						animItem.removeClass("animate");
					}
				}
			});
		}
		setTimeout(animOnScroll, 0);
	}
});
