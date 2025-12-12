


// Fetch and render testimonials
fetch('./assets/json/testimoni2.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('sliderWrapper2');

    // Clear container first
    container.innerHTML = '';

    function generateStarsHTML(rating) {
      const maxStars = 5;
      let starsHTML = "";

      for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
          starsHTML += `<i class="fa-solid fa-star text-yellow-500"></i>`; // bintang penuh
        } else {
          starsHTML += `<i class="fa-solid fa-star text-gray-300"></i>`; 
        }
      }

      return starsHTML;
    }



    // Create cards twice for infinite loop effect
    for (let i = 0; i < 2; i++) {
      data.forEach(testimonial => {
        // Create star rating HTML

        const stars = generateStarsHTML(testimonial.rating);

        // Create card HTML
        const card = `
          <div class="testimoni-card2 w-[300px] rounded-xl p-4  relative overflow-hidden" data-expanded="false">
            <p class="text-lg mb-2 font-semibold">${testimonial.name}</p>
            <div class="review-start flex items-center w-full gap-1">
              ${stars}
            </div>
            <div class="text-wrapper">
              <p class="opacity-80 mt-4 testimonial-text">${testimonial.text}</p>
            </div>
            <button class="read-more-btn mt-4 text-gray-700 hover:text-blue-800 font-medium text-sm transition-colors">
              Read More
            </button>
          </div>
        `;

        // Insert card into container
        container.insertAdjacentHTML('beforeend', card);
      });
    }

    // Initialize read more functionality after all cards are rendered
    initializeReadMore2();

    // Initialize viewport observer for auto-collapse
    initializeViewportObserver2();

    // Initialize the slider animation
    initializeSlider2(data.length);
  })
  .catch(error => {
    console.error('Error loading testimonials:', error);
  });

// Function to initialize read more buttons
function initializeReadMore2() {
  const cards = document.querySelectorAll('.testimoni-card2');

  cards.forEach(card => {
    const wrapper = card.querySelector('.text-wrapper');
    const text = card.querySelector('.testimonial-text');
    const btn = card.querySelector('.read-more-btn');

    // Check if text overflows
    if (text.scrollHeight > wrapper.clientHeight) {
      // Show button for long text
      btn.style.display = 'block';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const isExpanded = card.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
          card.setAttribute('data-expanded', 'false');
          btn.textContent = 'Read More';
        } else {
          card.setAttribute('data-expanded', 'true');
          btn.textContent = 'Read Less';
        }
      });
    } else {
      // Hide button and remove max-height for short text
      btn.style.display = 'none';
      wrapper.style.maxHeight = 'none';
    }
  });
}

// Function to observe cards and auto-collapse when out of viewport
function initializeViewportObserver2() {
  const cards = document.querySelectorAll('.testimoni-card2');

  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const btn = card.querySelector('.read-more-btn');

      // If card is NOT in viewport and is expanded, collapse it
      if (!entry.isIntersecting) {
        const isExpanded = card.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
          card.setAttribute('data-expanded', 'false');
          btn.textContent = 'Read More';
        }
      }
    });
  }, {
    // Trigger when card is completely out of view
    threshold: 0,
    // Add some margin to trigger slightly before/after leaving viewport
    rootMargin: '0px'
  });

  // Observe all cards
  cards.forEach(card => {
    observer.observe(card);
  });
}

// Function to initialize slider animation
function initializeSlider2(totalCards) {
  const sliderWrapper = document.getElementById('sliderWrapper2');
  const sliderContainer = document.getElementById('testimoni-container2');

  // Add null check
  if (!sliderWrapper || !sliderContainer) {
    console.error('Slider elements not found');
    return;
  }

  const cardWidth = 316; // 300px width + 16px margin (adjust based on your actual spacing)
  const totalWidth = cardWidth * totalCards; // Width of one complete set

  let scrollPosition = totalWidth; // Mulai dari akhir, bukan 0
  let animationId;
  let isDragging = false;
  let startPos = 0;
  let prevTranslate = 0;
  let isHovered = false;
  const animationSpeed = 1;

  // Auto-scroll animation
  function animate() {
    if (!isDragging && !isHovered) {
      scrollPosition -= animationSpeed; // Ganti += menjadi -=

      // Reset ke akhir saat mencapai awal
      if (scrollPosition <= 0) { // Ganti >= menjadi <=
        sliderWrapper.style.transition = 'none';
        scrollPosition = totalWidth; // Reset ke akhir
        sliderWrapper.style.transform = `translateX(-${scrollPosition}px)`;

        setTimeout(() => {
          sliderWrapper.style.transition = 'transform 0.5s linear';
        }, 10);
      } else {
        sliderWrapper.style.transform = `translateX(-${scrollPosition}px)`;
      }
    }
    animationId = requestAnimationFrame(animate);
  }

  // Drag functionality
  function dragStart(e) {
    isDragging = true;
    startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    prevTranslate = scrollPosition;
    sliderWrapper.style.transition = 'none';
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentPosition - startPos;

    scrollPosition = prevTranslate - diff;

    // Keep within bounds with wrap-around
    if (scrollPosition < 0) {
      scrollPosition = totalWidth;
    } else if (scrollPosition > totalWidth * 2) { // Ganti >= menjadi >
      scrollPosition = totalWidth;
    }

    sliderWrapper.style.transform = `translateX(-${scrollPosition}px)`;
  }

  function dragEnd() {
    isDragging = false;
    sliderWrapper.style.transition = 'transform 0.3s ease';
  }

  // Event listeners
  sliderContainer.addEventListener('mousedown', dragStart);
  sliderContainer.addEventListener('mousemove', drag);
  sliderContainer.addEventListener('mouseup', dragEnd);
  sliderContainer.addEventListener('mouseleave', dragEnd);

  // Touch events
  sliderContainer.addEventListener('touchstart', dragStart);
  sliderContainer.addEventListener('touchmove', drag);
  sliderContainer.addEventListener('touchend', dragEnd);

  // Pause on hover
  sliderContainer.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  sliderContainer.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Start animation
  animate();
}