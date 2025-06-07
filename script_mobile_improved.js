// Script melhorado para a landing page do FastCode

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle com overlay
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    // Criar overlay para o menu mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    // Adicionar botão de fechar ao menu mobile
    const closeButton = document.createElement('div');
    closeButton.classList.add('mobile-menu-close');
    mainNav.appendChild(closeButton);
    
    // Função para abrir/fechar o menu mobile
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Animar o ícone do menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        mobileMenuToggle.classList.toggle('active');
        
        if (mainNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            
            // Prevenir scroll do body quando o menu está aberto
            body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Restaurar scroll do body quando o menu está fechado
            body.style.overflow = '';
        }
    }
    
    // Event listeners para abrir/fechar o menu mobile
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        closeButton.addEventListener('click', toggleMobileMenu);
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu ao clicar em um link
    const mobileNavLinks = mainNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Header scroll effect com transição suave
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            // Esconder/mostrar header ao rolar
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Rolando para baixo
                header.style.transform = 'translateY(-100%)';
            } else {
                // Rolando para cima
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
    
    // Smooth scroll para links de navegação com offset ajustável
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular a posição de rolagem considerando o header fixo
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Adicionar um pequeno atraso para permitir que o menu se feche primeiro
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
    
    // Animação para elementos quando entram na viewport com opções adicionais
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .benefit, .testimonial, .hero-content, .hero-image, .process-image, .demo-video, .demo-text, .quote-form-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Adicionar classe para elementos animados
    document.querySelectorAll('.feature-card, .step, .benefit, .testimonial, .hero-content, .hero-image, .process-image, .demo-video, .demo-text, .quote-form-container').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Executar animação no carregamento e no scroll com throttle para melhor performance
    let scrollTimeout;
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Validação do formulário com feedback visual melhorado
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        // Função para validar email
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
        
        // Função para validar telefone (formato brasileiro)
        function isValidPhone(phone) {
            const phonePattern = /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/;
            return phonePattern.test(phone);
        }
        
        // Função para mostrar erro
        function showError(field, message) {
            field.classList.add('error');
            
            let errorMessage = field.parentElement.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                field.parentElement.appendChild(errorMessage);
            }
            errorMessage.textContent = message;
        }
        
        // Função para remover erro
        function removeError(field) {
            field.classList.remove('error');
            const errorMessage = field.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
        
        // Validação em tempo real
        const formFields = quoteForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                // Remover erro ao digitar
                removeError(this);
                
                // Validação específica para email
                if (this.id === 'email' && this.value.trim()) {
                    if (!isValidEmail(this.value)) {
                        showError(this, 'Por favor, insira um email válido');
                    }
                }
                
                // Validação específica para telefone
                if (this.id === 'phone' && this.value.trim()) {
                    if (!isValidPhone(this.value)) {
                        showError(this, 'Por favor, insira um telefone válido (ex: (11) 99999-9999)');
                    }
                }
            });
        });
        
        // Validação no envio do formulário
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            // Validar campos obrigatórios
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Este campo é obrigatório');
                }
            });
            
            // Validar email
            const emailField = quoteForm.querySelector('#email');
            if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
                isValid = false;
                showError(emailField, 'Por favor, insira um email válido');
            }
            
            // Validar telefone
            const phoneField = quoteForm.querySelector('#phone');
            if (phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value)) {
                isValid = false;
                showError(phoneField, 'Por favor, insira um telefone válido (ex: (11) 99999-9999)');
            }
            
            // Se o formulário for válido, enviar
            if (isValid) {
                // Animação de carregamento
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                // Simular envio (remover em produção)
                setTimeout(() => {
                    const formContainer = quoteForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Solicitação Enviada com Sucesso!</h3>
                            <p>Obrigado pelo seu interesse no FastCode. Nossa equipe entrará em contato em breve.</p>
                        </div>
                    `;
                    
                    // Rolar para o topo do formulário
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1500);
            }
        });
    }
    
    // Simulação de clique no botão de play do vídeo com feedback visual
    const playButton = document.querySelector('.play-button');
    const demoVideo = document.querySelector('.demo-video');
    
    if (playButton && demoVideo) {
        playButton.addEventListener('click', function() {
            // Adicionar classe de pulsação ao clicar
            this.classList.add('pulse');
            
            // Simular carregamento de vídeo
            setTimeout(() => {
                // Aqui você adicionaria o código para reproduzir o vídeo
                alert('Vídeo de demonstração do FastCode');
                this.classList.remove('pulse');
            }, 500);
        });
    }
    
    // Adicionar efeito de hover nos cards de funcionalidades em dispositivos touch
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            // Remover classe hover de todos os cards
            featureCards.forEach(c => c.classList.remove('hover-active'));
            // Adicionar classe hover ao card atual
            this.classList.add('hover-active');
        });
    });
    
    // Detectar quando elementos entram na viewport para animações
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Parar de observar após animar
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }
});

