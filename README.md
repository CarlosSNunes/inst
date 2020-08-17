# CAREPLUS

Refatoramento do website [CarePlus](https://www.careplus.com.br) 

## Informações de arquitetura do projeto

  
**Institucional:**  

1. Será o novo frontend do site da careplus.  
2. Está utilizando SSR para atender requisitos mínimos de SEO.  
3. Todos itens do styleguide foram criados usando classes CSS para facilitar seu reuso.  
4. Foram utilizados alguns plugins cmo datepicker e carousel, porém modificado seus estilos para atender o design criado.  
5. Dentro da pasta src/utils foram criados alguns arquivos para auxiliar no desenvolvimento, sendo eles:  
    - "class-helper.ts" - Com métodos para ajudar a montar o formdata, em casos de upload de arquivo.  
    - "form-control-error.ts" - Com métodos para pegar os erros existentes em um controle de um reactive form.  
    - "file-helper.ts" - Com métodos para pegar string de tamanho de dados através de um arquivo.  
    - "image-helper.ts" - Com métodos para pode consumir uma imagem no frontend.  
    - "window-ref.ts" - Com a ideia de poder usar a variavel "window", mas sem precisar javascript puro.
    - "route-names.ts" - Exporta um array do tipo RouteModel que está localizada em "src/app/models/rota.model.ts" com todas as rotas do projeto
6. Dentro da pasta src/plugins foi criado um arquivo com intuito de usar o CMKEditor e fazer upload de imagens.  
7. Dentro da pasta src/models estão as models mapeadas do backend.

### Pré-requisitos

Ter uma IDE instalada que suporte NodeJS, Angular instalado git para clonar o repositório

``` 
git clone https://github.com/CareplusBR/inst.git
```

### Instalação

 Execute o comando abaixo na pasta raiz para baixar os pacotes necessários para realizar o build do projeto

``` 
npm i
```

E depois execute o comando

``` 
ng serve
```

Para executar o servidor local a fim de utilizar o projeto

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

## Autores

* **Thiago de Sa** - *Desenvolvimento Inicial* - [Github](https://github.com/neotix-wendel-thiago)

* **Matheus Campos** - *Desenvolvimento Posterior até entrega do projeto dia --/--/----* - [Github](https://github.com/neotix-matheuscampos)

Veja também os [contribuidores](https://github.com/CareplusBR/inst/graphs/contributors) que participam deste projeto.
