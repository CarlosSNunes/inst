# CAREPLUS

Backend e banco de dados para o refatoramento do website [CarePlus](https://www.careplus.com.br) 

## Informações de arquitetura do projeto

Sobre o Template:  

- Foi desenvolvido para ser totalmente assincrono, afim de facilitar a escalabilidade e trazer melhor performance para utilizar no servidor.

- Usa injeção de dependencia(DI), mapeamento de classes de entidades do banco de dados(POCO) para models somente para retornar dados a fim de melhorar performance para o front-end.

- Foi feito em estrutura similar a de um micro-serviço, porém apontando para a mesma base de dados.

Dentro da pasta "Materiais" está o conteúdo informativo da proposta do projeto.

Dentro da pasta "APIS" ficarão todas WebAPI desenvolvidas para esse projeto.

Dentro da pasta "Helpers" estão classes que irão auxiliar no desenvolvimento e tratamento de fluxos:
- AppException.cs - É a classe que extende a classes de erro padrão, a fim de poder retornar um exception padronizado ja experado.
- AppSettings.cs - É a classe que pega o que contém nas configurações do json do projeto e traz para uma classes a fim de reutilizar no projeto.
- AutoMapperProfile.cs - É a classe que faz o mapeamento das models com suas classes de entidades do banco de dados.
- DataContext.cs - É a classe de contexto do banco de dados.
- ErrorHandler.cs - É a classe que vai validar os erros capturados pelo error handler e retornar a string que a api usará como retorno.
- HttpUser.cs - É a classe estatica que possui o id do usuário logado através do JWT token.

### Pré-requisitos

Ter uma IDE instalada que suporte C# e git para clonar o repositório

```
git clone https://github.com/CareplusBR/inst
```

### Instalação

Após clonar o projeto, abra a pasta do repostório que foi clonado em um terminal de comando, navegue até a pasta CarePlusAPI

Ex:

```
cd .\CarePlusAPI
```

E então execute o comando abaixo para baixar os pacotes necessários para realizar o build do projeto

```
dotnet restore
```

E depois execute o comando

```
dotnet run
```

Para executar o servidor local a fim de utilizar a API

### Template

Para adicionar o template de CRUD para sua SDK, basta fazer o seguinte, entre na pasta "Template" e selecione a pasta "BaseSemImagem" e abra ela através de um terminal, depois execute:

CASO USE WINDOWS:
```
dotnet new -i .\
```
CASO USE MACOS/LINUX
```
dotnet new -i ./
```

Depois para usa-lo, para executar o comando
```
dotnet new carepluscrud
```

Execute o mesmo procedimento para a pasta "BaseComImagem"

### API

Para a criação de uma nova API, vá até a pasta APIS através de um terminal e execute

```
dotnet new carepluscrud
```

### INSOMNIA

Ja foi mapeado toda a estrutura de consumo das APIs criadas, para ser utilizada no aplicativo Insomnia, caso queira utilizar, primeiro faça o donwload do mesmo em [Insomnia](https://insomnia.rest/download/)

Após sua instalação, abra ele, clique no workspace atual que fica abaixo do primeiro menu no topo da aplicação, se instalou agora o workspace terá o nome "INSOMNIA", logo após clique em "Import/Export".

Clique em "Import Data", logo após "From File" e selecione o arquivo na pasta "/Insomnia/template.json" para carregar todo o mapeamento do consumo das APIs criadas.

## Criado com

* [.Net Core 3.1 SDK](https://dotnet.microsoft.com/download) - Framework utilizado para as APIs
* [.Net Framework 4.7.2 SDK](https://dotnet.microsoft.com/download/dotnet-framework/net472) - Dependencia para .Net Core
* [Oracle Database](https://www.oracle.com/br/database/technologies/appdev/xe.html) - Banco de Dados

## Links úteis

* [XUnit](https://docs.microsoft.com/pt-br/dotnet/core/testing/unit-testing-with-dotnet-test) - Criar nova solução junto com projeto de teste
* [Code Coverage](https://medium.com/@lorranpalmeira/code-coverage-no-c-com-vscode-cfa3cb6c89d0) - Como adicionar cobertura de código do C# no VSCode

## Autores

* **Thiago de Sa** - *Desenvolvimento Inicial* - [Github](https://github.com/neotix-wendel-thiago)

* **Rafael Henrique** - [Github](https://github.com/neotix-rafaelhenrique)

Veja também os [contribuidores](https://github.com/neotix/CarePlus-InstitucionalAPI/contributors) que participam deste projeto.
