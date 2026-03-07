// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     body {
//       margin: 0;
//       font-family: Arial, sans-serif;
//     }
    
//     .section {
//       min-height: 100vh;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 3rem;
//     }
    
//     .gallery {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//       gap: 20px;
//       padding: 20px;
//     }
    
//     img.lazy {
//       width: 100%;
//       height: 300px;
//       object-fit: cover;
//       background: #f0f0f0;
//     }
    
//     .fade-in {
//       opacity: 0;
//       transform: translateY(50px);
//       transition: all 0.6s ease;
//     }
    
//     .fade-in.visible {
//       opacity: 1;
//       transform: translateY(0);
//     }
    
//     #posts {
//       max-width: 800px;
//       margin: 0 auto;
//       padding: 20px;
//     }
    
//     .post {
//       padding: 20px;
//       margin: 20px 0;
//       background: #f9f9f9;
//       border-radius: 8px;
//     }
//   </style>
// </head>
// <body>
//   <h1 style="text-align: center; padding: 20px;">Intersection Observer Challenges</h1>
  
//   <!-- Challenge 1: Lazy Load Images -->
//   <section id="challenge1">
//     <h2>Challenge 1: Lazy Load Gallery</h2>
//     <div class="gallery">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=1" alt="Image 1">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=2" alt="Image 2">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=3" alt="Image 3">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=4" alt="Image 4">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=5" alt="Image 5">
//       <img class="lazy" data-src="https://picsum.photos/300/300?random=6" alt="Image 6">
//     </div>
//   </section>
  
//   <!-- Challenge 2: Fade In Sections -->
//   <section id="challenge2">
//     <h2>Challenge 2: Fade In Animation</h2>
//     <div class="fade-in">Section 1</div>
//     <div class="fade-in">Section 2</div>
//     <div class="fade-in">Section 3</div>
//   </section>
  
//   <!-- Challenge 3: Infinite Scroll -->
//   <section id="challenge3">
//     <h2>Challenge 3: Infinite Scroll</h2>
//     <div id="posts"></div>
//     <div id="sentinel"></div>
//     <div id="loading" style="text-align: center; display: none;">Loading...</div>
//   </section>
  
//   <script src="observer.js"></script>
// </body>
// </html>

// lazy load is a technique that defers loading of non-critical resources (like images) until they are needed, 
// which can improve page load times and performance. The Intersection Observer API is a powerful tool for implementing lazy loading by allowing 
// you to detect when an element enters the viewport.

// Challenge 1 — Lazy Load Images
// - Lazy load all images with class "lazy"
// - Load image 200px before it enters viewport
// - Add loading animation
// - Stop observing after image loads

// Your code here
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load the image
      img.classList.add('loading'); // Add loading animation class
        img.onload = () => {
            img.classList.remove('loading'); // Remove loading animation class
            observer.unobserve(img); // Stop observing after image loads
        }
    }
  });
}, {
  rootMargin: '0px 0px 200px 0px' // Load image 200px before it enters viewport
});
lazyImages.forEach(img => {
  imageObserver.observe(img);  // .observe is built-in method of IntersectionObserver that starts observing the target element (in this case, each lazy image)
});

// Challenge 2 — Fade In on Scroll
// - Fade in elements with class "fade-in"
// - Trigger when 30% of element is visible
// - Keep observing (fade in again when scrolled back up)

// Your code here
const fadeInElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add class to trigger fade-in animation
    } else {
      entry.target.classList.remove('visible'); // Remove class to allow fade-in again when scrolled back up
    }
  });
}, {
  threshold: 0.3 // Trigger when 30% of element is visible
});
fadeInElements.forEach(element => {
  fadeInObserver.observe(element);
});

// Challenge 3 — Infinite Scroll
// - Start with 5 posts in #posts div
// - When sentinel enters viewport, load 5 more
// - Show loading indicator while loading
// - Generate fake posts with numbers (Post 6, Post 7, etc.)
// - Stop when reaching 30 total posts

// Your code here
const postsContainer = document.getElementById('posts');
const sentinel = document.getElementById('sentinel');
const loadingIndicator = document.getElementById('loading');
let postCount = 5; // Start with 5 posts (already in HTML)

// Function to load more posts
function loadMorePosts() {
  if (postCount >= 30) return; // Stop when reaching 30 total posts
  loadingIndicator.style.display = 'block'; // Show loading indicator
  setTimeout(() => { // Simulate loading time
    for (let i = 0; i < 5; i++) {
      postCount++;
      const post = document.createElement('div');
      post.className = 'post';
      post.textContent = `Post ${postCount}`;
      postsContainer.appendChild(post);
    }
    loadingIndicator.style.display = 'none'; // Hide loading indicator
  }, 1000);
}
const infiniteScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMorePosts(); // Load more posts when sentinel enters viewport
    }
  });
});
infiniteScrollObserver.observe(sentinel); // Start observing the sentinel element


// Challenge 4 — Count Visible Items
// Create an observer that:
// - Counts how many .post elements are currently visible
// - Displays count in a fixed div at top of page
// - Updates in real-time as user scrolls

// Your code here
const countDisplay = document.createElement('div');
countDisplay.style.position = 'fixed';
countDisplay.style.top = '10px';
countDisplay.style.right = '10px';
countDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
countDisplay.style.color = 'white';
countDisplay.style.padding = '5px 10px';
countDisplay.style.borderRadius = '5px';
countDisplay.style.zIndex = '1000';
document.body.appendChild(countDisplay);
const visiblePosts = new Set();
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visiblePosts.add(entry.target);
    } else {
      visiblePosts.delete(entry.target);
    }
    countDisplay.textContent = `Visible Posts: ${visiblePosts.size}`;
  });
});
// Observe initial posts and set up mutation observer for new posts
function observePost(post) {
  countObserver.observe(post);
}
document.querySelectorAll('.post').forEach(observePost);
// Watch for new posts being added
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.classList && node.classList.contains('post')) {
        observePost(node);
      }
    });
  });
});
mutationObserver.observe(postsContainer, { childList: true });


// Challenge 5 — Reveal on Scroll (One Time)
// - Select all elements with class "reveal-once"
// - When element enters viewport (50% visible):
//   - Add "revealed" class
//   - Stop observing that element (only reveal once)
// - Add CSS for revealed state

// Your code here
const revealElements = document.querySelectorAll('.reveal-once');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // Stop observing after revealing once
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of element is visible
});
revealElements.forEach(element => {
  revealObserver.observe(element); // Start observing each reveal-once element
});


// Challenge 6 — Percentage Visible Tracker
// Create an observer for a specific element that:
// - Shows what percentage of element is currently visible
// - Updates a progress bar or text display
// - Uses multiple thresholds (0, 0.25, 0.5, 0.75, 1.0)

// Your code here
const percentageElement = document.getElementById('percentage-tracker');
const percentageDisplay = document.createElement('div');
percentageDisplay.style.position = 'fixed';
percentageDisplay.style.bottom = '10px';
percentageDisplay.style.left = '10px';
percentageDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
percentageDisplay.style.color = 'white';
percentageDisplay.style.padding = '5px 10px';
percentageDisplay.style.borderRadius = '5px';
percentageDisplay.style.zIndex = '1000';
document.body.appendChild(percentageDisplay);
const percentageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const percentageVisible = Math.round(entry.intersectionRatio * 100);
    percentageDisplay.textContent = `Visible: ${percentageVisible}%`; // Update percentage display
  });
}, {
  threshold: [0, 0.25, 0.5, 0.75, 1.0] // Use multiple thresholds
});
percentageObserver.observe(percentageElement); // Start observing the specific element

// Challenge 7 — Pause/Play Videos on Scroll
// - Find all <video> elements
// - Auto-play when 75% visible
// - Auto-pause when less than 75% visible
// - Mute videos by default

// Your code here
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.muted = true; // Mute videos by default
});
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.75) {
      entry.target.play(); // Auto-play when 75% visible
    } else {
      entry.target.pause(); // Auto-pause when less than 75% visible
    }
  });
}, {
  threshold: 0.75 // Trigger at 75% visibility
});
videos.forEach(video => {
  videoObserver.observe(video); // Start observing each video element
});
