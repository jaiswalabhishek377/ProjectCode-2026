Lazy loading images (performance boost!)
Infinite scroll
Animate elements on scroll
Track user engagement
Performance optimization

PC51 — Intersection Observer & Lazy Loading
This is one of the MOST useful browser APIs! Every modern website uses it for performance, animations, and UX. Master this and you'll immediately level up your web dev game! 💪

1. The Problem — Old Way Was Terrible
Old Way (Scroll Event Hell) ❌
javascript// ❌ BAD: Fires hundreds of times per second!
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    
    // Check if element is in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('visible');
    }
  });
});

// Problems:
//  Fires on EVERY pixel scrolled
//  Forces layout reflow (getBoundingClientRect)
//  Kills performance with many elements
//  Battery drain on mobile
New Way (Intersection Observer) ✅
javascript// ✅ GOOD: Fires only when element enters/exits viewport!
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Benefits:
// ✅ Fires only on intersection changes
// ✅ No layout thrashing
// ✅ Runs off main thread
// ✅ Battery-friendly
// ✅ Built-in threshold control

2. Intersection Observer Basics
Simple Setup
javascript// Step 1: Create observer with callback
const observer = new IntersectionObserver((entries) => {
  // This callback runs when intersection changes
  
  entries.forEach(entry => {
    console.log('Element:', entry.target);
    console.log('Is intersecting?', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
  });
});

// Step 2: Observe elements
const element = document.querySelector('.my-element');
observer.observe(element);

// Step 3: Stop observing when done (optional)
observer.unobserve(element);

// Step 4: Disconnect all (cleanup)
observer.disconnect();
Entry Object Properties
javascriptconst observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(entry.target);           // The observed element
    console.log(entry.isIntersecting);   // true/false — is it visible?
    console.log(entry.intersectionRatio); // 0 to 1 — how much is visible?
    console.log(entry.boundingClientRect); // Element's position
    console.log(entry.intersectionRect);  // Visible portion
    console.log(entry.rootBounds);        // Viewport dimensions
    console.log(entry.time);              // Timestamp
  });
});

3. Options — Fine-Tune Detection
javascriptconst options = {
  root: null,         // null = viewport, or specify container element
  rootMargin: '0px',  // Margin around root (like CSS margin)
  threshold: 0.5      // Trigger when 50% visible
};

const observer = new IntersectionObserver(callback, options);
Threshold Examples
javascript// Trigger when element enters viewport (any pixel visible)
threshold: 0

// Trigger when element is 50% visible
threshold: 0.5

// Trigger when element is fully visible
threshold: 1.0

// Multiple thresholds (trigger at each point)
threshold: [0, 0.25, 0.5, 0.75, 1.0]
Root Margin Examples
javascript// Trigger 200px BEFORE element enters viewport
rootMargin: '200px'

// Trigger 100px AFTER element enters viewport  
rootMargin: '-100px'

// Different margins per side (top, right, bottom, left)
rootMargin: '0px 0px -100px 0px' // Bottom margin -100px

// Practical: Load images before user sees them
rootMargin: '0px 0px 300px 0px' // Load 300px before bottom of viewport

4. Lazy Loading Images — The #1 Use Case
Basic Lazy Load
html<img 
  data-src="image.jpg" 
  class="lazy" 
  alt="Description"
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E"
>
javascriptconst lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Load the real image
      img.src = img.dataset.src;
      
      // Remove lazy class
      img.classList.remove('lazy');
      
      // Stop observing this image
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '0px 0px 200px 0px' // Load 200px before visible
});

// Observe all lazy images
lazyImages.forEach(img => imageObserver.observe(img));
With Loading State
javascriptconst imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // Show loading state
      img.classList.add('loading');
      // Load image
      img.src = img.dataset.src;
      // When loaded, remove loading state
      img.addEventListener('load', () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      });
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
cssimg.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

img.loading {
  opacity: 0.5;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

img.loaded {
  opacity: 1;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
Lazy Load Background Images
html<div class="hero lazy-bg" data-bg="hero-image.jpg"></div>
javascriptconst lazyBackgrounds = document.querySelectorAll('.lazy-bg');

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.style.backgroundImage = `url('${element.dataset.bg}')`;
      element.classList.remove('lazy-bg');
      bgObserver.unobserve(element);
    }
  });
});

lazyBackgrounds.forEach(el => bgObserver.observe(el));

5. Infinite Scroll
html<div id="posts-container">
  <div class="post">Post 1</div>
  <div class="post">Post 2</div>
  <div class="post">Post 3</div>
  <!-- More posts... -->
</div>
<div id="sentinel"></div> <!-- Trigger element -->
<div id="loading" style="display: none;">Loading...</div>
javascriptlet currentPage = 1;
let loading = false;

const sentinel = document.getElementById('sentinel');
const postsContainer = document.getElementById('posts-container');
const loadingDiv = document.getElementById('loading');

const sentinelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !loading) {
      loadMorePosts();
    }
  });
}, {
  rootMargin: '200px' // Load before sentinel is visible
});

sentinelObserver.observe(sentinel);

async function loadMorePosts() {
  loading = true;
  loadingDiv.style.display = 'block';
  
  try {
    // Fetch more posts
    const response = await fetch(`/api/posts?page=${currentPage}`);
    const posts = await response.json();
    
    // Add posts to DOM
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.textContent = post.title;
      postsContainer.appendChild(postElement);
    });
    
    currentPage++;
    
  } catch (error) {
    console.error('Failed to load posts:', error);
  } finally {
    loading = false;
    loadingDiv.style.display = 'none';
  }
}

6. Animate on Scroll
Fade In on Scroll
html<div class="fade-in">Content 1</div>
<div class="fade-in">Content 2</div>
<div class="fade-in">Content 3</div>
css.fade-in {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
javascriptconst fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after animation
      // fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 // Trigger when 20% visible
});

fadeElements.forEach(el => fadeObserver.observe(el));
Slide In from Different Directions
html<div class="slide-left">Slides from left</div>
<div class="slide-right">Slides from right</div>
<div class="slide-up">Slides from bottom</div>
css.slide-left, .slide-right, .slide-up {
  opacity: 0;
  transition: all 0.6s ease;
}

.slide-left {
  transform: translateX(-100px);
}

.slide-right {
  transform: translateX(100px);
}

.slide-up {
  transform: translateY(100px);
}

.slide-left.visible,
.slide-right.visible,
.slide-up.visible {
  opacity: 1;
  transform: translate(0, 0);
}
javascriptconst slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up');

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

slideElements.forEach(el => slideObserver.observe(el));

7. Staggered Animations
html<div class="container">
  <div class="card" data-delay="0">Card 1</div>
  <div class="card" data-delay="100">Card 2</div>
  <div class="card" data-delay="200">Card 3</div>
  <div class="card" data-delay="300">Card 4</div>
</div>
css.card {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.card.visible {
  opacity: 1;
  transform: scale(1);
}
javascriptconst cards = document.querySelectorAll('.card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      
      cardObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

cards.forEach(card => cardObserver.observe(card));

8. Progress Indicator Based on Scroll
html<div id="progress-bar"></div>
<article id="article">
  <!-- Long content -->
</article>
css#progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background: linear-gradient(to right, #4CAF50, #2196F3);
  width: 0%;
  transition: width 0.1s;
  z-index: 1000;
}
javascriptconst article = document.getElementById('article');
const progressBar = document.getElementById('progress-bar');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Calculate how much of article is visible
    const progress = entry.intersectionRatio * 100;
    progressBar.style.width = `${progress}%`;
  });
}, {
  threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0, 0.01, 0.02, ..., 1.0
});

progressObserver.observe(article);

9. Pause Video When Out of View
html<video id="video" src="video.mp4" controls></video>
javascriptconst video = document.getElementById('video');

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.5 // Play when 50% visible
});

videoObserver.observe(video);

10. Track User Engagement (Analytics)
javascriptconst contentSections = document.querySelectorAll('section[data-analytics]');

const analyticsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.dataset.analytics;
      
      // Track view
      console.log(`User viewed: ${sectionName}`);
      
      // Send to analytics
      // gtag('event', 'section_view', { section: sectionName });
      
      // Stop tracking after first view
      analyticsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.75 // Consider "viewed" when 75% visible
});

contentSections.forEach(section => analyticsObserver.observe(section));

11. Sticky Header Appearance
html<header id="header">My Site</header>
<div id="sentinel-top"></div>
<main>
  <!-- Content -->
</main>
css#header {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  transform: translateY(-100%);
  transition: transform 0.3s;
}

#header.visible {
  transform: translateY(0);
}
javascriptconst header = document.getElementById('header');
const sentinel = document.getElementById('sentinel-top');

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Show header when sentinel is NOT visible (scrolled past)
    if (!entry.isIntersecting) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  });
});

headerObserver.observe(sentinel);
