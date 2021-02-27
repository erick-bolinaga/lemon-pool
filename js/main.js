function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
}

function doScrolling(element, duration) {
	var startingY = window.pageYOffset;
  var elementY = getElementY(element);
  var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
	var diff = targetY - startingY;
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
  var start;

  if (!diff) return;

	window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);
    percent = easing(percent);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
let scrollerEl = document.querySelectorAll("[scroller]");
scrollerEl.forEach((el) => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    let _target = e.target;
    let targetEl = _target.getAttribute('href');
    doScrolling(targetEl, 1000);
  }, false);
});
let menuEl = document.querySelectorAll(".main-menu ul li a");
menuEl.forEach((el) => {
  el.addEventListener('click', function (e) {
    let _target = e.target;
    document.querySelector(".main-menu ul li a.active").classList.remove('active');
    _target.classList.add('active');
  }, false);
});
$(document).ready(function() {
  if ($(document).scrollTop() >= 100) {
    $(".page-header").addClass("fixed");
  } else {
    $(".page-header").removeClass("fixed");
  }
  $(document).scroll(function() {
    if ($(document).scrollTop() >= 100) {
      $(".page-header").addClass("fixed");
    } else {
      $(".page-header").removeClass("fixed");
    }
  });
});