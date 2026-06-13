/**
 * Script de Controle Operacional - Terras do Centro-Sul
 * Gerenciamento de Estado de UI, Acessibilidade e Componentes Dinâmicos.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // DATA DECLARATIONS (Arrays de Objetos para Manutenção Ágil)
    // ==========================================================================

    const programasData = [
        {
            icon: "fa-solid fa-graduation-cap",
            title: "Capacitação Jovem Empreendedor Rural",
            desc: "Fixação e formação de novas gerações no campo, trazendo competências de gestão financeira, agricultura de precisão e canais digitais de venda direta.",
            tags: ["Educação", "Sucessão Familiar", "Inovação"]
        },
        {
            icon: "fa-solid fa-microchip",
            title: "Polo de Bioinsumos do Centro do Paraná",
            desc: "Redução drástica de dependência química através da introdução de defensores biológicos desenvolvidos em parceria com laboratórios e centros acadêmicos locais.",
            tags: ["Pesquisa", "Tecnologia", "Sustentabilidade"]
        },
        {
            icon: "fa-solid fa-network-wired",
            title: "Rastreabilidade e Selo de Origem Regional",
            desc: "Selo de qualidade estruturado para agregação de valor mercadológico à produção de mel, queijos artesanais e grãos da nossa Região Central.",
            tags: ["Mercado", "Logística", "Estratégia"]
        }
    ];

    const faqData = [
        {
            question: "Como os pequenos produtores locais participam dos programas?",
            answer: "A participação ocorre de forma direta por meio do cadastro municipal nos núcleos da rede ou através das cooperativas agrícolas parceiras operantes na Região Central."
        },
        {
            question: "Qual o papel das universidades parceiras no ecossistema?",
            answer: "As universidades locais fornecem suporte com análises laboratoriais avançadas, validação de eficiência de manejo orgânico e programas de estágio diretamente focados na melhoria das lavouras familiares."
        },
        {
            question: "Consumidores e agroindústrias podem comprar diretamente da rede?",
            answer: "Sim. O programa de rastreabilidade e canais curtos de comercialização conecta cooperativas a redes de supermercados, restaurantes corporativos e compradores industriais diretamente."
        }
    ];

    // ==========================================================================
    // RENDERIZADORES DE ELEMENTOS
    // ==========================================================================

    const renderCarousel = () => {
        const container = document.getElementById('carousel-target');
        const dotsContainer = document.getElementById('carousel-dots-target');
        if(!container) return;

        container.innerHTML = programasData.map((item, index) => `
            <div class="carousel-item" aria-roledescription="slide">
                <div class="carousel-icon-box">
                    <i class="${item.icon}"></i>
                </div>
                <div class="carousel-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="carousel-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        dotsContainer.innerHTML = programasData.map((_, index) => `
            <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir para slide ${index + 1}"></span>
        `).join('');
    };

    const renderAccordion = () => {
        const container = document.getElementById('accordion-target');
        if(!container) return;

        container.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item">
                <button class="accordion-trigger" id="faq-tg-${index}" aria-expanded="false" aria-controls="faq-pan-${index}" role="tab">
                    <span>${item.question}</span>
                    <i class="fa-solid fa-chevron-down accordion-icon"></i>
                </button>
                <div id="faq-pan-${index}" class="accordion-panel" role="tabpanel" aria-labelledby="faq-tg-${index}">
                    <div class="accordion-content">
                        <p>${item.answer}</p>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Inicialização da Renderização
    renderCarousel();
    renderAccordion();

    // ==========================================================================
    // LÓGICA DO CARROSSEL (ESTADO E NAVEGAÇÃO)
    // ==========================================================================
    let currentSlide = 0;
    const carouselContainer = document.getElementById('carousel-target');
    const dots = document.querySelectorAll('.dot');

    const updateCarousel = (index) => {
        currentSlide = index;
        if(carouselContainer) {
            carouselContainer.scrollTo({
                left: carouselContainer.clientWidth * currentSlide,
                behavior: 'smooth'
            });
        }
        dots.forEach(d => d.classList.remove('active'));
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    document.getElementById('carousel-next')?.addEventListener('click', () => {
        let next = (currentSlide + 1) % programasData.length;
        updateCarousel(next);
    });

    document.getElementById('carousel-prev')?.addEventListener('click', () => {
        let prev = (currentSlide - 1 + programasData.length) % programasData.length;
        updateCarousel(prev);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            updateCarousel(index);
        });
    });

    // ==========================================================================
    // LÓGICA DO ACORDEÃO (INTERAÇÃO E ACESSIBILIDADE)
    // ==========================================================================
    const triggers = document.querySelectorAll('.accordion-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.parentElement;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos antes de abrir o atual (Estilo sanfona limpa)
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.accordion-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));

            if (!isExpanded) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================================================
    // ACESSIBILIDADE ENGINE (CONTRASTE E CONTROLE DE FONTE)
    // ==========================================================================
    const btnContrast = document.getElementById('btn-contrast');
    const btnFontIncrease = document.getElementById('btn-font-increase');
    const btnFontDecrease = document.getElementById('btn-font-decrease');

    // Estado do Alto Contraste
    btnContrast?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Controle de Dimensionamento de Fonte com Proteção de Layout
    let currentFontSize = 16; 

    btnFontIncrease?.addEventListener('click', () => {
        if (currentFontSize < 24) { // Limite do checklist de integridade
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnFontDecrease?.addEventListener('click', () => {
        if (currentFontSize > 12) { // Limite do checklist de integridade
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });
});