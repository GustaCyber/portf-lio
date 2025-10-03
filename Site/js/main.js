// Conteúdos que serão "digitados" no terminal quando o usuário clicar
const contents = {
    about: [
        "root@portfolio:~$ cat about.txt",
        "Olá — sou Gustavo Souza Santos.\n",
        "Estudante de cibersegurança, interessado em pentest, pós - exploração e automação com Python.\n",
        "Gosto de aprender na prática e aprender como funciona as ferramentas.\n",
        "Sei 3 idiomas: \n",
        "Português (nativo)\n",
        "Inglês (básico)\n",
        "Japonês (básico)\n"
    ],

    projects: [
        "root@portfolio:~$ ls projects/",
        "[1] Em desenvolvimento \n",
        "[2] Em desenvolvimento \n",
        "[3] Em desenvolvimento \n"
    ],

    skills: [
        "root@portfolio:~$ cat skills.md",
        "- Aprendo rápido e gosto de desafios\n",
        "- Sigo a metodologia TryHackMe\n",
        "- Sou um bom ouvinte e trabalho bem em equipe\n",
        "- Pentest básico e pós-exploração\n",
        "- Nmap, Metasploit, Wireshark\n",
        "- Python para automação\n",
        "- Linux (Kali) e troubleshooting\n",
        
    ],

    contact: [
        { text: "Email: Gustavo.souzasantos06@gmail.com", link: "mailto:Gustavo.souzasantos06@gmail.com" },
        { text: "GitHub: GustaCyber", link: "https://github.com/GustaCyber" },
        { text: "LinkedIn: Gustavo Souza Santos", link: "https://www.linkedin.com/in/gustavo-souza-santos-b56509199/" },
        { text: "Instagram: @gustagsz", link: "https://www.instagram.com/gustagsz/" }
    ],

    resume: [
        "root@portfolio:~$ cat resume.txt",
        "Resumo:\n",
        "Finalizei o ensino medio (EM) no ano de 2024,\n",
        "Estou atualmente estudando cibersegurança por conta própria\n",
        "e buscando oportunidades de estágio na área.\n",
        "Tenho conhecimentos em Python, C, JavaScript e C++.\n",
        "Possuo habilidades em pentest básico, pós-exploração,\n",
        "automação com Python, além de familiaridade com ferramentas como Nmap, Metasploit e Wireshark.\n",
        "Sou fluente em português, tenho inglês básico e conhecimentos básicos de japonês.\n",
        "Busco aplicar meus conhecimentos em um ambiente profissional e continuar aprendendo na prática.\n"
    ]
};

// Seleciona o elemento do terminal
const terminal = document.getElementById('terminal');

// Função para limpar o terminal
function clearTerminal() {
    terminal.innerHTML = '';
    terminal.scrollTop = terminal.scrollHeight;
}

// Função utilitária para aguardar um tempo (ms)
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
}

// Função para digitar uma linha com efeito typewriter
// Se passar link, ao final da digitação a linha vira um link clicável
async function typeLine(text, link = null) {
    const lineEl = document.createElement('div');
    lineEl.className = 'line';
    terminal.appendChild(lineEl);

    const temp = document.createElement('span'); // span temporário para digitar letra por letra
    lineEl.appendChild(temp);

    const speed = text.startsWith('root@') ? 5 : 10;

    for (let i = 0; i < text.length; i++) {
        temp.textContent += text.charAt(i);
        terminal.scrollTop = terminal.scrollHeight;
        await sleep(speed + Math.random() * 5);
    }

    // transforma em link ao final, se houver
    if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.target = "_blank";
        a.innerHTML = temp.textContent;
        lineEl.innerHTML = '';
        lineEl.appendChild(a);
    }

    // adiciona linha extra para espaçamento
    const br = document.createElement('div');
    br.className = 'line';
    terminal.appendChild(br);
    terminal.scrollTop = terminal.scrollHeight;
}

// Função para digitar várias linhas com efeito typewriter
async function typeLines(lines, isContact = false) {
    clearTerminal();
    for (const line of lines) {
        if (isContact) {
            // no contato, cada linha é um objeto com text + link
            await typeLine(line.text, line.link);
        } else {
            await typeLine(line);
        }
    }
}

// Adiciona handlers aos botões das ferramentas
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const action = btn.dataset.action;
        if (!action) return;

        btn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }], { duration: 180, fill: 'forwards' });

        if (action === 'contact') {
            await typeLines(contents.contact, true);
        } else {
            await typeLines(contents[action]);
        }
    });
});

// Mensagem inicial ao carregar a página
window.addEventListener('load', () => {
    typeLines([
        "root@portfolio:~$ echo 'Bem-vindo ao meu portfólio'",
        "Bem-vindo! Este é um terminal simulado — clique nas ferramentas à esquerda para ver mais.\n"
    ]);
});
