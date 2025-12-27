document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const navOriginal = document.querySelector('.nav');
    const authOriginal = document.querySelector('.auth');

    // ----------------------------------------------------------------------
    // 1. Бургер-меню: Создание и логика
    // ----------------------------------------------------------------------
    
    // Создаем мобильное меню динамически
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');

    // Клонируем элементы и делаем их видимыми
    const navClone = navOriginal.cloneNode(true);
    navClone.style.display = 'flex'; // Принудительно показываем навигацию
    navClone.classList.add('mobile-nav-links'); // Добавляем класс для стилизации мобильных ссылок

    const authClone = authOriginal.cloneNode(true);
    authClone.style.display = 'flex'; // Принудительно показываем кнопки
    authClone.classList.add('mobile-auth-links'); // Добавляем класс для стилизации мобильных кнопок

    // Удаляем переключатель темы из мобильной версии, чтобы избежать дублирования
    const themeSwitchMobile = authClone.querySelector('.theme-switch');
    if (themeSwitchMobile) {
        // Клонируем его отдельно и добавляем в mobileMenu, чтобы он не исчез
        const themeSwitchClone = themeSwitchMobile.cloneNode(true);
        mobileMenu.appendChild(themeSwitchClone);
        themeSwitchMobile.remove(); 
    }
    
    // Добавляем клонированные элементы в мобильное меню
    mobileMenu.appendChild(navClone);
    mobileMenu.appendChild(authClone);
    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', () => {
        // Переключаем класс 'active' для отображения/скрытия меню
        mobileMenu.classList.toggle('active');
        // Опционально: блокируем скролл, когда меню открыто
        document.body.classList.toggle('menu-open'); 
    });


    // ----------------------------------------------------------------------
    // 2. Переключатель темы (Обновляем логику, чтобы работал клонированный переключатель)
    // ----------------------------------------------------------------------
    
    // Используем переключатель из оригинального хедера, чтобы он работал всегда
    const themeCheckbox = document.getElementById('checkbox');
    
    // Функция для применения темы
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Синхронизируем состояние чекбокса в клонированном элементе (если он есть)
        const mobileCheckbox = document.querySelector('.mobile-menu #checkbox');
        if (mobileCheckbox) {
             mobileCheckbox.checked = isDark;
        }
    }

    // Загрузка темы из локального хранилища
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        themeCheckbox.checked = true;
        applyTheme(true);
    } else {
        themeCheckbox.checked = false;
        applyTheme(false);
    }
    
    // Обработчик изменения состояния чекбокса
    // Добавляем обработчик как для оригинального, так и для мобильного
    document.querySelectorAll('#checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const isDark = event.currentTarget.checked;
            applyTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });

    // ----------------------------------------------------------------------
    // 3. Плавная анимация (оставлено для справки)
    // ----------------------------------------------------------------------
    // ...
});