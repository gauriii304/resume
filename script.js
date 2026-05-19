// MOUSE FOLLOWER
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--y", `${e.clientY}px`);
});

// PROGRESS BAR
window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

// TYPEWRITER
const words = [
  "Plant Biology Student",
  "Research Enthusiast",
  "Exploring Biology + Data"
];

let i = 0;
let j = 0;
let current = "";

function type() {
  if (j < words[i].length) {
    current += words[i][j];
    document.getElementById("typewriter").textContent = current;
    j++;
    setTimeout(type, 80);
  } else {
    setTimeout(() => {
      current = "";
      j = 0;
      i = (i + 1) % words.length;
      type();
    }, 2000);
  }
}

type();

// PARTICLES
const container = document.querySelector('.particles');

for (let i = 0; i < 25; i++) {
  const p = document.createElement('span');
  p.classList.add('particle');

  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 10 + 's';

  container.appendChild(p);
}

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.innerHTML = links.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = current;
});

const popObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.pop-up').forEach(el => popObserver.observe(el));

document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

const BLOG_KEY = 'gauri_blog_posts';

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem(BLOG_KEY) || '[]');
  const grid = document.getElementById('blogGrid');
  const empty = document.getElementById('blogEmpty');
  grid.querySelectorAll('.blog-post').forEach(el => el.remove());
  if (posts.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  posts.forEach((post) => {
    const card = document.createElement('div');
    card.className = 'blog-post pop-up';
    const date = new Date(post.date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    card.innerHTML = `
      <div class="blog-post-meta">
        <span class="blog-post-date">${date}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;
    grid.appendChild(card);
    popObserver.observe(card);
  });
}

document.getElementById('blogForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('blogTitle').value.trim();
  const content = document.getElementById('blogContent').value.trim();
  if (!title || !content) return;
  const posts = JSON.parse(localStorage.getItem(BLOG_KEY) || '[]');
  posts.unshift({ title, content, date: new Date().toISOString() });
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  document.getElementById('blogTitle').value = '';
  document.getElementById('blogContent').value = '';
  loadPosts();
});

loadPosts();
