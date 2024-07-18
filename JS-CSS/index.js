document.addEventListener('DOMContentLoaded', function() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const contents = document.querySelectorAll('.content');
    let currentIndex = 0;
    const scrollThreshold = 200;

    function showContent(index) {
        contents.forEach((content, i) => {
            content.classList.remove('active', 'next');
            if (i === index) {
                content.classList.add('active');
            } else if (i === (index + 1) % contents.length) {
                content.classList.add('next');
            }
        });
    }

    let scrollAccumulator = 0;

    contentWrapper.addEventListener('wheel', function(event) {
        event.preventDefault();
        scrollAccumulator += event.deltaY;

        if (Math.abs(scrollAccumulator) >= scrollThreshold) {
            if (scrollAccumulator > 0) {
                currentIndex = (currentIndex + 1) % contents.length;
            } else {
                currentIndex = (currentIndex - 1 + contents.length) % contents.length;
            }
            showContent(currentIndex);
            scrollAccumulator = 0;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const resourcesItems = document.querySelectorAll('.resources-item');
    
    resourcesItems.forEach(item => {
        const originalSpan = item.querySelector('.original');
        const originalText = originalSpan.textContent;
        const newSpan = item.querySelector('.new');
        const fx = new TextScramble(originalSpan);
        
        item.addEventListener('mouseenter', () => {
            fx.setText(newSpan.textContent);
        });
        
        item.addEventListener('mouseleave', () => {
            fx.setText(originalText);
        });
    });
});




class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({
        from,
        to,
        start,
        end
      });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from,
        to,
        start,
        end,
        char
      } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }

        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}



//scholarship
document.addEventListener('DOMContentLoaded', function() {
  let currentIndex = 0;
  const scholarshipBoxes = document.querySelectorAll('.scholarship-box');
  const container = document.querySelector('.scholarship-container');

  console.log('Number of scholarship boxes found:', scholarshipBoxes.length);
  
  if (scholarshipBoxes.length > 0) {
      console.log('First scholarship box:', scholarshipBoxes[0]);
  } else {
      console.error('No scholarship boxes found!');
  }

  function focusScholarship(index) {
      console.log('Focusing scholarship at index:', index);
      scholarshipBoxes.forEach((box, i) => {
          if (i === index) {
              box.classList.add('focused');
              box.scrollIntoView({ behavior: 'smooth', block: 'center' });
              console.log('Added focused class to:', box);
          } else {
              box.classList.remove('focused');
          }
      });
  }

  function handleWheel(event) {
      event.preventDefault();
      if (event.deltaY > 0 && currentIndex < scholarshipBoxes.length - 1) {
          currentIndex++;
      } else if (event.deltaY < 0 && currentIndex > 0) {
          currentIndex--;
      }
      focusScholarship(currentIndex);
  }

  function throttle(func, limit) {
      let inThrottle;
      return function() {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
              func.apply(context, args);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
          }
      }
  }

  if (container) {
      container.addEventListener('wheel', throttle(handleWheel, 300));
  } else {
      console.error('Scholarship container not found!');
  }

  // Focus the first scholarship box on page load
  if (scholarshipBoxes.length > 0) {
      console.log('Focusing first scholarship box');
      focusScholarship(0);
      // Force a reflow to ensure the focus is applied
      scholarshipBoxes[0].offsetHeight;
  } else {
      console.warn('No scholarship boxes to focus');
  }
});
// Add console logs for debugging
function openModal(event, modalId) {
  event.preventDefault();
  event.stopPropagation();
  console.log('Attempting to open modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    console.log('Modal opened');
  } else {
    console.error('Modal not found:', modalId);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired');
  const scholarshipBoxes = document.querySelectorAll('.scholarship-box');
  console.log('Number of scholarship boxes found:', scholarshipBoxes.length);
  
  scholarshipBoxes.forEach((box, index) => {
    const learnMoreButton = box.querySelector('.learn-more');
    if (learnMoreButton) {
      console.log(`Adding click event to button for scholarship ${index}`);
      learnMoreButton.addEventListener('click', function(event) {
        console.log(`Button clicked for scholarship ${index}`);
        openModal(event, `scholarship-modal-${index}`);
      });
    } else {
      console.warn(`No 'Learn More' button found for scholarship ${index}`);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Open modal functionality
  const scholarshipBoxes = document.querySelectorAll('.scholarship-box');
  scholarshipBoxes.forEach((box, index) => {
      const learnMoreButton = box.querySelector('.learn-more');
      if (learnMoreButton) {
          learnMoreButton.addEventListener('click', function(event) {
              event.preventDefault();
              openModal(`scholarship-modal-${index}`);
          });
      }
  });

  // Close modal functionality
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          const modal = this.closest('.modal');
          if (modal) {
              closeModal(modal);
          }
      });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
          closeModal(event.target);
      }
  });
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.style.display = 'block';
  }
}

function closeModal(modal) {
  modal.style.display = 'none';
}