# Cypress Login Tests - Automation Practice

Projeto de testes automatizados para a página de login do site [Automation Practice](http://automationpractice.pl/).

## 🌐 Sites Alternativos para Testes

Em caso de instabilidade do site principal, os testes podem ser adaptados para os seguintes sites:

1. **OpenCart Demo**
   - URL: https://demo.opencart.com
   - Usuário: demo@opencart.com
   - Senha: demo123

2. **The Internet Herokuapp**
   - URL: https://the-internet.herokuapp.com/login
   - Usuário: tomsmith
   - Senha: SuperSecretPassword!

Para usar um site alternativo, modifique a `baseUrl` em `cypress.config.js` e ajuste os seletores em `LoginPage.js`.

## 🔍 Funcionalidades Testadas

- Login com credenciais válidas
- Validação de formato de email
- Validação de campos obrigatórios
- Acesso à recuperação de senha
- Processo de criação de conta

## ⚙️ Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM (versão 8 ou superior)

## 🚀 Instalação e Configuração

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente em `cypress.env.json`:
```json
{
    "USER_EMAIL": "seu_email@exemplo.com",
    "USER_PASSWORD": "sua_senha"
}
```

## 🧪 Executando os Testes

### Modo Interativo
```bash
npm run cypress:open
```

### Modo Headless
```bash
npm run cypress:run
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   └── login.cy.js     # Testes de login
├── pages/
│   └── LoginPage.js    # Page Object do login
└── support/
    ├── commands.js     # Comandos customizados
    └── e2e.js         # Configurações globais
```

## 🔰 Padrões Utilizados

- **Page Objects**: Para melhor organização e reusabilidade do código
- **BDD**: Cenários escritos em formato Dado/Quando/Então
- **Data-Driven Testing**: Uso de múltiplos conjuntos de dados nos testes

## 📋 Cenários de Teste

1. **Login com Credenciais Válidas**
   - Verifica o fluxo completo de login com sucesso
   - Usa dados de teste configuráveis via environment

2. **Validação de Email Inválido**
   - Testa múltiplos formatos inválidos de email
   - Verifica as mensagens de erro apropriadas

3. **Validação de Campos Obrigatórios**
   - Testa submissão com campos vazios
   - Verifica mensagens específicas para cada campo

4. **Recuperação de Senha**
   - Verifica acesso à página de recuperação
   - Valida elementos do formulário

5. **Criação de Nova Conta**
   - Testa início do processo de registro
   - Verifica exibição do formulário de cadastro

## � Notas Técnicas

- Configuração otimizada para lidar com CORS
- Timeouts e retries para maior estabilidade
- Suporte a múltiplas resoluções de tela
- Geração automática de relatórios de execução
- URL base: http://automationpractice.pl
- Timeout: 10000ms
- Viewport: 1280x720
- Screenshots em falhas: ativado
- Vídeos: desativado