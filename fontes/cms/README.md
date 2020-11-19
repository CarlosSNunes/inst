# CAREPLUS

Refatoramento do website [CarePlus](https://www.careplus.com.br) 

## Informações de arquitetura do projeto

Foram criados dois projetos, CMS e Institucional.

**CMS:**  
1. Será o frontend para o CMS afim de gerenciar o conteúdo dinâmico no site institucional.  
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
git clone https://github.com/neotix/CarePlus-InstitucionalCMS.git
```

### Instalação

Após clonar o projeto, abra a pasta do repositório que foi clonado em um terminal de comando, navegue até a pasta de um projeto

Ex:

```
cd .\CMS
```

E então execute o comando abaixo para baixar os pacotes necessários para realizar o build do projeto

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
* [Latte-carousel](https://www.npmjs.com/package/latte-carousel) - Biblioteca em javascript para carousel
* [Bulma-tooltip](https://wikiki.github.io/elements/tooltip/) - Biblioteca em javascript para tooltip
* [Videogular2](https://www.npmjs.com/package/videogular2) - Biblioteca em javascript para player de vídeo
* [CmkEditor 5](https://ckeditor.com/ckeditor-5/) - Biblioteca em javascript para edição de texto

## Autores

* **Thiago de Sa** - *Desenvolvimento Inicial* - [Github](https://github.com/neotix-wendel-thiago)

Veja também os [contribuidores](https://github.com/neotix/CarePlus-InstitucionalCMS/contributors) que participam deste projeto.
