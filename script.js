/**
 * CV Interactif - Alpha Nomenjanahary V. ANJARASOA
 * Gestion du Thème Sombre, Indicateur de Lecture et Optimisation Mobile
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variable pour suivre l'état du menu si nécessaire à l'avenir
    const themeToggle = document.getElementById('theme-toggle');
    const downloadBtn = document.getElementById('download-pdf');
    const scrollIndicator = document.getElementById('scroll-indicator');

    /* ==========================================================================
       1. GESTION DU THÈME SOMBRE AVEC PERSISTANCE (LocalStorage)
       ========================================================================== */
    // Vérification du choix précédent de l'utilisateur ou des préférences système
    const savedTheme = localStorage.getItem('cv-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateToggleIcon('light');
    }

    // Écouteur d'événement sur le bouton de changement de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('cv-theme', 'dark');
            updateToggleIcon('dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('cv-theme', 'light');
            updateToggleIcon('light');
        }
    });

    // Fonction interne pour mettre à jour l'icône du bouton dynamiquement
    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Clair';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode Sombre';
        }
    }

    /* ==========================================================================
       2. INDICATEUR DE DÉFILEMENT (SCROLL PROGRESS BAR)
       ========================================================================== */
    const updateScrollProgress = () => {
        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Sécurité pour éviter la division par zéro sur les très petits écrans
        if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            scrollIndicator.style.width = `${scrolled}%`;
        } else {
            scrollIndicator.style.width = '0%';
        }
    };

    // Utilisation d'un écouteur passif pour optimiser les performances de défilement sur mobile
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    /* ==========================================================================
       3. IMPRESSION PROPRE & EXPORT PDF ADAPTÉ
       ========================================================================== */
    downloadBtn.addEventListener('click', () => {
        // Sauvegarde du thème actuel avant de forcer temporairement le mode clair pour l'impression
        const currentTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.removeAttribute('data-theme');
        
        // Lancement immédiat de l'interface d'impression/sauvegarde PDF du système
        window.print();
        
        // Restauration du thème de l'utilisateur après la fermeture de la boîte de dialogue d'impression
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    /* ==========================================================================
       4. OPTIMISATION MOBILE / RE-CALCUL SUR CHANGEMENT D'ORIENTATION
       ========================================================================== */
    // Ajuste dynamiquement l'indicateur si l'utilisateur tourne sa tablette ou son smartphone
    window.addEventListener('resize', updateScrollProgress, { passive: true });
});