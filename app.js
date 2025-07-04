const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
updateNavbarBackground();

themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateNavbarBackground();
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

const experience__innerCard = document.querySelectorAll('.experience__inner-card')
const experience__innerContent = document.querySelectorAll('.experience__inner-content')

experience__innerCard.forEach(card => {
	card.addEventListener('mouseenter', function() {
		experience__innerContent.forEach(content => {
			content.classList.remove('active');
		});
		
		const targetId = this.getAttribute('data-id');
		const targetContent = document.getElementById(targetId);
		if (targetContent) {
			targetContent.classList.add('active');
		}
		
		experience__innerCard.forEach(c => {
			c.classList.remove('active');
		});
		
		this.classList.add('active');
	});
});



const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 800,
	easing: 'easeInOutCubic',
	offset: function (anchor, toggle) {
		// Get navbar height and add some padding
		const navbar = document.querySelector('.navbar');
		const navbarHeight = navbar ? navbar.offsetHeight : 0;
		return navbarHeight + 20; // 20px additional padding
	}
});

const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
	const animatedElements = document.querySelectorAll('.about-card, .skill-item, .project-card, .experience__inner-card, .thoughts__inner-card');
	
	animatedElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
		observer.observe(el);
	});
});

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
}

window.addEventListener('scroll', updateNavbarBackground);

const sections = document.querySelectorAll('section, .main, .about, .skills, .projects, .experience, .thoughts, .contact');
const navLinks = document.querySelectorAll('.navbar__links[href^="#"]');

window.addEventListener('scroll', function() {
	let current = '';
	
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		
		if (window.scrollY >= (sectionTop - 200)) {
			current = section.getAttribute('id');
		}
	});
	
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
});

const style = document.createElement('style');
style.textContent = `
	.navbar__links.active {
		color: var(--primary-color) !important;
		background-color: var(--accent) !important;
	}
	
	.navbar__links.active::after {
		width: 100% !important;
	}
`;
document.head.appendChild(style);

document.querySelectorAll('.project-card').forEach(card => {
	card.addEventListener('click', function(e) {
		this.style.transform = 'translateY(-4px) scale(0.98)';
		setTimeout(() => {
			this.style.transform = '';
		}, 150);
	});
});

document.querySelectorAll('.contact-btn').forEach(btn => {
	btn.addEventListener('click', function(e) {
		const ripple = document.createElement('span');
		const rect = this.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;
		
		ripple.style.width = ripple.style.height = size + 'px';
		ripple.style.left = x + 'px';
		ripple.style.top = y + 'px';
		ripple.classList.add('ripple');
		
		this.appendChild(ripple);
		
		setTimeout(() => {
			ripple.remove();
		}, 600);
	});
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
	.contact-btn {
		position: relative;
		overflow: hidden;
	}
	
	.ripple {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		transform: scale(0);
		animation: ripple-animation 0.6s linear;
		pointer-events: none;
	}
	
	@keyframes ripple-animation {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.skill-item').forEach((item, index) => {
	item.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.about-card').forEach((card, index) => {
	card.style.animationDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.project-card').forEach((card, index) => {
	card.style.animationDelay = `${index * 0.15}s`;
});

document.querySelectorAll('img').forEach(img => {
	img.addEventListener('load', function() {
		this.style.opacity = '1';
	});
	
	img.addEventListener('error', function() {
		this.style.opacity = '0.5';
		this.style.filter = 'grayscale(100%)';
	});
});

const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
	img {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	
	img[src] {
		opacity: 1;
	}
`;
document.head.appendChild(loadingStyle);

const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: var(--primary-color);
	color: white;
	border: none;
	cursor: pointer;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s ease;
	z-index: 1000;
	box-shadow: var(--shadow-lg);
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
		// Use similar timing to match navbar scroll speed
		// Note: scrollTo doesn't support custom easing, but we can approximate the timing
	});
});

window.addEventListener('scroll', function() {
	if (window.scrollY > 300) {
		backToTopBtn.style.opacity = '1';
		backToTopBtn.style.visibility = 'visible';
	} else {
		backToTopBtn.style.opacity = '0';
		backToTopBtn.style.visibility = 'hidden';
	}
});

backToTopBtn.addEventListener('mouseenter', function() {
	this.style.transform = 'translateY(-2px)';
	this.style.background = 'var(--primary-dark)';
});

backToTopBtn.addEventListener('mouseleave', function() {
	this.style.transform = 'translateY(0)';
	this.style.background = 'var(--primary-color)';
});