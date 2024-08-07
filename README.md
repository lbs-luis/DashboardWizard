# Dashboard Wizard 🧙‍♂️

![GitHub repo size](https://img.shields.io/github/repo-size/luis-lbs/DashboardWizard?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/luis-lbs/DashboardWizard?style=for-the-badge)

<img src="./github-media/dashboardwizard-animation.gif" alt="Animação de preenchimento dos gráficos do dashboard">

> ERP focado no feedback visual dos dados.
<br><br>

### Magic Link

Aplicado nesse projeto o pattern Magic Link de autenticação onde apenas com o e-mail do parceiro já é possível autentica-ló na aplicação de maneira rápida e fácil.
> Informando o e-mail cadastrado no formulário de autenticação do painel de parceiros.
> 
> <img src="./github-media/dashboardwizard-signin.gif" alt="Animação de preenchimento dos gráficos do dashboard" width="400px">
><br><br>
>
> E-mail enviado pelo Dashboard Wizard 🧙‍♂️.
>
> <img src="./github-media/dashboardwizard-email.png" alt="Animação de preenchimento dos gráficos do dashboard" width="400px">

## 🚀 Instalando o Dashboard Wizard 🧙‍♂️.

Para clonar e executar o projeto, siga estas etapas:
> o projeto foi originalmente construido usando [pnpm](https://pnpm.io/pt/)

clonando o projeto
```
git clone https://github.com/luis-lbs/DashboardWizard.git
```
<br>

baixando dependências
```
pnpm install
```
<br>

preenchendo as variáveis de ambiente
```
VITE_API_URL="http://localhost:3333" - url da api
VITE_ENABLE_API_DELAY=0 - delay em ms desejado para o retorno das requisições
```
<br>

executando o projeto
```
pnpm run dev
```
<br>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
