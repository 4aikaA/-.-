// Добавление стрелочки и выпадающего списка к "Услуги"
document.addEventListener('DOMContentLoaded', function() {
    const servicesLink = document.querySelector('.nav-menu a[href="#services"]');
    if (servicesLink) {
        // Добавляем стрелочку к существующей ссылке
        servicesLink.innerHTML = 'Услуги <span class="services-arrow"></span>';
        
        // Создаем выпадающий список
        const dropdown = document.createElement('div');
        dropdown.className = 'services-dropdown';
        dropdown.innerHTML = '<ul class="services-list"><li><a href="#" data-service="design">Проектирование инженерных систем</a></li><li><a href="#" data-service="conditioning">Системы кондиционирования</a></li><li><a href="#" data-service="heating">Системы отопления</a></li><li><a href="#" data-service="ventilation">Вентиляционные системы</a></li><li><a href="#" data-service="vacuum">Встроенные пылесосы</a></li><li><a href="#" data-service="automation">Автоматизация и диспетчеризация</a></li><li><a href="#" data-service="aereco">Вентиляция Aereco</a></li></ul>';
        
        // Добавляем после навигации
        const nav = document.querySelector('nav');
        nav.parentNode.insertBefore(dropdown, nav.nextSibling);
        
        // Добавляем CSS стили
        const style = document.createElement('style');
        style.textContent = '.services-arrow { font-size: 0.7rem; margin-left: 5px; cursor: pointer; transition: transform 0.3s ease; } .services-arrow.open { transform: rotate(180deg); } .services-dropdown { position: absolute; top: 100%; left: 0; background: #ffffff; border-radius: 10px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); padding: 10px 0; margin-top: 5px; min-width: 280px; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s ease; z-index: 1000; } .services-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); } .services-list { list-style: none; margin: 0; padding: 0; } .services-list li { margin: 0; } .services-list a { display: block; padding: 12px 20px; color: #0d7377; text-decoration: none; font-weight: 500; font-size: 0.85rem; transition: all 0.3s ease; } .services-list a:hover { background: #f8f9fa; color: #ff6b35; } @media (max-width: 768px) { .services-dropdown { position: fixed; top: 60px; left: 10px; right: 10px; min-width: auto; max-height: 70vh; overflow-y: auto; } }';
        document.head.appendChild(style);
        
        // Обработчик клика на стрелочку
        const arrow = servicesLink.querySelector('.services-arrow');
        if (arrow) {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('show');
                arrow.classList.toggle('open');
            });
        }
        
        // Закрытие по клику вне списка
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !servicesLink.contains(e.target)) {
                dropdown.classList.remove('show');
                arrow.classList.remove('open');
            }
        });
        
        // Обработчики кликов по пунктам списка
        const serviceLinks = dropdown.querySelectorAll('a[data-service]');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceType = this.getAttribute('data-service');
                if (serviceType && typeof openServiceModal === 'function') {
                    openServiceModal(serviceType);
                    dropdown.classList.remove('show');
                    arrow.classList.remove('open');
                }
            });
        });
    }
});
