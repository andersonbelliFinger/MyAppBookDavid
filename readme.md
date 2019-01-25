# Myappbook

Aplicativo para o sistema Myappbook 

  - Comunicação real com o sistema
  - Necessita conexão com a internet
  - Aplicativo apenas de consulta (não é possível inserir, alterar ou excluir informações)
   

Funcionalidades apresentadas:
 - Login com a conta de usuário do sistema
 - Apresentação de agendamentos
 - Administradores podem ver agendamentos de todos os profissionais
 - Os agendamentos podem ser ordenar por horário e nome do cliente
 - Filtro de agendamento por status
 - Logout

### Opções de proxy

Para utilizar as opções abaixo dentro de um proxy, os seguintes arquivos devem ser configurados:

.bowerrc (adicionar ao JSON)
```json
{
  "proxy": "http://user:pass@proxy_ip:port",
  "https-proxy":"http://user:pass@proxy_ip:port"
}
```

Na raíz do projeto executar o comando abaixo (muitas dependências baixam bibliotecas do GIT)

```ssh
$ git config --global http.proxy http://user:pass@proxy_ip:port
$ git config --global https.proxy http://user:pass@proxy_ip:port
```

O Node também deve ter o proxy configurado

```ssh
$ npm config set proxy http://user:pass@proxy_ip:port
$ npm config set https-proxy http://user:pass@proxy_ip:port
```

Variáveis de ambiente também devem ser criadas, pois o Ionic Resources não utiliza o proxy do Node (mas sim o do sistema operacional).

```ssh
windows $ set http_proxy=http://user:pass@proxy_ip:port
windows $ set https_proxy=http://user:pass@proxy_ip:port
linux   $ export http_proxy=http://user:pass@proxy_ip:port
linux   $ export https_proxy=http://user:pass@proxy_ip:port
macos   $ export http_proxy=http://user:pass@proxy_ip:port
macos   $ export https_proxy=http://user:pass@proxy_ip:port
```

### Dependências do aplicativo

O aplicativo requer as dependências do [Ionic] ([NodeJS], [Cordova], etc) as dependências da plataforma em que será executada (Android SDK e HOME_ADROID para o SO Android e XCode e conta de desenvolvedor Apple para o SO IOS), para isso, basta executar um dos comandos abaixo (ambas as plataformas, Android e IOS, respectivamente) dentro da pasta.

```sh
$ ionic cordova platform add
$ ionic cordova platform add android
$ ionic cordova platform add ios
```

Com um desses comandos, todos os módulos e dependências da aplicação serão baixados e configurados pelo sistema.

Será necessário também executar o comando abaixo para baixar as imagens do aplicativo nos formatos exigidos pela ferramenta 

```sh
$ ionic cordova resources
```

### Testes no navegador

Para testar o aplicativono navegador basta executar o comando abaixo (as demais opções de teste podem ser encontradas na documentação do Ionic)

```sh
$ ionic serve
```

### Testes no smartphone

Para testar o aplicativo, basta executar o comando abaixo dentro da pasta do projeto:

Caso "--device" não seja passado, o dispositivo de exibição será perguntado
```sh
$ cordova run android --device
```

A conta de desenvolvedor Apple deve estar ativa e selecionada para o projeto, isso pode ser feito abrindo o projeto no XCode (através do arquivo platforms/ios/app.xcodeproject) e selecionando o time de desenvolvimento nas configurações de build
```sh
$ cordova run ios --device
```

### A fazer

 - Implementar API segura para comunicação
 - Adicionar notificações de novos agendamentos
 - Visualizar detalhes do agendamento
 - Pesquisar agendamento


Obrigado,
David Deizepi

[//]: # (Links utilizados nessa referência)

   [Ionic]: <https://ionicframework.com/docs/>
   [Cordova]: <https://cordova.apache.org/>
   [NodeJS]: <https://nodejs.org/en/>