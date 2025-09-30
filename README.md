# Loja Online Adidas

## Visão Geral do Projeto
Este projeto é uma loja online fictícia da Adidas, desenvolvida como um trabalho acadêmico para o curso de **Sistemas de Informação na Facisa**. O objetivo é simular uma experiência de e-commerce completa, com funcionalidades como navegação por produtos, carrinho de compras interativo, cálculo de frete dinâmico e uma interface responsiva.

---

## Funcionalidades Implementadas
* **Carrossel de Imagens:** Na seção de início, um carrossel de imagens em tela cheia apresenta os destaques da marca de forma automática e atraente.
* **Navegação Rápida:** Os botões "Início", "Produtos" e "Contato" levam o usuário diretamente para as seções correspondentes da página. A seção de produtos fica oculta até ser acionada, garantindo uma experiência inicial focada no carrossel.
* **Filtros de Produtos:** Os usuários podem pesquisar produtos por nome (com e sem acento) e filtrar por tipo (calça, camisa, tênis, etc.) e categoria (training, casual, running, etc.).
* **Carrinho de Compras Interativo:** É possível adicionar produtos, ajustar a quantidade de itens no carrinho e remover produtos. O total da compra é atualizado em tempo real.
* **Cálculo de Frete Dinâmico:** O cálculo de frete é integrado com uma API para buscar o endereço do usuário a partir do CEP. O valor do frete é gerado de forma consistente para o mesmo CEP e é adicionado ao valor total da compra.
* **Notificações Visuais:** Notificações discretas aparecem quando um produto é adicionado ao carrinho, e mensagens de erro são exibidas de forma clara para validações de CEP e número de residência.
* **Redefinição de Estado:** Ao finalizar a compra ou recarregar a página, todos os dados são resetados e o usuário é redirecionado para o topo da página, pronto para uma nova sessão de compras.
* **Programação Orientada a Objetos (POO):** O projeto utiliza uma classe `Produto` para estruturar os dados de cada item da loja, tornando o código mais organizado e fácil de manter.

---

## Estrutura do Projeto
* `index.html`: O arquivo principal do projeto, que contém a estrutura completa da página, incluindo o carrossel, a seção de produtos, o modal do carrinho e o footer.
* `styles.css`: Contém toda a estilização da página, desde o layout do carrossel até o design dos botões e modais.
* `app.js`: O cérebro do projeto. É responsável por todas as interações dinâmicas, como o carrossel automático, a lógica de busca e filtro, a gestão do carrinho de compras e o cálculo do frete.
* `img/`: Pasta com as imagens de produtos e do carrossel.
* `video/`: Pasta com os vídeos de fundo dos produtos.

---

## Tecnologias Utilizadas
* **HTML5:** Para a estrutura e marcação do conteúdo.
* **CSS3:** Para o design, layout e animações.
* **JavaScript (ES6):** Para a lógica de interação, manipulação do DOM e funcionalidades dinâmicas.
* **BrasilAPI:** Utilizada para a validação e busca automática de endereços a partir do CEP.
* **Metodologia POO:** Utilização de classes para a organização do código.

---

## Como Executar o Projeto
Para visualizar e testar o projeto, basta abrir o arquivo `index.html` em qualquer navegador web moderno. Não é necessário nenhum servidor local.
1.  Faça o download ou clone o repositório.
2.  Abra o arquivo `index.html` no seu navegador de preferência (Google Chrome, Firefox, etc.).

---

## Contribuição
Contribuições são sempre bem-vindas! Se você tiver alguma sugestão, melhoria ou quiser reportar um problema, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.
