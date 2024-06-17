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



// document.querySelectorAll('.resources-item').forEach(item => {
//     const originalText = item.querySelector('.original').textContent;
//     const jumbleElement = item.querySelector('.jumble');

//     item.addEventListener('mouseenter', () => {
//         let jumbledText = '';
//         for (let i = 0; i < originalText.length; i++) {
//             jumbledText += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
//         }
//         jumbleElement.textContent = jumbledText;
//     });
// });

