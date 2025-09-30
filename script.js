const buscaInput = document.getElementById("buscaInput");
const btnBuscar = document.getElementById("btnBuscar");
const tipoFilter = document.getElementById("tipoFilter");
const categoriaFilter = document.getElementById("categoriaFilter");

// Lógica do carrossel
let slideIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const numItems = carouselItems.length;

function showSlide() {
    carouselItems.forEach(item => item.classList.remove('active'));
    slideIndex++;
    if (slideIndex >= numItems) {
        slideIndex = 0;
    }
    carouselItems[slideIndex].classList.add('active');
}

setInterval(showSlide, 5000);

class Produto {
  constructor(id, nome, preco, img) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.img = img;
  }

  getPrecoFormatado() {
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
  }
}

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function aplicarBusca() {
  const termoBusca = removerAcentos(buscaInput.value.toLowerCase());
  const tipoSelecionado = tipoFilter.value;
  const categoriaSelecionada = categoriaFilter.value;

  document.querySelectorAll(".produto-card").forEach(card => {
    const nome = removerAcentos(card.dataset.nome.toLowerCase());
    const tipo = card.dataset.tipo;
    const categoria = card.dataset.categoria;

    const termoCorresponde = nome.includes(termoBusca);
    const tipoCorresponde = tipoSelecionado === "todos" || tipo === tipoSelecionado;
    const categoriaCorresponde = categoriaSelecionada === "todos" || categoria === categoriaSelecionada;

    if (termoCorresponde && tipoCorresponde && categoriaCorresponde) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

btnBuscar.addEventListener("click", aplicarBusca);
buscaInput.addEventListener("keyup", e => {
  if (e.key === "Enter") aplicarBusca();
});
tipoFilter.addEventListener("change", aplicarBusca);
categoriaFilter.addEventListener("change", aplicarBusca);

const carrinho = [];
const carrinhoModal = document.getElementById("carrinhoModal");
const itensCarrinho = document.getElementById("itensCarrinho");
const carrinhoTotal = document.getElementById("carrinhoTotal");
const carrinhoQtd = document.getElementById("carrinhoBadge");
const notificacao = document.getElementById("notificacao");
const fretePorCEP = {};

document.getElementById("btnCarrinho").addEventListener("click", () => {
  carrinhoModal.classList.remove("hidden");
});
document.getElementById("fecharCarrinho").addEventListener("click", () => {
  carrinhoModal.classList.add("hidden");
});

function mostrarNotificacao() {
  notificacao.classList.add("show");
  setTimeout(() => {
    notificacao.classList.remove("show");
  }, 2000);
}

function adicionarCarrinho(produto) {
  const itemExistente = carrinho.find(p => p.id === produto.id);
  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({...produto, qtd:1});
  }
  atualizarCarrinho();
  mostrarNotificacao();
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;
  let qtdTotal = 0;

  carrinho.forEach(item => {
    total += item.preco * item.qtd;
    qtdTotal += item.qtd;

    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nome}">
      <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
      <input type="number" min="1" value="${item.qtd}" data-id="${item.id}" class="qtd-input">
      <button class="btn-remover" data-id="${item.id}">X</button>
    `;
    itensCarrinho.appendChild(div);
  });

  carrinhoTotal.textContent = total.toFixed(2);
  carrinhoQtd.textContent = qtdTotal;

  document.querySelectorAll(".qtd-input").forEach(input => {
    input.addEventListener("change", e => {
      const id = e.target.dataset.id;
      const novaQtd = parseInt(e.target.value);
      const item = carrinho.find(p => p.id === id);
      if(item) item.qtd = novaQtd > 0 ? novaQtd : 1;
      atualizarCarrinho();
    });
  });

  document.querySelectorAll(".btn-remover").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const index = carrinho.findIndex(p => p.id === id);
      if (index !== -1) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
      }
    });
  });
}

const detalhesModal = document.getElementById("detalhesModal");
const detalhesImg = document.getElementById("detalhesImg");
const detalhesNome = document.getElementById("detalhesNome");
const detalhesPreco = document.getElementById("detalhesPreco");
const detalhesDescricao = document.getElementById("detalhesDescricao");
const fecharDetalhes = document.getElementById("fecharDetalhes");
const btnFecharDetalhes = document.getElementById("btnFecharDetalhes");
const btnAdicionarDetalhes = document.getElementById("btnAdicionarDetalhes");
let produtoAtualDetalhes = null;

function abrirDetalhes(produto) {
  produtoAtualDetalhes = produto;
  detalhesImg.src = produto.img;
  detalhesNome.textContent = produto.nome;
  detalhesPreco.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
  detalhesDescricao.textContent = `Este é um produto exclusivo da Adidas: qualidade premium, conforto e estilo para o seu dia a dia.`;
  detalhesModal.classList.remove("hidden");
}

document.querySelectorAll(".produto-card").forEach(card => {
  const id = card.dataset.id;
  const nome = card.dataset.nome;
  const preco = parseFloat(card.dataset.preco);
  const imgSrc = card.querySelector(".produto-img").src;

  const produto = new Produto(id, nome, preco, imgSrc);

  card.querySelector(".btn-add").addEventListener("click", () => {
    adicionarCarrinho(produto);
  });

  card.querySelector(".btn-detalhes").addEventListener("click", () => {
    abrirDetalhes(produto);
  });

  const video = card.querySelector(".produto-video");
  card.addEventListener("mouseenter", () => { if(video) video.play(); });
  card.addEventListener("mouseleave", () => { if(video){ video.pause(); video.currentTime = 0; } });
});

fecharDetalhes.addEventListener("click", () => detalhesModal.classList.add("hidden"));
btnFecharDetalhes.addEventListener("click", () => detalhesModal.classList.add("hidden"));
detalhesModal.addEventListener("click", e => {
  if (e.target === detalhesModal) detalhesModal.classList.add("hidden");
});

btnAdicionarDetalhes.addEventListener("click", () => {
  if (produtoAtualDetalhes) {
    adicionarCarrinho(produtoAtualDetalhes);
    detalhesModal.classList.add("hidden");
  }
});

document.querySelector(".btn-finalizar").addEventListener("click", () => {
  if(carrinho.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }
  document.querySelector(".endereco-box").classList.add("hidden");
  document.getElementById("carrinhoModal").classList.add("hidden");
  document.getElementById("pedidoConcluidoModal").classList.remove("hidden");
});

document.getElementById('nav-produtos').addEventListener('click', (e) => {
  const produtosSection = document.getElementById('produtos-section');
  if (produtosSection.classList.contains('hidden-section')) {
    e.preventDefault();
    produtosSection.classList.remove('hidden-section');
    document.getElementById('produtos-section').scrollIntoView({ behavior: 'smooth' });
  }
});

document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('produtos-section').classList.add('hidden-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function buscarCep(cepLimpo) {
  const cepError = document.getElementById('cepError');
  cepError.innerText = '';
  document.getElementById('enderecoInfo').classList.add('hidden');
  document.getElementById('numeroGroup').classList.add('hidden');
  document.querySelector(".frete-info").classList.add("hidden");
  
  fetch(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`)
    .then(res => {
      if(!res.ok) throw new Error("CEP não encontrado");
      return res.json();
    })
    .then(data => {
      document.getElementById('logradouro').innerText = data.street || "N/A";
      document.getElementById('bairro').innerText = data.neighborhood || "N/A";
      document.getElementById('cidade').innerText = data.city || "N/A";
      document.getElementById('uf').innerText = data.state || "N/A";
      
      document.getElementById('enderecoInfo').classList.remove('hidden');
      document.getElementById('numeroGroup').classList.remove('hidden');
    })
    .catch(err => {
      cepError.innerText = "CEP não encontrado.";
      document.getElementById('enderecoInfo').classList.add('hidden');
      document.getElementById('numeroGroup').classList.add('hidden');
      document.querySelector(".frete-info").classList.add("hidden");
    });
}

document.getElementById('cepInput').addEventListener('input', function() {
  const cepLimpo = this.value.trim().replace(/\D/g, '');
  if (cepLimpo.length === 8) {
    buscarCep(cepLimpo);
  } else {
    document.getElementById('cepError').innerText = 'CEP deve ter 8 dígitos.';
    document.getElementById('enderecoInfo').classList.add('hidden');
    document.getElementById('numeroGroup').classList.add('hidden');
    document.querySelector(".frete-info").classList.add("hidden");
  }
});

document.getElementById('cepForm').addEventListener('submit', function(e){
  e.preventDefault();
  const cepInput = document.getElementById('cepInput').value.trim();
  const cepLimpo = cepInput.replace(/\D/g,'');
  const numeroInput = document.getElementById('numeroInput').value.trim();

  document.getElementById('numeroError').classList.add('hidden');
  document.getElementById('numeroInput').classList.remove('error-input');
  document.getElementById('cepError').innerText = '';

  if (cepLimpo.length !== 8) {
    document.getElementById('cepError').innerText = 'CEP deve ter 8 dígitos.';
    document.getElementById('cepInput').focus();
    return;
  }
  
  if (numeroInput === "") {
    document.getElementById('numeroError').classList.remove('hidden');
    document.getElementById('numeroInput').focus();
    document.querySelector(".frete-info").classList.add("hidden");
    return;
  }

  const total = parseFloat(carrinhoTotal.textContent);
  let frete;

  if (cepLimpo in fretePorCEP) {
    frete = fretePorCEP[cepLimpo];
  } else {
    const percentualFrete = Math.random() * 0.15;
    frete = (total * percentualFrete).toFixed(2);
    fretePorCEP[cepLimpo] = frete;
  }

  const totalComFrete = (total + parseFloat(frete)).toFixed(2);
  
  document.getElementById("valorFrete").textContent = frete;
  document.getElementById("totalComFrete").textContent = totalComFrete;
  document.querySelector(".frete-info").classList.remove("hidden");
});

document.getElementById("fecharPedidoConcluido").addEventListener("click", () => {
  document.getElementById("pedidoConcluidoModal").classList.add("hidden");
  carrinho.length = 0;
  atualizarCarrinho();
  
  document.getElementById('cepInput').value = '';
  document.getElementById('numeroInput').value = '';
  document.getElementById('enderecoInfo').classList.add('hidden');
  document.getElementById('numeroGroup').classList.add('hidden');
  document.querySelector(".frete-info").classList.add("hidden");

  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.getElementById('produtos-section').classList.add('hidden-section');
});

window.addEventListener('beforeunload', () => {
  localStorage.clear();
});