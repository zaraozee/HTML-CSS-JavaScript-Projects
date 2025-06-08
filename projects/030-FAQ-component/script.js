document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });

        // Also make the toggle button work
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('active');
        });
    });

    // Optional: Open first item by default
    // faqItems[0].classList.add('active');
});