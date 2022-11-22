const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

const experience__innerCard = document.querySelectorAll('.experience__inner-card')
const experience__innerContent = document.querySelectorAll('.experience__inner-content')

for(var i = 0; i < experience__innerCard.length; i++){
	experience__innerCard[i].addEventListener('mouseover', function() {
		for(var i = 0; i < experience__innerContent.length; i++){
			experience__innerContent[i].className = 'experience__inner-content'
		}
		document.getElementById(this.dataset.id).className = 'experience__inner-content active'
		
		for(var i = 0; i < experience__innerCard.length; i++){
			experience__innerCard[i].className = 'experience__inner-card'
		}
		this.className = 'experience__inner-card active'
	})
}

const thoughts__innerCard = document.querySelectorAll('.thoughts__inner-card')
const thoughts__innerContent = document.querySelectorAll('.thoughts__inner-content')

for(var i = 0; i < thoughts__innerCard.length; i++){
	thoughts__innerCard[i].addEventListener('mouseover', function() {
		for(var i = 0; i < thoughts__innerContent.length; i++){
			thoughts__innerContent[i].className = 'thoughts__inner-content'
		}
		document.getElementById(this.dataset.id).className = 'thoughts__inner-content active'
		
		for(var i = 0; i < thoughts__innerCard.length; i++){
			thoughts__innerCard[i].className = 'thoughts__inner-card'
		}
		this.className = 'thoughts__inner-card active'
	})
}


// Option 3 - Smooth Scroll - https://github.com/cferdinandi/smooth-scroll
const scroll = new SmoothScroll('.navbar a[href*="#"]', {
	speed: 700
});