# CARE PLUS

Refatoramento do website [Care Plus](https://www.careplus.com.br) 

## Informações de arquitetura do projeto

* Diretório raiz do projeto: `/fontes/site`

  
**Institucional:**  

1. Será o novo frontend do site da Care Plus.  
2. Está utilizando SSR para atender requisitos mínimos de SEO.  
3. Todos itens do styleguide foram criados usando classes CSS para facilitar seu reuso.  
4. Foram utilizados alguns plugins cmo datepicker e carousel, porém modificado seus estilos para atender o design criado.  
5. Dentro da pasta src/utils foram criados alguns arquivos para auxiliar no desenvolvimento, sendo eles:  
    - [class-helper.ts](src/utils/class-helper.ts) - Com métodos para ajudar a montar o formdata, em casos de upload de arquivo.  
    - [form-control-error.ts](src/utils/form-control-error.ts) - Com métodos para pegar os erros existentes em um controle de um reactive form.  
    - [file-helper.ts](src/utils/file-helper.ts) - Com métodos para pegar string de tamanho de dados através de um arquivo.  
    - [image-helper.ts](src/utils/image-helper.ts) - Com métodos para pode consumir uma imagem no frontend.  
    - [window-ref.ts](src/utils/window-ref.ts) - Com a ideia de poder usar a variavel "window", mas sem precisar javascript puro.
    - [route-names.ts](src/utils/route-names.ts) - Exporta um array do tipo RouteModel que está localizada em "src/app/models/rota.model.ts" com todas as rotas do projeto
    - [error-handler](src/utils/error-handler) - Exporta uma class ErrorHandler que possuí um método publico chamado "ShowError" onde ele verifica o erro retornado pela api chama a service de notificação para mostrar o erro na tela ao usuário final.
    - [local-storage](src/utils/local-storage) - Uma classe que simula o localStorage no server side rendering. 
7. Dentro da pasta src/models estão as models mapeadas do backend.
8. O arquivo [app.interceptor.ts](src/app/app.interceptor.ts) intercepta todas as requisições http que partem da aplicação angular, automaticamente se autentica na api, preenche o token antes de enviar uma requisição e também renova o token quando necessário.

### Pré-requisitos

Ter uma IDE instalada que suporte NodeJS, Angular instalado git para clonar o repositório

``` 

    git clone https://github.com/CareplusBR/inst.git
```

### Instalação

 Execute o comando abaixo na pasta `/fontes/site` para baixar os pacotes necessários para realizar o build do projeto

``` 

    npm i
```

Para executar o servidor local a fim de utilizar o projeto execute o comando:

``` 

    ng serve
```

### Build

Para rodar o build execute o comando:

``` 

    ng build
```

Para rodar o build apontando para produção execute o comando:

    

``` 

    ng build --prod
```

Para rodar o build apontando para um ambiente customizado basta rodar o comando:

``` 

    ng build --configuration="ambiente"
```

ex:

``` 

    ng build --configuration=homolog
```

Obs: Ele irá buscar as variáveis de ambiente no arquivo environment.["ambiente no qual você gerou o build"].

Segue um link da documentação onde é explicado como se configura ambientes customizados:

* [Angular build guide](https://angular.io/guide/build)

Para rodar o build apontando para produção com server side rendering execute o comando:

Obs: O comando de build com server side rendering sempre apontará para produção, caso quera apontar para outro ambiente, um comando customizado deve ser criado no arquivo package.json em scripts, como o comando `npm run build:ssr-hml` que aponta para homolog.

    

``` 

    npm run build:ssr
```

Para executar os arquivos gerados pelo build com server side rendering executar o comando:
Obs: ele irá servir o projeto na porta 4001

    

``` 

    npm run serve:ssr
```

Outra alternativa é utilizar o pacote Pm2, com ele é possivel servir o build com server side rendering em segundo plano como um processo do sistema.

[Link de download do PM2](https://www.npmjs.com/package/pm2) para instalar ele no servidor.

Para rodar o build com o pm2 basta após a instalação e geração do build com server side rendering, entrar no diretório raiz do projeto do site institucional, atualmente é `/fontes/site` , e rodar o comando `pm2 start dist/server.js --name careplus-institucional` ; 

A opção --name do pm2 é opcional, ela server para dar um nome ao processo que está sendo executado.

### Variáveis de ambiente

As variáveis de ambiente estão localizadas nos arquivos localizados dentro do diretório: `src/environments` .

**Parâmetros dos arquivos:**

* `Production` - Quando true remove qualquer log da aplicacão que não seja de erro.
* `API_URL` - Url da api, atualizar conforme for necessário.
* `SELF_URL` - Url do proprio site, utilizada para setar as meta tags de redes sociais.
* `CDN_URL` - Url da cdn da Care Plus.
* `CAREPLUS_URL` - Url do portal da Care Plus.
* `BASE_HREF` - Url base do projeto.
* `HAS_SSL_CERTIFIED` - Recebe um boolean,    `true` ou `false` , caso `true` ele irá executar a aplicação na porta 443 no server side rendering, porém é necessário que o caminho correto dos arquivos do certificado estejam preenchidos nas variáveis abaixo:
* `API_USER` - Usuário de autenticação para o projeto institucional consumir a api.
* `API_PASSWORD` - Senha de autenticação para o projeto institucional consumir a api.
* `CERT_PATH` - Objeto com os caminhos dos arquivos necessários do certificado. (necessário somente em ambiente de produção por hora, em outros ambientes as propriedades do objeto devem ser preenchidas com uma string vazia "").
* `CERT_PATH.key` - Caminho para o arquivo com extensão .key do certificado. (necessário somente em ambiente de produção por hora, preencher com "" em ambientes que não são o de produção).
* `CERT_PATH.cert` - Caminho para o arquivo com extensão .cert do certificado. (necessário somente em ambiente de produção por hora, preencher com "" em ambientes que não são o de produção).
* `CERT_PATH.ca` - Caminho para o arquivo com extensão .ca do certificado. (opcional, preencher com "" quando o certificado não possuir esta informação).

* O arquivo [environment](src/environments/environment.ts) possui as configurações de desenvolvimento do projeto.

``` json
{
    "production": false,
    "API_URL": "https://localhost:4000",
    "SELF_URL": "http://localhost:4300",
    "CDN_URL": "https://qacdn.careplus.com.br/gerinstitucional",
    "CAREPLUS_URL": "https://www8.careplus.com.br/portal/",
    "BASE_HREF": "/",
    "API_USER": "admin@admin.com",
    "API_PASSWORD": "123",
    "HAS_SSL_CERTIFIED": false,
    "CERT_PATH": {
        "key": "Caminho para o arquivo com extensão .key do certificado.",
        "cert": "Caminho para o arquivo com extensão .cert do certificado.",
        "ca": "Caminho para o arquivo com extensão .ca do certificado."
    }
}
```

* O [environment.homolog](src/environments/environment.homolog.ts) possuí as configurações de homologação do projeto.

``` json
{
    "production": false,
    "API_URL": "http://homolog-windows.neotix.com.br:8081",
    "SELF_URL": "https://homolog-windows.neotix.com.br",
    "CDN_URL": "https://qacdn.careplus.com.br/gerinstitucional",
    "CAREPLUS_URL": "https://www8.careplus.com.br/portal/",
    "BASE_HREF": "/",
    "API_USER": "admin@admin.com",
    "API_PASSWORD": "123",
    "HAS_SSL_CERTIFIED": false,
    "CERT_PATH": {
        "key": "Caminho para o arquivo com extensão .key do certificado.",
        "cert": "Caminho para o arquivo com extensão .cert do certificado.",
        "ca": "Caminho para o arquivo com extensão .ca do certificado."
    }
}
```

* O [environment.staging](src/environments/environment.staging.ts) possuí as configurações de staging do projeto.

``` json
{
    "production": false,
    "API_URL": "https://uatp.careplus.com.br/apiinstitucional",
    "SELF_URL": "https://uatp.careplus.com.br/institucional",
    "CDN_URL": "https://qacdn.careplus.com.br/gerinstitucional",
    "CAREPLUS_URL": "https://hml.careplus.com.br/homolog23/",
    "BASE_HREF": "/institucional/",
    "API_USER": "admin@admin.com",
    "API_PASSWORD": "123",
    "HAS_SSL_CERTIFIED": false,
    "CERT_PATH": {
        "key": "Caminho para o arquivo com extensão .key do certificado.",
        "cert": "Caminho para o arquivo com extensão .cert do certificado.",
        "ca": "Caminho para o arquivo com extensão .ca do certificado."
    }
}
```

* O [environment.staging-cp](src/environments/environment.staging-cp.ts) possuí as configurações de staging interno da Care Plus do projeto.

``` json
{
    "production": false,
    "API_URL": "http://uat7institucional.careplus.com.br/apiinstitucional",
    "SELF_URL": "http://uat7institucional.careplus.com.br/institucional",
    "CDN_URL": "https://qacdn.careplus.com.br/gerinstitucional",
    "CAREPLUS_URL": "https://hml.careplus.com.br/homolog23/",
    "BASE_HREF": "/institucional/",
    "API_USER": "admin@admin.com",
    "API_PASSWORD": "123",
    "HAS_SSL_CERTIFIED": false,
    "CERT_PATH": {
        "key": "Caminho para o arquivo com extensão .key do certificado.",
        "cert": "Caminho para o arquivo com extensão .cert do certificado.",
        "ca": "Caminho para o arquivo com extensão .ca do certificado."
    }
}
```

* O [environment.prod](src/environments/environment.prod.ts) possui as configurações de produção.

``` json
{
    "production": true,
    "API_URL": "http://52.3.44.106:8081",
    "SELF_URL": "https://www.careplus.com.br",
    "CAREPLUS_URL": "https://www8.careplus.com.br/portal/",
    "CDN_URL": "https://cdn.careplus.com.br/gerinstitucional",
    "BASE_HREF": "/",
    "API_USER": "admin@admin.com",
    "API_PASSWORD": "123",
    "HAS_SSL_CERTIFIED": true,
    "CERT_PATH": {
        "key": "Caminho para o arquivo com extensão .key do certificado.",
        "cert": "Caminho para o arquivo com extensão .cert do certificado.",
        "ca": "Caminho para o arquivo com extensão .ca do certificado."
    }
}
```

Para altera alguma variavel de ambiente do projeto basta alterar nestes arquivos.

Também é possível criar novas variáveis de ambiente no arquivo [angular.json](angular.json) a estrutura de configuração é a seguir:

![Variáveis de ambiente da aplicação](/fontes/site/docs/readme/images/application-environments.png)

Na imagem acima vemos o exemplo de configuração da variavel de ambiente de homologação, para criar uma de staging por exemplo, basta adicionar uma chave chamada staging contendo um objeto a esta estrutura json ex: `staging: {objeto}`

A chave fileReplacements contém array de objetos aonde você aponta qual será o arquivo a ser substituido na hora do build, no caso do homolog ele substitui o environment.ts pelo environment.homolog.ts, assim as configurações de homolog estarão presentes no novo build.

### Scripts da aplicação

No arquivo [package.json](package.json) estão há a chave "scripts" que é um objeto contendo todos os script que você pode rodar na aplicação, ao rodar um script é como se você estivesse rodando ele no terminal de seu computador.

Para rodar um script basta rodar o comando `npm run "nome do script"`

Exemplo: `npm run build` , este comando irá executar a instrucão no seu terminal `ng build --prod` , ela irá gerar um build da aplicação apontando para o ambiente de produção.

**Scripts Utilizados:**

* `npm start` ( `ng serve` ) - Roda o projeto localmente, utilizado para fins de desenvolvimento.
* `npm run build` ( `ng build --prod` ) - Gera um build da aplicação apontando para o ambiente de produção.
* `npm run build-hml` ( `ng build --configuration=homolog` ) - Gera um build da aplicação apontando para o ambiente de homologação.
* `npm run build-staging` ( `ng build --configuration=staging --base-href=/institucional/` ) - Gera um build da aplicação apontando para o ambiente de staging, observação: a flag --base-href utilizada neste build troca a tag `<base href="/">` para `<base href="/institucional/">` no ambiente de staging estamos utilizando desta forma por uma questão de padronização de url, o arquivo [web.config](src/web.config) utilizado no IIS redireciona as requisições das urls que contém o path `/institucional/` para a url correta, caso no server você não possua uma configuração que realize estes redirecionamentos, a flag não é necessária, e caso utilizada o seu site não encontrará os arquivos se não houver esta configuração de redirecionamento.
* `npm run build:ssr` : ( `npm run build:client-and-server-bundles && npm run compile:server` ) - Gera o build com Server Side Rendering com as variáveis de ambiente de produção.
* `npm run build:ssr-hml` : ( `npm run build:client-and-server-bundles-hml && npm run compile:server` ) - Gera o build com Server Side Rendering com as variáveis de ambiente de homologação.
* `npm run build:ssr-staging` : ( `npm run build:client-and-server-bundles-staging && npm run compile:server` ) - Gera o build com Server Side Rendering com as variáveis de ambiente de staging.
* `npm run serve:ssr` : ( `node dist/server` ) - Após gerar o build com Server Side Rendering este comando pode ser executado para servir localmente o build.
* `npm run bs` : ( `npm run build:ssr && npm run serve:ssr` ) - Gera o build com as variáveis de ambiente de produção e logo em seguida o executa localmente.
* `npm run bs-hml` : ( `npm run build:ssr-hml && npm run serve:ssr` ) - Gera o build com as variáveis de ambiente de homologação e logo em seguida o executa localmente.
* `npm run bs-staging` : ( `npm run build:ssr-staging && npm run serve:ssr` ) - Gera o build com as variáveis de ambiente de staging e logo em seguida o executa localmente.

### Estilos

Tudo foi pensado para ser o mais puro de CSS possível, para não comprometer o desempenho do projeto, a escolha da utilização do Bulma e não Bootstrap, é que ele ja possui classes pré-definidas que auxiliam e muito no desenvolvimento.

Exemplo de colunas, você pode informar o tamanho específico, ou simplesmente colocar uma coluna, que é adaptado corretamente, assim como informar através de classes em qual dispositivo essa coluna ira aparecer, [link](https://bulma.io/documentation/columns/basics/) para ter mais informações.

Além das diversas classes de auxílio, chamadas "helpers" para adaptar o que deseja esconder, alinhar, coloração, etc, [link](https://bulma.io/documentation/modifiers/syntax/) para mais informações.

Segue [link](https://www.codeinwp.com/blog/bootstrap-vs-foundation-vs-bulma-vs-semantic-vs-uikit/) de um comparativo dos maiores frameworks de CSS existentes hoje, o Bulma sempre se destaca por ser o mais leve e sem nenhuma dependencia em javascript

## Criado com

* [Angular CLI 8.3.22](https://www.npmjs.com/package/@angular/cli/v/8.3.22) - Framework utilizado para criação do SPA
* [NodeJS 12.16.1](https://nodejs.org/en/) - NodeJS para instação dos pacotes e suas dependencias
* [Gulp](https://gulpjs.com) - Compilador usado para estilizar bibliotecas externas
* [Bulma](https://bulma.io) - Framework CSS puro para facilitar a criação do design
* [Bulma-tooltip](https://wikiki.github.io/elements/tooltip/) - Biblioteca em CSS puro para tooltip
* [Videogular2](https://www.npmjs.com/package/videogular2) - Biblioteca em javascript para player de vídeo
* [ngx-mask](https://www.npmjs.com/package/ngx-mask) - Biblioteca para criação de mascaras em formulários
* [saturn-datepicker](https://www.npmjs.com/package/saturn-datepicker) - Biblioteca para utilziação de datepicker com ou sem range de datas.
* [moment](https://www.npmjs.com/package/moment) - Biblioteca de formatação de data para utilziação do saturn-datepicker.
* [ng-image-slider](https://www.npmjs.com/package/ng-image-slider) - Biblioteca de slider de imagens ou vídeos.
* [angular-resize-event](https://www.npmjs.com/package/angular-resize-event) - Biblioteca para captar a mudança de tamanho de qualquer elemento html para ajudar no desenvovimento, atualmente utilzado no componente HeaderMobileComponent.
* [hammerjs](https://hammerjs.github.io/) - Biblioteca para captar eventos de deslize nos dispositivos com touchscreen.
* [simple-parallax-js](https://simpleparallax.com/) - Biblioteca para utilização de efeito de parallax.
* [smoothscroll-polyfill](https://www.npmjs.com/package/smoothscroll-polyfill) - Biblioteca para utilizar a propriedade [behavior: smooth] da função window.scrollTo em qualquer browser.
* [typeface-montserrat](https://www.npmjs.com/package/typeface-montserrat) - Biblioteca para utilização da fonte montserrat.
* [angular-validate-br](https://www.npmjs.com/package/angular-validate-br) - Biblioteca para validação de cpf e cnpj com form reativo.
* [remove-accents](https://www.npmjs.com/package/remove-accents) - Biblioteca para remover acentos das palavras, utilizamos para filtrar texto.
* [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll) - Biblioteca para utilizar funcionalidade de infinite-scroll no angular.
* [compression](https://www.npmjs.com/package/compression) - Biblioteca para comprimir o response do server, este recurso é utilizado apenas com Server Side Rendering.
* [express](https://www.npmjs.com/package/express) - Biblioteca para receber as requisições e disponibilizar os endpoints/ realizar os redirects, este recurso é utilizado apenas com Server Side Rendering.

## Autores

* **Thiago de Sa** - *Desenvolvimento Inicial* - [Github](https://github.com/neotix-wendel-thiago)

* **Matheus Campos** - *Desenvolvimento Posterior até entrega do projeto dia --/--/----* - [Github](https://github.com/neotix-matheuscampos)

Veja também os [contribuidores](https://github.com/CareplusBR/inst/graphs/contributors) que participam deste projeto.
