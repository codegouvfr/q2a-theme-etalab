/*
	File:           js/etalab-core.js
	Version:        Etalab 0.1
	Description:    JavaScript helpers for Etalab theme (forked from Snow theme)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.
*/
$(document).ready(function () {

	/**
	 * Account menu box toggle script
	 */
	$('#qam-account-toggle').click(function (e) {
		e.stopPropagation();
		closeMenuToggle();
		closeSearchToggle();
		if ($(this).attr("aria-expanded") == "false") {
			$('.qam-account-items').slideToggle(100);
			$(this).attr("aria-expanded", "true");
			$(this).toggleClass('current');
		}
		else
			closeAccountToggle();
	});

	/**
	 * Main navigation toggle script
	 */
	$('.qam-menu-toggle').click(function (e) {
		e.stopPropagation();
		closeAccountToggle();
		closeSearchToggle();
		if ($(this).attr("aria-expanded") == "false") {
			$('.qa-nav-main').removeAttr('hidden');
			$(this).attr("aria-expanded", "true");
			$(this).toggleClass('current');
		}
		else
			closeMenuToggle();
  });

  	/**
	 * Search box toggle script
	 */
	$('.qam-search-toggle').click(function (e) {
		e.stopPropagation();
		closeAccountToggle();
		closeMenuToggle();
		if ($(this).attr("aria-expanded") == "false") {
			$('#qam-search').removeAttr('hidden');
			$(this).attr("aria-expanded", "true");
			$(this).toggleClass('current');
		}
		else
			closeSearchToggle();
	});

	/**
	 * Close menu(s) when user click anywhere else
	 */
	$(document).click(function () {
		closeAccountToggle();
		closeMenuToggle();
		closeSearchToggle();
	});

	function closeAccountToggle() {
		$('.qam-account-items:visible').slideUp(100);
		$('#qam-account-toggle').attr("aria-expanded", "false");
		$('#qam-account-toggle.current').removeClass('current');
	}

	function closeMenuToggle() {
		$('#qa-nav-main').attr('hidden', 'hidden');
		$('.qam-menu-toggle').attr("aria-expanded", "false");
		$('.qam-menu-toggle.current').removeClass('current');
	}

	function closeSearchToggle() {
		$('#qam-search').attr('hidden', 'hidden');
		$('.qam-search-toggle').attr("aria-expanded", "false");
		$('.qam-search-toggle.current').removeClass('current');
	}

	$('.qam-account-items').click(function (event) {
		event.stopPropagation();
	});

	$('.qa-nav-main').click(function (event) {
		event.stopPropagation();
	});
});
