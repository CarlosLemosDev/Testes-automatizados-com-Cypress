# Guia de Instalação do Ambiente Local

## 1. Instalação do XAMPP

1. Baixe o XAMPP:
   - Acesse: https://www.apachefriends.org/download.html
   - Escolha a versão para Windows

2. Instale o XAMPP:
   ```bash
   - Execute o instalador
   - Mantenha as opções padrão
   - Instale em C:\xampp
   ```

3. Inicie os serviços:
   - Abra o Painel de Controle do XAMPP
   - Inicie Apache e MySQL

## 2. Instalação do PrestaShop

1. Baixe o PrestaShop:
   - Acesse: https://www.prestashop.com/en/download
   - Faça o download da última versão

2. Prepare o banco de dados:
   ```sql
   - Acesse http://localhost/phpmyadmin
   - Crie um novo banco: prestashop
   - Usuário: root (sem senha em ambiente local)
   ```

3. Instale o PrestaShop:
   ```bash
   - Extraia o arquivo baixado em C:\xampp\htdocs\prestashop
   - Acesse http://localhost/prestashop
   - Siga o assistente de instalação
   ```

4. Configurações recomendadas:
   ```
   - Nome da loja: My Store
   - Email admin: admin@test.com
   - Senha admin: admin123
   ```

## 3. Configuração do Cypress

1. Atualize o arquivo cypress.config.js:
   ```javascript
   baseUrl: 'http://localhost/prestashop'
   ```

2. Credenciais de teste:
   ```javascript
   email: 'user@test.com'
   password: 'user123'
   ```

## 4. Resolução de Problemas

1. Se o Apache não iniciar:
   - Verifique se a porta 80 está livre
   - Tente mudar para porta 8080

2. Se o MySQL não iniciar:
   - Verifique se a porta 3306 está livre
   - Pare outros serviços MySQL

3. Se o PrestaShop mostrar erros:
   - Verifique permissões das pastas
   - Limpe o cache do navegador
   - Verifique logs do Apache
