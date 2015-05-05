function debounce(func, delay) {
  var timeout;
  return function () {
    var self = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      func.apply(self, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}


function updateNavFromHash() {
  var docNav = document.querySelector('.documentation-nav');
  var hash = window.location.hash;
  
  if (!docNav) { return; }

  //remove existing active elements
  [].forEach.call(docNav.querySelectorAll('.active'), function (el) {
    el.classList.remove('active');
  });

  var el = docNav.querySelector('a[href="' + hash +'"]');
  if (el) {
    el.classList.add('active');
  }
}

function updateHash() {
    var scrollTop = window.scrollY;

    var links = document.querySelectorAll('.docs-content a[name]');
    var currentLink = links[0];

    for (var i=0, ii=links.length; i<ii; i++) {
      if (links[i].offsetTop <= scrollTop) {
        currentLink = links[i];
      } else {
        break;
      }
    }

    var newHash = currentLink && currentLink.getAttribute('name');
    if (newHash && '#' + newHash !== window.location.hash) {
      window.history.pushState(null, null, '#' + newHash);
      updateNavFromHash();
    }
}

document.addEventListener('DOMContentLoaded', function () {
  updateNavFromHash();
  document.addEventListener('scroll', debounce(updateHash, 20), false);
  window.addEventListener('hashchange', updateNavFromHash, false);
  setupEasterEgg();
});

function setupEasterEgg() {
  var q = document.querySelector('.easter-egg-question');
  var a = document.querySelector('.easter-egg-answer');

  if (!q || !a) return;

  var avatars = document.querySelectorAll('.avatar img');
  var questionAvatar = avatars[0];
  var answerAvatar = avatars[2];

  var running = false;

  questionAvatar.addEventListener('mouseenter', function () {
    if (!running) {
      console.log(questionAvatar.offsetTop, questionAvatar.offsetHeight, answerAvatar.offsetTop, answerAvatar.offsetHeight);
      q.style.left = (questionAvatar.offsetLeft + questionAvatar.offsetWidth * 0.5) + 'px';
      q.style.top = (questionAvatar.offsetTop + questionAvatar.offsetHeight * 0.6) + 'px';

      a.style.left = (answerAvatar.offsetLeft + answerAvatar.offsetWidth * 0.5) + 'px';
      a.style.top = (answerAvatar.offsetTop + answerAvatar.offsetHeight * 0.6) + 'px';
      running = true;
      typeEasterEgg(q, a);
    }
  }, false);
}

function typeEasterEgg(question, answer) {
  typeContents(question, function () {
    setTimeout(function () {
      typeContents(answer, function () {
      });
    }, 500);
  });
}

function typeContents(el, done) {
  var text = el.textContent;
  var p = 0;
  var target = el;
  if (target.querySelector('a')) {
    target = target.querySelector('a');
  }
  console.log(target);

  el.style.visibility = 'visible';
  blinkCursor(target, function () {
    var int = setInterval(function () {
      p++;
      target.textContent = text.slice(0, p) + "█";
      if (p >= text.length) {
        target.textContent = text;
        clearInterval(int);
        done();
      }
    }, 100);
  });
}

function blinkCursor(el, done) {
  var n = 5;
  el.textContent = "█";

  var int = setInterval(function () {
    if (n % 2) {
      el.style.color = "rgba(0,0,0,0)";
    } else {
      el.style.color = "";
    }
    n--;
    if (n <= 0) {
      el.style.color = "";
      clearInterval(int);
      done();
    }
  }, 300);
}
