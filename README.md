# Service Worker

## O que é?
Service worker é um script que roda em uma segunda thread no navegador, separada da página.
Age como um proxy de rede, podendo interceptar todas as requisições da página.
Não tem acesso ao DOM, mas tem acesso ao cache-api, indexedDB, entre outros.
Exige HTTPS, a menos que esteja rodando local.
Se comunica com o frontend via mensagens, com Response Objects.

## Pra que serve?
É muito útil para armazenar e gerenciar cache, podendo manter o processamento pesado nele e decidir
o que fará com as requisições que passarem por ele. Permitindo assim a navegação offline com a utilização
do cache e mudando as respostas das requisições não críticas.

## Como funciona?

O service worker possui um ciclo de vida, onde alguns eventos ocorrem antes de ele começar a gerenciar requisições e outros eventos, sendo os principais a instalação e ativação, que ocorrem após o primeiro registro do service worker no navegador.

### Registro
Primeiramente precisamos verificar em um script se o navegador do usuário suporta o service worker, e em seguida
podemos registrar o nosso service worker no navegador. Isso é feito no script "js/main.js".

Após o registro, o service worker possui um ciclo de vida para funcionar corretamente, onde 
são seguidos alguns passos antes de começar a gerenciar as requisições. Isso é seguido no "sw.js".

Ao concluir o registro, é verificado se o service worker possui uma nova versão, onde se positivo, a nova versão é registrada e instalada, seguindo os próximos passos.

### Instalação
O primeiro passo é a instalação do service worker no navegador, que só ocorre uma vez e é a primeira coisa a ser
executada na thread, sendo assim, é um bom lugar para iniciar o armazenamento do nosso cache principal antes de
avançar.

### Ativação
Após a instalação, o service worker é ativado, e assim está disponível para uso após a primeira atualização, ou navegação, de página. Para o gerenciamento das requisições funcionar logo após a ativação, sem precisar esperar o usuário atualizar a página, é necessário incluir um chamado para "clients.claim()", mas ainda não será garantido o gerenciamento de todas as requisições, somente as pós ativação.

### Gerenciamento de requisições
Através do evento "fetch" é onde o controle das requisições funcionam, podendo utilizar a estratégia que vier em mente para retornar uma resposta para o seu usuário, sendo ela utilizando a internet, o cache ou outra resposta.
Esse evento deve sempre retornar uma resposta do tipo Response, utilizando algumas fuções como "event.respondWith", no qual só aceita Promises, então é bom tomar cuidado com a lógica de alguns chamados.

## Como testar?
Para apresentar foi utilizado o Live Server do VSCode, subindo um servidor local para modificar partes do código e verificar o funcionamento. Alguns pontos de atenção são o fato de que o evento fetch sempre deve ter uma resposta, utilizando o "event.respondWith", e o "caches.match" sempre será resolvido.