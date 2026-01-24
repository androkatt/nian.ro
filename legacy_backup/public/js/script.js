document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. AUTO-CALCULATE EXPERIENCE (2011 - Now)
    // ==========================================
    const startYear = 2007;
    const currentYear = new Date().getFullYear();
    const yearsOfExp = currentYear - startYear;

    // Find the specific counter for experience and update it
    const expCounter = document.getElementById('experience-counter');
    if (expCounter) {
        expCounter.setAttribute('data-target', yearsOfExp);
        // Fallback text just in case animation fails
        expCounter.innerText = 0; 
    }

    // ==========================================
    // 2. COUNTER ANIMATION (Intersection Observer)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const options = { threshold: 0.5 }; // Trigger when 50% visible

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                // Get the target number (handled dynamically for experience)
                const target = +counter.getAttribute('data-target'); 
                
                // Animation settings
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = target / totalFrames;

                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        // Math.ceil makes numbers look cleaner while counting
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Ensure it lands exactly on the target
                        counter.innerText = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter); // Run animation only once
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // ==========================================
    // 3. PORTFOLIO FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterButtons.forEach(button => button.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ==========================================
    // 4. TESTIMONIAL SLIDER
    // ==========================================
    const testimonials = [
        {
            text: "I rarely like to write reviews, but the Marketify team truly deserve a standing ovation for their customer support, customisation and most importantly, friendliness and professionalism.",
            name: "Mike Anderson",
            role: "Vivaco Studio",
            img: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
            text: "The design quality is amazing. It was exactly what I needed for my portfolio. The code is clean and easy to customize. Highly recommended for any creative professional!",
            name: "Sarah Jenkins",
            role: "Photographer",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            text: "Incredible attention to detail. The animations and layout are top-notch. It really helped me land more clients since I launched my new site.",
            name: "David Ross",
            role: "Freelance Dev",
            img: "https://randomuser.me/api/portraits/men/85.jpg"
        }
    ];

    const dots = document.querySelectorAll('.testi-dots .dot');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');

    const quoteText = document.getElementById('quote-text');
    const clientName = document.getElementById('client-name');
    const clientRole = document.getElementById('client-role');
    const clientImg = document.getElementById('client-img');

    // Only run if elements exist
    if (quoteText && dots.length > 0) {
        let currentIndex = 0;

        const updateSlider = (index) => {
            // Update Active Dot
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');

            // Fade Out
            quoteText.style.opacity = 0;
            
            // Wait for fade out, then switch content and fade in
            setTimeout(() => {
                const data = testimonials[index];
                quoteText.innerText = `"${data.text}"`;
                clientName.innerText = data.name;
                clientRole.innerText = data.role;
                clientImg.src = data.img;
                
                quoteText.style.opacity = 1;
            }, 300);
        };

        // Dot Click Events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateSlider(currentIndex);
            });
        });

        // Arrow Click Events
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                if (currentIndex >= testimonials.length) currentIndex = 0;
                updateSlider(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex--;
                if (currentIndex < 0) currentIndex = testimonials.length - 1;
                updateSlider(currentIndex);
            });
        }
    }

    // ==========================================
    // 5. 3D TILT EFFECT (Services)
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    if (tiltCards.length > 0) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Logic: "Drag" corner towards mouse (Inverted rotation)
                // Mouse Top -> Top comes towards you (Negative RotateX)
                // Mouse Left -> Left comes towards you (Positive RotateY)
                const rotateX = ((y - centerY) / centerY) * 10; 
                const rotateY = ((x - centerX) / centerX) * -10;

                // Apply transformation
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    // ==========================================
    // 6. CONTACT FORM HANDLING (AJAX)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm ? contactForm.querySelector('button') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop page reload

            // Change button state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Gather data
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                phone: contactForm.querySelector('input[name="phone"]').value,
                subject: contactForm.querySelector('input[name="subject"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value
            };

            try {
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    // Success State
                    submitBtn.innerText = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#43b883'; // Green
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.style.backgroundColor = ''; // Reverts to CSS default
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    }, 3000);
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                // Error State
                console.error(error);
                submitBtn.innerText = 'Error. Try Again.';
                submitBtn.style.backgroundColor = '#ff4d4d'; // Red
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            }
        });
    }

});