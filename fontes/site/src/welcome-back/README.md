# Care Plus - Welcome Back

## Desenvolvimento

É necessário possuir no nodejs instalado em sua maquina para o desenvolvimento deste projeto pois o gulp é utilizado para o processamento de scss e js, para baixa-lo basta entrar no link:

https://nodejs.org/pt-br/download/

## Passos a seguir.

Assim que você já possuir o node js instalado, entre no diretório raiz do projeto e rode o comando:

- `npm install`

Em seguida rode:

- `npm run gulp`

## Configuração

- O gulp compila o conteudo do diretório src/ e joga o conteudo compilado e outros assets necessários para o diretório public/

- Assim que tiver seguido estes passos já pode seguir com o desenvolvimento.

## Aviso

- Qualquer referência a asset no projeto deverá apontar para o diretório "public/"

- Qualquer asset que for adicionado no projeto deverá ser adicionado no diretório "src/"

## Dependencias de terceiros sendo utilizadas.

As dependências de terceiros se localizam na pasta src/plugins,
qualquer nova dependência de terceiro deverá ser adicionada a este diretório e quando for referenciada deve chamar pelo diretório public pois o gulp joga as dependências lá para mantermos o padrão. ("public/plugins")

- Bootstrap 4

- Jquery
