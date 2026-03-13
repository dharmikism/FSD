// Site interactivity: mobile nav toggle and simple contact form handling
document.addEventListener('DOMContentLoaded', function () {
	// set year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// mobile nav toggle
	const navToggle = document.getElementById('nav-toggle');
	const mainNav = document.getElementById('main-nav');
	if (navToggle && mainNav) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !expanded);
			mainNav.style.display = expanded ? '' : 'block';
		});
	}

	// contact form handling (client-side only)
	const form = document.getElementById('contact-form');
	const status = document.getElementById('form-status');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const data = new FormData(form);
			const name = data.get('name')?.toString().trim();
			const email = data.get('email')?.toString().trim();
			const message = data.get('message')?.toString().trim();

			if (!name || !email || !message) {
				if (status) status.textContent = 'Please fill in all fields.';
				return;
			}

			// simulate successful send
			if (status) status.textContent = 'Sending message...';
			setTimeout(() => {
				if (status) status.textContent = 'Thank you — we received your message.';
				form.reset();
			}, 800);
		});
	}
});