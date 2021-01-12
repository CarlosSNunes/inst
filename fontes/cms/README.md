# CAREPLUS

Refatoramento do website [CarePlus](https://www.careplus.com.br) 

## Informações de arquitetura do projeto

* Diretório raiz do projeto: `/fontes/cms`

**CMS:**  

1. Será o front-end para o CMS afim de gerenciar o conteúdo dinâmico no site institucional.  
2. Foi criado um Http Interceptor para definir Bearer token e caso queria fazer outras tratativas.  
3. Foi criado um error handler para caso deseje tratar os erros e apresentar para o usuário alguma informação.  
4. Dentro da pasta src/utils foram criados alguns arquivos para auxiliar no desenvolvimento, sendo eles:  
    - "class-helper.ts" - Com métodos para ajudar a montar o formdata, em casos de upload de arquivo.  
    - "form-control-error.ts" - Com métodos para pegar os erros existentes em um controle de um reactive form.  
    - Dentro da pasta src/plugins foi criado um arquivo com intuito de usar o CMKEditor e fazer upload de imagens.  
5. Dentro da pasta src/models estão as models mapeadas do backend.  

  

### Pré-requisitos

Ter uma IDE instalada que suporte NodeJS, Angular instalado git para clonar o repositório

``` 

    git clone https://github.com/CareplusBR/inst.git
```

### Instalação

Após clonar o projeto, abra a pasta do repositório que foi clonado em um terminal de comando, navegue até a pasta de um projeto

Ex:

``` 

cd fontes/cms
```

E então execute o comando abaixo para baixar os pacotes necessários para realizar o build do projeto

``` 

npm i
```

E depois execute o comando

``` 

ng serve
```

Para executar o servidor local a fim de utilizar o projeto para desenvonvimento.

### Build

Obs: O build irá gerar uma pasta chamada dist no diretório `/fontes/cms/dist` e dentro dele haverá uma pasta chamada `Care-plus` com os arquivos estáticos do site, estes são os arquivos que devem ser copiados e jogados para a pasta em que o IIS servirá o site.

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

### Variáveis de ambiente

As variáveis de ambiente estão localizadas nos arquivos localizados dentro do diretório: `src/environments` .

**Parâmetros dos arquivos:**

* `Production` - Quando true remove qualquer log da aplicacão que não seja de erro.
* `API` - Url da api, atualizar conforme for necessário.
* `INSTITUCIONAL_URL` - Url do site institucional, utilizada para redirect na prévisualização dos posts.

* O arquivo [environment](src/environments/environment.ts) possui as configurações de desenvolvimento do projeto.

``` json
{
    "production": false,
    "API": "https://localhost:4000",
    "INSTITUCIONAL_URL": "http://localhost:4300"
}
```

* O [environment.homolog](src/environments/environment.homolog.ts) possuí as configurações de homologação do projeto.

``` json
{
    "production": false,
    "API": "http://52.3.44.106:8081",
    "INSTITUCIONAL_URL": "http://careplus.homolog.neotix.com.br"
}
```

* O [environment.staging](src/environments/environment.staging.ts) possuí as configurações de staging do projeto.

``` json
{
    "production": false,
    "API": "https://uatp.careplus.com.br/apiinstitucional/",
    "INSTITUCIONAL_URL": "https://uatp.careplus.com.br/institucional/"
}
```

* O [environment.prod](src/environments/environment.prod.ts) possui as configurações de produção.

``` json
{
    "production": false,
    "API": "???",
    "INSTITUCIONAL_URL": "???"
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

Exemplo: `npm run build:prod` , este comando irá executar a instrucão no seu terminal `ng build --prod` , ela irá gerar um build da aplicação apontando para o ambiente de produção.

**Scripts Utilizados:**

* `npm start` ( `ng serve` ) - Roda o projeto localmente, utilizado para fins de desenvolvimento.
* `npm run build` ( `ng build` ) - Gera o build apontando para ambiente de desenvolvimento.
* `npm run build:homolog` ( `ng build --configuration=homolog` ) - Gera o build apontando para ambiente de homologação.
* `npm run build:staging` ( `ng build --configuration=staging` ) - Gera o build apontando para ambiente de staging.
* `npm run build:prod` ( `ng build --prod` ) - Gera o build apontando para ambiente de produção.

### Estilos

Utilizamos a boblioteca Bootstrap, pela facilidade e popularidade no mercado [link](https://getbootstrap.com/).

## Criado com

* [Angular CLI 8.3.22](https://www.npmjs.com/package/@angular/cli/v/8.3.22) - Framework utilizado para criação do SPA.
* [NodeJS 12.16.1](https://nodejs.org/en/) - NodeJS para instação dos pacotes e suas dependencias.
* [Gulp](https://gulpjs.com) - Compilador usado para estilizar bibliotecas externas.
* [Bootstrap](https://getbootstrap.com/) - Framework CSS para facilitar a criação do design.
* [@fortawesome/angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome) - Biblioteca typescript para utilizar fontawelsome adequado ao angular.
* [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/) - Biblioteca para facilitação da utilização dos recursos do bootstrap no angular.
* [ngx-image-cropper](https://www.npmjs.com/package/ngx-image-cropper) - Biblioteca para crop de imagem.
* [ngx-pagination](https://www.npmjs.com/package/ngx-pagination) - Biblioteca para paginação de listas.
* [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) - Biblioteca para paginação exibição de alertas.
* [moment](https://momentjs.com/) - Biblioteca para tratamento de datas.
* [Bulma-tooltip](https://wikiki.github.io/elements/tooltip/) - Biblioteca em javascript para tooltip.
* [Videogular2](https://www.npmjs.com/package/videogular2) - Biblioteca em javascript para player de vídeo.
* [CmkEditor 4](https://ckeditor.com/ckeditor-4/) - Biblioteca em javascript para edição de texto.

## Autores

* **Thiago de Sa** - *Desenvolvimento Inicial* - [Github](https://github.com/neotix-wendel-thiago)

* **Matheus Campos** - *Desenvolvimento Posterior até entrega do projeto dia --/--/----* - [Github](https://github.com/neotix-matheuscampos)

Veja também os [contribuidores](https://github.com/CareplusBR/inst/graphs/contributors) que participam deste projeto.
