// Fetch and render testimonials
fetch('./assets/json/testimoni.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('sliderWrapper');

    // Clear container first
    container.innerHTML = '';

    // Create cards twice for infinite loop effect
    for (let i = 0; i < 2; i++) {
      data.forEach(testimonial => {
        // Create star rating HTML
        const stars = '<i class="fa-solid fa-star"></i>'.repeat(testimonial.rating);

        // Create card HTML
        const card = `
          <div class="testimoni-card w-[300px] rounded-xl p-4  relative overflow-hidden" data-expanded="false">
            <p class="text-lg mb-2 font-semibold">${testimonial.name}</p>
            <div class="review-start flex items-center w-full gap-1 text-lg text-yellow-500">
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
    initializeReadMore();

    // Initialize viewport observer for auto-collapse
    initializeViewportObserver();

    // Initialize the slider animation
    initializeSlider(data.length);
  })
  .catch(error => {
    console.error('Error loading testimonials:', error);
  });

// Function to initialize read more buttons
function initializeReadMore() {
  const cards = document.querySelectorAll('.testimoni-card');

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
function initializeViewportObserver() {
  const cards = document.querySelectorAll('.testimoni-card');

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

// Function to initialize slider animation - REVERSED DIRECTION (Right to Left)
function initializeSlider(totalCards) {
  const sliderWrapper = document.getElementById('sliderWrapper');
  const sliderContainer = document.getElementById('testimoni-container');

  // Add null check
  if (!sliderWrapper || !sliderContainer) {
    console.error('Slider elements not found');
    return;
  }

  const cardWidth = 316; // 300px width + 16px margin (adjust based on your actual spacing)
  const totalWidth = cardWidth * totalCards; // Width of one complete set

  let scrollPosition = 0;
  let animationId;
  let isDragging = false;
  let startPos = 0;
  let prevTranslate = 0;
  let isHovered = false;
  const animationSpeed = 1;
  let initialX = 0;
  let initialY = 0;
  let isDraggingHorizontal = false;

  // Auto-scroll animation
  function animate() {
    if (!isDragging && !isHovered) {
      scrollPosition += animationSpeed; // DIUBAH: += untuk bergerak ke kanan

      // DIUBAH: Reset ke awal saat mencapai akhir
      if (scrollPosition >= totalWidth) {
        sliderWrapper.style.transition = 'none';
        scrollPosition = 0; // Reset ke awal
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
    isDraggingHorizontal = false;

    const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;

    startPos = clientX;
    initialX = clientX;
    initialY = clientY;
    prevTranslate = scrollPosition;
    sliderWrapper.style.transition = 'none';
  }

  function drag(e) {
    if (!isDragging) return;

    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;

    const diffX = Math.abs(currentX - initialX);
    const diffY = Math.abs(currentY - initialY);

    // Deteksi arah drag pada gerakan pertama
    if (!isDraggingHorizontal && (diffX > 5 || diffY > 5)) {
      isDraggingHorizontal = diffX > diffY;
    }

    // Hanya prevent default jika drag horizontal
    if (isDraggingHorizontal) {
      e.preventDefault();

      const diff = currentX - startPos;
      scrollPosition = prevTranslate - diff;

      // Keep within bounds with wrap-around
      if (scrollPosition < 0) {
        scrollPosition = totalWidth - 1;
      } else if (scrollPosition >= totalWidth * 2) {
        scrollPosition = totalWidth;
      }

      sliderWrapper.style.transform = `translateX(-${scrollPosition}px)`;
    }
  }

  function dragEnd() {
    isDragging = false;
    isDraggingHorizontal = false;
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