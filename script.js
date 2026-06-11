document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const downloadBtn = document.getElementById('download-pdf');
    const scrollIndicator = document.getElementById('scroll-indicator');

    // --- 1. GESTION DU THÈME AVEC MÉMOIRE (LocalStorage) ---
    // On vérifie si l'utilisateur est déjà venu et a choisi un thème
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateToggleButton(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            newTheme = 'dark';
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });

    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Clair';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode Sombre';
        }
    }

    // --- 2. BARRE DE PROGRESSION AU DÉFILEMENT ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });

    // --- 3. FONCTION D'IMPRESSION PROPRE / EXPORT PDF ---
    downloadBtn.addEventListener('click', () => {
        // Optionnel : Forcer temporairement le mode clair pour économiser l'encre à l'impression
        const currentTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.removeAttribute('data-theme');
        
        // Lancer la boîte de dialogue d'impression native du navigateur
        window.print();
        
        // Restaurer le thème initial après l'impression
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });
});