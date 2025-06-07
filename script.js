// Script para a landing page do FastCode

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animar o ícone do menu
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    
                    if (mobileMenuToggle) {
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
                
                // Calcular a posição de rolagem considerando o header fixo
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação para elementos quando entram na viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .benefit, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Adicionar classe para elementos animados
    document.querySelectorAll('.feature-card, .step, .benefit, .testimonial').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Validação do formulário
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Adicionar mensagem de erro se não existir
                    let errorMessage = field.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = '#ff3860';
                        errorMessage.style.fontSize = '14px';
                        errorMessage.style.marginTop = '5px';
                        field.parentElement.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'Este campo é obrigatório';
                } else {
                    field.classList.remove('error');
                    const errorMessage = field.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Validação de email
            const emailField = quoteForm.querySelector('#email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    let errorMessage = emailField.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = '#ff3860';
                        errorMessage.style.fontSize = '14px';
                        errorMessage.style.marginTop = '5px';
                        emailField.parentElement.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'Por favor, insira um email válido';
                }
            }
            
            // Se o formulário for válido, enviar
            if (isValid) {
                // Aqui você adicionaria o código para enviar o formulário
                // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
                
                const formContainer = quoteForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 40px 20px;">
                        <i class="fas fa-check-circle" style="font-size: 60px; color: #4CAF50; margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom: 15px; color: #333;">Solicitação Enviada com Sucesso!</h3>
                        <p style="margin-bottom: 0;">Obrigado pelo seu interesse no FastCode. Nossa equipe entrará em contato em breve.</p>
                    </div>
                `;
            }
        });
        
        // Remover mensagens de erro quando o usuário começa a digitar
        const formFields = quoteForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Simulação de clique no botão de play do vídeo
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Aqui você adicionaria o código para reproduzir o vídeo
            // Por enquanto, vamos apenas mostrar um alerta
            alert('Vídeo de demonstração do FastCode');
        });
    }
});

