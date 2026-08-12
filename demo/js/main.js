/* ============================================================
   VIZION TRAK DEMO - main.js
   Core + page modules. Each module self-initializes only when
   its markup exists on the page.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- Mobile navigation toggle ---------- */
    function initNavToggle() {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Sticky header shadow on scroll ---------- */
    function initStickyHeader() {
        var header = document.getElementById('siteHeader');
        if (!header) return;

        var onScroll = function () {
            header.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Scroll-reveal animations ---------- */
    function initScrollReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        els.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- Active nav link highlighting ---------- */
    function initActiveNav() {
        var current = window.location.pathname.split('/').pop() || 'index.html';
        // Sub-pages light up their parent section in the nav
        var parentMap = {
            'blog-post.html': 'blog.html',
            'coaching-1on1.html': 'coaching.html',
            'coaching-group.html': 'coaching.html',
            'course-envision-her.html': 'courses.html'
        };
        var target = parentMap[current] || current;
        document.querySelectorAll('.nav-link').forEach(function (link) {
            if (link.getAttribute('href') === target) {
                link.classList.add('active');
            }
        });
    }

    /* ---------- Auto footer year ---------- */
    function initFooterYear() {
        document.querySelectorAll('.js-year').forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    }

    /* ---------- Testimonial slider (home) ---------- */
    function initTestimonialSlider() {
        var slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        var track = slider.querySelector('.slider-track');
        var slides = slider.querySelectorAll('.slider-slide');
        var prevBtn = slider.querySelector('.slider-prev');
        var nextBtn = slider.querySelector('.slider-next');
        var dotsWrap = slider.querySelector('.slider-dots');
        var index = 0;
        var timer = null;
        var total = slides.length;
        if (!track || !total) return;

        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
            dot.addEventListener('click', function () { goTo(i); restart(); });
            dotsWrap.appendChild(dot);
        });
        var dots = dotsWrap.querySelectorAll('.slider-dot');

        function goTo(i) {
            index = (i + total) % total;
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
        }
        function next() { goTo(index + 1); }
        function start() { timer = setInterval(next, 6000); }
        function stop() { if (timer) clearInterval(timer); }
        function restart() { stop(); start(); }

        if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); restart(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);

        start();
    }

    /* ---------- Opt-in forms (lead magnets) ---------- */
    function initOptinForms() {
        var forms = document.querySelectorAll('form[data-optin]');
        if (!forms.length) return;
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        forms.forEach(function (form) {
            var input = form.querySelector('input[type="email"]');
            if (!input) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var success = form.parentElement.querySelector('.form-success');
                if (!emailRe.test(input.value.trim())) {
                    input.classList.add('form-error');
                    input.focus();
                    return;
                }
                input.classList.remove('form-error');
                form.style.display = 'none';
                if (success) {
                    success.style.display = 'block'; // overrides inline display:none used on some sub-pages
                    success.classList.add('show');
                }
            });

            input.addEventListener('input', function () {
                input.classList.remove('form-error');
            });
        });
    }

    /* ---------- FAQ Accordion ---------- */
    function initAccordion() {
        var items = document.querySelectorAll('.accordion-item');
        if (!items.length) return;

        items.forEach(function (item) {
            var btn = item.querySelector('.accordion-header');
            var content = item.querySelector('.accordion-content');
            var icon = item.querySelector('.acc-icon');
            if (!btn || !content) return;

            btn.addEventListener('click', function () {
                var isOpen = content.style.display === 'block';
                
                // Close siblings
                items.forEach(function (other) {
                    var otherContent = other.querySelector('.accordion-content');
                    var otherIcon = other.querySelector('.acc-icon');
                    if (otherContent) otherContent.style.display = 'none';
                    if (otherIcon) otherIcon.textContent = '+';
                });

                if (!isOpen) {
                    content.style.display = 'block';
                    if (icon) icon.textContent = '−';
                }
            });
        });
    }

    /* ---------- Multi-Step Coaching Form ---------- */
    function initMultiStepForm() {
        var form = document.getElementById('coachingAppForm');
        if (!form) return;

        var nextBtns = form.querySelectorAll('.btn-next');
        var prevBtns = form.querySelectorAll('.btn-prev');
        var steps = form.querySelectorAll('.form-step');
        var progressBar = document.getElementById('progressBar');
        var stepIndicatorText = document.getElementById('stepIndicatorText');
        var stepPercentText = document.getElementById('stepPercentText');
        var successMessage = document.getElementById('appSuccessMessage');

        var stepTitles = {
            1: "Personal Details",
            2: "Your Goals & Container",
            3: "Readiness Commitment"
        };

        function showStep(stepNum) {
            steps.forEach(function (step) {
                step.style.display = step.classList.contains('step-' + stepNum) ? 'block' : 'none';
            });

            var percent = Math.round((stepNum / 3) * 100);
            if (progressBar) progressBar.style.width = percent + '%';
            if (stepPercentText) stepPercentText.textContent = percent + '%';
            if (stepIndicatorText) stepIndicatorText.textContent = 'Step ' + stepNum + ' of 3: ' + (stepTitles[stepNum] || '');
        }

        // Ensure a clean initial state even if inline markup drifts
        showStep(1);

        nextBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var nextStep = btn.getAttribute('data-next');
                var currentStepEl = btn.closest('.form-step');
                var inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
                var valid = true;

                inputs.forEach(function (input) {
                    if (!input.value.trim()) {
                        input.style.borderColor = 'var(--accent)';
                        valid = false;
                    } else {
                        input.style.borderColor = 'var(--border-color)';
                    }
                });

                if (valid) {
                    showStep(nextStep);
                }
            });
        });

        prevBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var prevStep = btn.getAttribute('data-prev');
                showStep(prevStep);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';
        });
    }

    /* ---------- Filter Chips (Courses & Blog) ---------- */
    function initFilterChips() {
        var chips = document.querySelectorAll('.filter-chip');
        if (!chips.length) return;

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var filter = chip.getAttribute('data-filter');
                var container = chip.closest('.section');
                if (!container) return;

                // Toggle active chip
                container.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
                chip.classList.add('active');

                // Filter items
                var items = container.querySelectorAll('.course-item, .blog-item');
                items.forEach(function (item) {
                    var categories = item.getAttribute('data-category') || '';
                    if (filter === 'all' || categories.indexOf(filter) !== -1) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initNavToggle();
        initStickyHeader();
        initScrollReveal();
        initActiveNav();
        initFooterYear();
        initTestimonialSlider();
        initOptinForms();
        initAccordion();
        initMultiStepForm();
        initFilterChips();
    });
})();
