document.addEventListener("DOMContentLoaded", function () {

  // slider 
  const slideContainers = document.querySelectorAll('.slide-container');
  const animationDuration = 50;

  slideContainers.forEach(container => {
    const items = container.querySelectorAll('.wrapper .item');
    const totalItems = items.length;

    items.forEach((item, i) => {
      const delay = (animationDuration / totalItems) * (totalItems - i) * -1;
      item.style.animationDelay = `${delay}s`;
    });
  });

  // Every brand has a list of images
  const brands = [
    {
      name: "BRAND ONE",
      class: "brand-1",
      images: [
        "./assets/images/brand1-col1.svg",
        "./assets/images/brand2-col1.svg",
        "./assets/images/brand3-col1.svg",
        "./assets/images/brand4-col1.svg",
        "./assets/images/brand5-col1.svg",
        "./assets/images/brand6-col1.svg",
        "./assets/images/brand7-col1.svg"
      ],
    },
    {
      name: "BRAND TWO",
      class: "brand-2",
      images: [
        "./assets/images/brand1-col2.svg",
        "./assets/images/brand2-col2.svg",
        "./assets/images/brand3-col2.svg",
        "./assets/images/brand4-col2.svg",
        "./assets/images/brand5-col2.svg",
        "./assets/images/brand6-col2.svg",
        "./assets/images/brand7-col2.svg"
      ],
    },
    {
      name: "BRAND THREE",
      class: "brand-3",
      images: [
        "./assets/images/brand1-col3.svg",
        "./assets/images/brand2-col3.svg",
        "./assets/images/brand3-col3.svg",
        "./assets/images/brand4-col3.svg",
        "./assets/images/brand5-col3.svg",
        "./assets/images/brand6-col3.svg",
        "./assets/images/brand7-col3.svg"
      ],
    },
    {
      name: "BRAND FOUR",
      class: "brand-4",
      images: [
        "./assets/images/brand1-col4.svg",
        "./assets/images/brand2-col4.svg",
        "./assets/images/brand3-col4.svg",
        "./assets/images/brand4-col4.svg",
        "./assets/images/brand5-col4.svg",
        "./assets/images/brand6-col4.svg",
        "./assets/images/brand7-col4.svg"
      ],
    },
  ];

  const container = document.getElementById("sliders");

  brands.forEach((brand) => {
    const column = document.createElement("div");
    column.className = "slider-column";

    const track = document.createElement("div");
    track.className = "slider-track";

    // Loop 2x agar animasi looping mulus (duplikasi)
    for (let i = 0; i < 2; i++) {
      brand.images.forEach((imgSrc) => {
        const card = document.createElement("div");
        card.className = `brand-card ${brand.class}`;

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = brand.name;
        img.className = "brand-img";

        card.appendChild(img);
        track.appendChild(card);
      });
    }

    column.appendChild(track);
    container.appendChild(column);
  });

  // path container 
  const steps = document.querySelectorAll('.step');
  const listItems = document.querySelectorAll('.we-do-links li');

  function activateStep(stepNum) {
    steps.forEach((s, index) => {
      if (index < stepNum) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    listItems.forEach(item => item.classList.remove('active'));
    listItems[stepNum - 1].classList.add('active');
  }

  // Click on li
  listItems.forEach(li => {
    li.addEventListener('click', () => {
      const stepNum = parseInt(li.getAttribute('data-step'));
      activateStep(stepNum);
    });
  });

  // Click on the step (round dot)
  steps.forEach(step => {
    step.addEventListener('click', () => {
      const stepNum = parseInt(step.getAttribute('data-step'));
      activateStep(stepNum);
    });
  });



});


