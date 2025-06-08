document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('active');
        });
    });

    // Optional: Open first item by default
    // faqItems[0].classList.add('active');
});