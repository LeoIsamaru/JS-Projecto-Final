/* =========================================================
   Gestor de Despesas Pessoais — script.js
  1. Dados fixos (textos PT/EN, categorias, fusos, cidades)
  2. Estado e referências ao HTML
  3. Idioma (localStorage) 
  4. Tema (claro/escuro) (localStorage) 
  5. Login (localStorage)        
  6. Despesas (localStorage)        
  7. BITCOIN (pop-up)        
  8. Eventos e arranque
   ========================================================= */


  /* =========================================================
             ----------  1. DADOS FIXOS  ---------- 
   ========================================================= */


/* Todos os textos do site nos dois idiomas
data-i18n="chave" indica o texto a usar */
const TEXTOS = {
  pt: {
    "app.titulo": "Gestor de Despesas Pessoais",
    "app.nome": "Gestor de Despesas",
    "saudacao": "Olá",
    "login.entrar": "Entrar",
    "login.sub": "Introduza os seus dados para começar a registar despesas.",
    "loginTest.sub": "(Login Teste pronto a entar. Código com placeholder disponivel no html!)",
    "login.nome": "Nome",
    "login.nomePh": "O seu nome",
    "login.erroNome": "Indique o seu nome.",
    "login.pass": "Palavra-passe",
    "login.erroPass": "Indique a palavra-passe.",
    "nav.sair": "Sair",
    "form.titulo": "Nova despesa",
    "form.descPh": "Ex.: Almoço no trabalho",
    "form.adicionar": "Adicionar despesa",
    "campo.descricao": "Descrição",
    "campo.valor": "Valor",
    "campo.categoria": "Categoria",
    "campo.escolher": "Escolher",
    "campo.data": "Data",
    "erro.data": "Indique uma data.",
    "erro.descricao": "Indique uma descrição.",
    "erro.valor": "Valor inválido.",
    "erro.categoria": "Escolha uma categoria.",
    "tempo.titulo": "Tempo",
    "tempo.carregando": "A carregar dados...",
    "tempo.erro": "Não foi possível obter o tempo.",
    "tempo.vento": "Vento",
    "tempo.humidade": "Humidade",
    "tempo.limpo": "Céu limpo",
    "tempo.nublado": "Parcialmente nublado",
    "tempo.nevoeiro": "Nevoeiro",
    "tempo.chuvisco": "Chuvisco",
    "tempo.chuva": "Chuva",
    "tempo.neve": "Neve",
    "tempo.aguaceiros": "Aguaceiros",
    "tempo.trovoada": "Trovoada",
    "total.titulo": "Total gasto",
    "total.despesas": "despesa(s)",
    "filtro.label": "Filtrar por categoria",
    "filtro.todas": "Todas",
    "lista.titulo": "Despesas",
    "lista.vazio": "Ainda não há despesas. Adicione a primeira no formulário ou nas definições em modo aleatório.",
    "lista.acoes": "Ações",
    "lista.editar": "Editar",
    "lista.apagar": "Apagar",
    "lista.confirmar": "Apagar esta despesa?",
    "lista.apagarTodas": "Apagar todas",
    "lista.confirmarTodas": "Apagar todas as {n} despesas?",
    "lista.confirmarCategoria": "Apagar {n} despesa(s) da categoria {cat}?",
    "confirmar.titulo": "Confirmar eliminação",
    "modal.titulo": "Editar despesa",
    "modal.cancelar": "Cancelar",
    "modal.guardar": "Guardar alterações",
    "opcoes.titulo": "Opções",
    "opcoes.fuso": "Horário",
    "opcoes.cidade": "Cidade para o tempo",
    "opcoes.guardar": "Guardar",
    "opcoes.exemplos": "Despesas de exemplo",
    "opcoes.exemplosInfo": "Cria um conjunto de despesas aleatórias ao longo do ano, em todas as categorias.",
    "opcoes.gerar": "Gerar despesas",
    "rodape": "Leonel Silva · CESAE · WEBS · JS Projeto Final · Gestor de Despesas Pessoais",
    "btc.titulo": "Pssst! Já ouviste falar de Bitcoin?",
    "btc.intro": "Com o total das tuas despesas podias ter comprado:",
    "btc.total": "Total das despesas",
    "btc.preco": "Preço atual de 1 BTC",
    "btc.vazio": "Ainda não tens despesas registadas.",
    "btc.erro": "Não foi possível obter o preço do bitcoin.",
  },
  en: {
    "app.titulo": "Personal Expense Tracker",
    "app.nome": "Expense Tracker",
    "saudacao": "Hello",
    "login.entrar": "Sign in",
    "login.sub": "Enter your details to start logging expenses.",
    "loginTest.sub": "(Login Test ready to go. Code with placeholder available on the html!)",
    "login.nome": "Name",
    "login.nomePh": "Your name",
    "login.erroNome": "Enter your name.",
    "login.pass": "Password",
    "login.erroPass": "Enter the password.",
    "nav.sair": "Log out",
    "form.titulo": "New expense",
    "form.descPh": "E.g.: Lunch at work",
    "form.adicionar": "Add expense",
    "campo.descricao": "Description",
    "campo.valor": "Amount",
    "campo.categoria": "Category",
    "campo.escolher": "Choose",
    "campo.data": "Date",
    "erro.data": "Enter a date.",
    "erro.descricao": "Enter a description.",
    "erro.valor": "Invalid amount.",
    "erro.categoria": "Choose a category.",
    "tempo.titulo": "Weather",
    "tempo.carregando": "Loading data...",
    "tempo.erro": "Could not get the weather.",
    "tempo.vento": "Wind",
    "tempo.humidade": "Humidity",
    "tempo.limpo": "Clear sky",
    "tempo.nublado": "Partly cloudy",
    "tempo.nevoeiro": "Fog",
    "tempo.chuvisco": "Drizzle",
    "tempo.chuva": "Rain",
    "tempo.neve": "Snow",
    "tempo.aguaceiros": "Showers",
    "tempo.trovoada": "Thunderstorm",
    "total.titulo": "Total spent",
    "total.despesas": "expense(s)",
    "filtro.label": "Filter by category",
    "filtro.todas": "All",
    "lista.titulo": "Expenses",
    "lista.vazio": "No expenses yet. Add the first one in the form or at Settings for random bulk entries.",
    "lista.acoes": "Actions",
    "lista.editar": "Edit",
    "lista.apagar": "Delete",
    "lista.confirmar": "Delete this expense?",
    "lista.apagarTodas": "Delete all",
    "lista.confirmarTodas": "Delete all {n} expenses?",
    "lista.confirmarCategoria": "Delete {n} expense(s) in the category {cat}?",
    "confirmar.titulo": "Confirm deletion",
    "modal.titulo": "Edit expense",
    "modal.cancelar": "Cancel",
    "modal.guardar": "Save changes",
    "opcoes.titulo": "Options",
    "opcoes.fuso": "Time zone",
    "opcoes.cidade": "City for the weather",
    "opcoes.guardar": "Save",
    "opcoes.exemplos": "Sample expenses",
    "opcoes.exemplosInfo": "Creates a set of random expenses across the year, in every category.",
    "opcoes.gerar": "Generate expenses",
    "rodape": "Leonel Silva · CESAE · WEBS · JS Final Project · Personal Expense Tracker",
    "btc.titulo": "Psst! Ever heard of Bitcoin?",
    "btc.intro": "With the total of your expenses you could have bought:",
    "btc.total": "Total expenses",
    "btc.preco": "Current price of 1 BTC",
    "btc.vazio": "You have no expenses yet.",
    "btc.erro": "Could not get the bitcoin price.",
  },
};

/* Categoria: {blocos de texto a serem usados conforme a lingua selectionada}
 */
const CATEGORIAS = {
    "Alimentação": { pt: "Alimentação", en: "Food" },
  "Transportes": { pt: "Transportes", en: "Transport" },
  "Habitação": { pt: "Habitação", en: "Housing" },
  "Lazer": { pt: "Lazer", en: "Leisure" },
  "Finanças": { pt: "Finanças", en: "Finance" },
  "Saúde": { pt: "Saúde", en: "Health" },
  "Educação": { pt: "Educação", en: "Education" },
  "Outros": { pt: "Outros", en: "Other" },
};

/* Fusos horários disponíveis (o id é o nome IANA usado pela API time.now)
https://time.now/developer
GET https://time.now/developer/api/timezone/Europe/Lisbon */
const FUSOS = [
  { id: "Europe/Lisbon", pt: "Lisboa", en: "Lisbon" },
  { id: "Atlantic/Madeira", pt: "Madeira" },
  { id: "Atlantic/Azores", pt: "Açores", en: "Azores" },
  { id: "Europe/Paris", pt: "Paris", en: "Paris" },
  { id: "Europe/Madrid", pt: "Madrid" },
  { id: "America/Sao_Paulo", pt: "São Paulo" },
  { id: "Asia/Tokyo", pt: "Tóquio", en: "Tokyo" },
];

/* Cidades para o tempo/clima (coordenadas usadas pela API Open-Meteo)
https://open-meteo.com/en/docs 
https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` + `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m
*/
const CIDADES = [
  { id: "lisboa", pt: "Lisboa", en: "Lisbon", lat: 38.72, lon: -9.14 },
  { id: "porto", pt: "Porto", lat: 41.15, lon: -8.61 },
  { id: "setubal", pt: "Setúbal", lat: 38.52, lon: -8.89 },
  { id: "coimbra", pt: "Coimbra", lat: 40.21, lon: -8.43 },
  { id: "faro", pt: "Faro", lat: 37.02, lon: -7.93 },
  { id: "funchal", pt: "Funchal", lat: 32.65, lon: -16.91 },
  { id: "ponta-delgada", pt: "Ponta Delgada", lat: 37.74, lon: -25.67 },
];

// Exemplos de despesas para a bulk entry: categoria,{intervalo de valores (€):[descrições]} 
const EXEMPLOS = {
  "Alimentação": { min: 1, max: 150, descricoes: ["Compras no supermercado", "Almoço no restaurante", "Café e pastel de nata", "Padaria", "Comida take-away"] },
  "Transportes": { min: 2, max: 80, descricoes: ["Passe mensal", "Combustível", "Bilhete de comboio", "Portagens", "Táxi"] },
  "Habitação": { min: 400, max: 650, descricoes: ["Renda", "Conta da eletricidade", "Conta da água", "Internet e TV", "Material de bricolage"] },
  "Lazer": { min: 2, max: 120, descricoes: ["Bilhetes de cinema", "Concerto ao vivo", "Jantar com amigos", "Jogo de tabuleiro", "Escapadinha de fim de semana"] },
  "Finanças": { min: 5, max: 500, descricoes: ["Bitcoin","Comissão de manutenção da conta", "Seguro automóvel", "Seguro de saúde", "Comissão bancária", "Imposto"] },
  "Saúde": { min: 5, max: 70, descricoes: ["Consulta médica", "Farmácia", "Análises clínicas", "Consulta de dentista", "Óculos", "",] },
  "Educação": { min: 10, max: 150, descricoes: ["Livro técnico", "Curso online", "Material escolar", "Inscrição em formação", "Propina"] },
  "Outros": { min: 5, max: 60, descricoes: ["Presente de aniversário", "Cabeleireiro", "Donativo", "Reparação de telemóvel", "Lavandaria"] },
};
const QTD_EXEMPLOS = 30; // quantas despesas cada clique em "Gerar despesas" cria





  /* =========================================================
          ----------  2. ESTADO E REFERÊNCIAS  ---------- 
   ========================================================= */

const $ = (id) => document.getElementById(id); // atalho para getElementById

let idioma = localStorage.getItem("idioma") || "pt";
let opcoes = JSON.parse(localStorage.getItem("opcoes")) || {
  fuso: "Europe/Lisbon",
  cidade: "lisboa",
};
let diferencaMs = 0;   // diferença entre a hora da API e a do computador
let ultimoTempo = null; // últimos dados do tempo (para re-escrever ao mudar idioma)
let despesas = carregarDespesas(); // lista de despesas guardadas em localStorage { id, descricao, valor, categoria, data_despesa, created_at }



  /* =========================================================
                ----------  3. IDIOMA  ---------- 
   ========================================================= */

/*
  t(chave)
  Devolve o texto da chave no idioma atual.
  Se a chave não existir, devolve a própria chave (ajuda a detetar erros).
 */
function t(chave) {
  return TEXTOS[idioma][chave] || chave;
}

/*
  nomeDe(item)
  Devolve o nome de um fuso/cidade no idioma atual.
  Se não houver tradução (en), usa o nome em português.
 */
function nomeDe(item) {
  return item[idioma] || item.pt;
}

/*
  traduzirCategoria(valor)
  Converte o valor guardado (ex.: "Lazer") para o texto do idioma atual.
  Útil mais tarde, ao desenhar as linhas da tabela de despesas.
 */
function traduzirCategoria(valor) {
  return CATEGORIAS[valor] ? CATEGORIAS[valor][idioma] : valor;
}

/*
  localeAtual()
  Devolve o código de idioma usado nas datas e horas.
 */
function localeAtual() {
  return idioma === "pt" ? "pt-PT" : "en-GB";
}

/*
  aplicarIdioma()
  Atualiza todos os textos da página para o idioma atual:
  - elementos com data-i18n e placeholders com data-i18n-placeholder
  - nomes das categorias nos <select>
  - listas de fusos e cidades, título da página, saudação, data/hora e descrição do tempo
 */
function aplicarIdioma() {
  document.documentElement.lang = idioma === "pt" ? "pt-PT" : "en";
  document.title = t("app.titulo");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Traduz só o texto das categorias (o value mantém-se em português)
  document.querySelectorAll("option").forEach((op) => {
    if (CATEGORIAS[op.value]) op.textContent = CATEGORIAS[op.value][idioma];
  });

  preencherOpcoes();
  const destino = idioma === "pt" ? "EN" : "PT";
  $("idiomaDestino").textContent = destino;
  $("idiomaDestinoLogin").textContent = destino;
  atualizarSaudacao();
  atualizarRelogio();
  mostrarTempo();
  desenharDespesas();
}

/*
  mudarIdioma()
  Corre ao clicar no botão de idioma.
  Alterna entre pt e en, guarda a escolha no localStorage e volta a escrever os textos.
 */
function mudarIdioma() {
  idioma = idioma === "pt" ? "en" : "pt";
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
}




  /* =========================================================
          ----------  4. TEMA (claro/escuro)  ---------- 
   ========================================================= */

/*
  aplicarTema(tema)
  O ícone mostra o tema para onde se vai mudar (sol no escuro, lua no claro).
 */
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-bs-theme", tema);
  const icone = tema === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
  $("iconeTema").className = icone; // ícone do botão na navbar
  $("iconeTemaLogin").className = icone; // ícone do botão no login
}


/*
  alternarTema()
  Corre ao clicar no botão do tema.
  Troca entre claro e escuro e guarda a escolha no localStorage.
 */
function alternarTema() {
  const atual = document.documentElement.getAttribute("data-bs-theme");
  const novo = atual === "dark" ? "light" : "dark";
  aplicarTema(novo);
  localStorage.setItem("tema", novo);
}

/*
  carregarTema()
  Corre ao abrir a página.
  Usa o tema guardado; se nunca escolheste, segue o do sistema operativo.
 */
function carregarTema() {
  const guardado = localStorage.getItem("tema");
  const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  aplicarTema(guardado || (sistemaEscuro ? "dark" : "light"));
}



  /* =========================================================
             ----------  5. LOGIN  ---------- 
   ========================================================= */

/*
  atualizarSaudacao()
  Escreve "Olá, Nome" (ou "Hello, Nome") na barra de topo, se houver um nome guardado na sessão.
 */
function atualizarSaudacao() {
  const nome = localStorage.getItem("nome");
  if (nome) $("saudacao").textContent = `${t("saudacao")}, ${nome}`;
}

/*
  mostrarApp()
  Esconde o login e mostra a aplicação (d-none esconde elementos).
 */
function mostrarApp() {
  atualizarSaudacao();
  $("secaoLogin").classList.add("d-none");
  $("secaoApp").classList.remove("d-none");
}

/*
  mostrarLogin()
  Volta ao ecrã de login: limpa os campos e os avisos de erro.
 */
function mostrarLogin() {
  $("formLogin").reset();
  $("loginNome").classList.remove("is-invalid");
  $("loginPassword").classList.remove("is-invalid");
  $("secaoApp").classList.add("d-none");
  $("secaoLogin").classList.remove("d-none");
}

/*
  fazerLogin(e)
  Corre ao submeter o formulário de login.
  - e.preventDefault() impede o recarregamento da página.
  - Valida os campos (is-invalid marca os vazios).
  - Se estiver tudo preenchido, guarda o nome em localStorage e mostra a aplicação.
  - Não existe autenticação real: qualquer nome e palavra-passe são aceites.
 */
function fazerLogin(e) {
  e.preventDefault();

  const nome = $("loginNome").value.trim();
  const pass = $("loginPassword").value.trim();

  $("loginNome").classList.toggle("is-invalid", !nome);
  $("loginPassword").classList.toggle("is-invalid", !pass);
  if (!nome || !pass) return;

  localStorage.setItem("nome", nome);
  mostrarApp();
}

/*
  terminarSessao()
  Apaga o nome da sessão e volta ao login.
 */
function terminarSessao() {
  localStorage.removeItem("nome");
  mostrarLogin();
}

/*
  verificarSessao()
  Ao abrir a página: se já existir sessão, salta o login.
 */
function verificarSessao() {
  if (localStorage.getItem("nome")) mostrarApp();
}





  /* =========================================================
             ----------  6. DESPESAS  ---------- 
   ========================================================= */

/*
  carregarDespesas()
  Lê a lista guardada (JSON) no localStorage (chave "despesas").
  Se não existir ou estiver corrompida, devolve uma lista vazia.
 */
function carregarDespesas() {
  try {
    return JSON.parse(localStorage.getItem("despesas")) || [];
  } catch (error) {
    return [];
  }
}

/*
  guardarDespesas()
  Converte e grava a lista atual no localStorage, como JSON
  Chamar sempre que a lista mudar (adicionar, editar, apagar).
 */
function guardarDespesas() {
  localStorage.setItem("despesas", JSON.stringify(despesas));
}

/*
  formatarNumero(valor)
  Escreve um número com 2 casas decimais no idioma atual (ex.: 1 234,50).
 */
function formatarNumero(valor) {
  return valor.toLocaleString(localeAtual(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


/*
  formatarEuros(valor)
  Escreve um número como moeda no idioma atual (ex.: 1 234,50 €).
 */
function formatarEuros(valor) {
  return valor.toLocaleString(localeAtual(), {
    style: "currency",
    currency: "EUR",
  });
}


/*
  formatarData(iso)
  Converte "2026-11-05" em texto no idioma atual (ex.: 5 de nov. de 2026).
  O "T00:00:00" evita que o fuso horário mude o dia.
 */
function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString(localeAtual(), {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/*
  hojeISO()
  Devolve o dia atual no formato AAAA-MM-DD, no fuso horário escolhido nas opções (o mesmo do relógio).
  O "sv-SE" escreve a data já nesse formato.
 */
function hojeISO() {
  return new Date(Date.now() + diferencaMs).toLocaleDateString("sv-SE", {
    timeZone: opcoes.fuso,
  });
}

/*
  definirDataHoje()
  Põe o dia atual no campo de data do formulário "Nova despesa".
  O utilizador pode depois escolher outro dia no calendário.
 */
function definirDataHoje() {
  $("dataDespesa").value = hojeISO();
}

/*
  classeCategoria(categoria)
  Devolve a classe CSS da etiqueta da categoria:
  "Alimentação" -> "cat-alimentacao", "Finanças" -> "cat-financas".
 */
function classeCategoria(categoria) {
  const slug = categoria
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira os acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `cat-${slug}`;
}

/*
  lerDespesa(campoDescricao, campoValor, campoCategoria, campoData)
  Lê e valida os 4 campos (serve para o formulário e para o modal de edição).
  Marca com is-invalid os que estiverem errados.
  Devolve { descricao, valor, categoria, data_despesa }, ou null se houver erros.
 */
function lerDespesa(campoDescricao, campoValor, campoCategoria, campoData) {
  const descricao = campoDescricao.value.trim();
  const valor = Math.round(parseFloat(campoValor.value) * 100) / 100;
  const categoria = campoCategoria.value;
  const data_despesa = campoData.value; // AAAA-MM-DD (vazio se apagarem a data)

  const okDescricao = descricao !== "";
  const okValor = valor > 0; // se o campo estiver vazio, valor é NaN e dá false
  const okCategoria = categoria !== "";
  const okData = data_despesa !== "";

  campoDescricao.classList.toggle("is-invalid", !okDescricao);
  campoValor.classList.toggle("is-invalid", !okValor);
  campoCategoria.classList.toggle("is-invalid", !okCategoria);
  campoData.classList.toggle("is-invalid", !okData);

  if (!okDescricao || !okValor || !okCategoria || !okData) return null;
  return { descricao, valor, categoria, data_despesa };
}

/*
  criarLinha(d)
  Cria a <tr> de uma despesa: descrição com data, etiqueta da categoria, valor e botões editar/apagar.
  O texto escrito pelo utilizador entra com textContent (e não innerHTML) para não executar HTML malicioso.
 */
function criarLinha(d) {
  const tr = document.createElement("tr");

  // Descrição + data
  const tdDescricao = document.createElement("td");
  tdDescricao.className = "ps-4";
  const descricao = document.createElement("div");
  descricao.textContent = d.descricao;
  const data = document.createElement("div");
  data.className = "small text-body-secondary";
  data.textContent = formatarData(d.data_despesa);
  tdDescricao.append(descricao, data);

  // Categoria (etiqueta colorida)
  const tdCategoria = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `badge ${classeCategoria(d.categoria)}`;
  badge.textContent = traduzirCategoria(d.categoria);
  tdCategoria.appendChild(badge);

  // Valor
  const tdValor = document.createElement("td");
  tdValor.className = "text-end valor-celula";
  tdValor.textContent = formatarEuros(d.valor);

  // Ações
  const tdAcoes = document.createElement("td");
  tdAcoes.className = "text-end pe-4 text-nowrap";
  tdAcoes.innerHTML = `
    <button type="button" class="btn btn-outline-secondary btn-sm" data-acao="editar" title="${t("lista.editar")}" aria-label="${t("lista.editar")}">
      <i class="bi bi-pencil"></i>
    </button>
    <button type="button" class="btn btn-outline-danger btn-sm" data-acao="apagar" title="${t("lista.apagar")}" aria-label="${t("lista.apagar")}">
      <i class="bi bi-trash"></i>
    </button>`;
  tdAcoes.querySelectorAll("button").forEach((b) => (b.dataset.id = d.id));

  tr.append(tdDescricao, tdCategoria, tdValor, tdAcoes);
  return tr;
}

/*
  despesasDoFiltro()
  Devolve as despesas da categoria escolhida em #filtroCategoria (ou todas, se o filtro for "todas").
  É uma cópia: ordenar não altera a lista original.
 */
function despesasDoFiltro() {
  const filtro = $("filtroCategoria").value;
  return despesas.filter((d) => filtro === "todas" || d.categoria === filtro);
}

/*
  desenharDespesas()
  Redesenha a tabela e atualiza o total, a contagem e a informação do filtro.
  Mostra só as despesas da categoria escolhida em #filtroCategoria ("todas" mostra tudo), das mais recentes para as mais antigas.
  Corre sempre que a lista, o filtro ou o idioma mudam.
 */
function desenharDespesas() {
  const filtro = $("filtroCategoria").value;
  const visiveis = despesasDoFiltro()
    .sort(
      (a, b) =>
        (b.data_despesa || "").localeCompare(a.data_despesa || "") ||
        (b.created_at || "").localeCompare(a.created_at || "")
    );

  const corpo = $("listaDespesas");
  corpo.innerHTML = "";
  visiveis.forEach((d) => corpo.appendChild(criarLinha(d)));

  // Mostra a tabela ou a mensagem de lista vazia
  const vazio = visiveis.length === 0;
  $("semDespesas").classList.toggle("d-none", !vazio);
  $("tabelaDespesas").classList.toggle("d-none", vazio);

  // Total e contagem (seguem o filtro)
  const total = visiveis.reduce((soma, d) => soma + Number(d.valor), 0);
  $("totalGasto").textContent = formatarNumero(total);
  $("totalContagem").textContent = visiveis.length;
  $("totalFiltroInfo").textContent =
    filtro === "todas" ? "" : `· ${traduzirCategoria(filtro)}`;

  // Botão "apagar": mostra a categoria ativa e desativa-se se não houver nada a apagar
  $("textoApagarTodas").textContent =
    filtro === "todas"
      ? t("lista.apagarTodas")
      : `${t("lista.apagar")} “${traduzirCategoria(filtro)}”`;
  $("btnApagarTodas").disabled = visiveis.length === 0;
}

/*
  adicionarDespesa(e)
  Corre ao submeter o formulário "Nova despesa".
  Valida, cria a despesa, guarda no localStorage e redesenha a lista.
 */
function adicionarDespesa(e) {
  e.preventDefault();

  const dados = lerDespesa($("descricao"), $("valor"), $("categoria"), $("dataDespesa"));
  if (!dados) return;

  despesas.push({
    id: crypto.randomUUID(),
    ...dados, // descricao, valor, categoria e data_despesa
    created_at: new Date().toISOString(),
  });

  guardarDespesas();
  $("formDespesa").reset();
  definirDataHoje(); // o reset() limpa a data: volta a pôr o dia atual
  desenharDespesas();
}

/*
  abrirEdicao(id)
  Preenche o modal "Editar despesa" com os dados da despesa e abre-o.
 */
function abrirEdicao(id) {
  const d = despesas.find((x) => x.id === id);
  if (!d) return;

  $("editId").value = d.id;
  $("editDescricao").value = d.descricao;
  $("editValor").value = d.valor;
  $("editCategoria").value = d.categoria;
  $("editData").value = d.data_despesa || hojeISO();
  ["editDescricao", "editValor", "editCategoria", "editData"].forEach((campo) =>
    $(campo).classList.remove("is-invalid")
  );

  bootstrap.Modal.getOrCreateInstance($("modalEditar")).show();
}

/*
  guardarEdicao(e)
  Corre ao submeter o modal de edição.
  Valida, atualiza a despesa (procurada pelo id), guarda e fecha o modal.
 */
function guardarEdicao(e) {
  e.preventDefault();

  const dados = lerDespesa($("editDescricao"), $("editValor"), $("editCategoria"), $("editData"));
  if (!dados) return;

  const d = despesas.find((x) => x.id === $("editId").value);
  if (d) Object.assign(d, dados); // copia descricao, valor, categoria e data

  guardarDespesas();
  bootstrap.Modal.getOrCreateInstance($("modalEditar")).hide();
  desenharDespesas();
}

/* Confirmação em pop-up  */
let acaoConfirmada = null; // função a executar se o utilizador carregar em "Apagar"

/*
  pedirConfirmacao(mensagem, aoConfirmar, detalhe)
  Abre o pop-up #modalConfirmar com a mensagem (e uma linha de detalhe opcional).
  A função aoConfirmar só corre se o utilizador carregar no botão "Apagar".
 */
function pedirConfirmacao(mensagem, aoConfirmar, detalhe = "") {
  $("confirmarMensagem").textContent = mensagem;
  $("confirmarDetalhe").textContent = detalhe;
  acaoConfirmada = aoConfirmar;
  bootstrap.Modal.getOrCreateInstance($("modalConfirmar")).show();
}

/*
  confirmarAcao()
  Corre ao carregar no botão vermelho do pop-up: fecha o pop-up e executa a ação que ficou guardada.
 */
function confirmarAcao() {
  const acao = acaoConfirmada;
  acaoConfirmada = null;
  bootstrap.Modal.getOrCreateInstance($("modalConfirmar")).hide();
  if (acao) acao();
}

/*
  apagarDespesa(id)
  Abre o pop-up de confirmação (com a descrição e o valor da despesa) e, se o utilizador aceitar, remove a despesa.
 */
function apagarDespesa(id) {
  const d = despesas.find((x) => x.id === id);
  if (!d) return;

  pedirConfirmacao(
    t("lista.confirmar"),
    () => {
      despesas = despesas.filter((x) => x.id !== id);
      guardarDespesas();
      desenharDespesas();
    },
    `${d.descricao} · ${formatarEuros(Number(d.valor))}`
  );
}

/*
  apagarTodasVisiveis()
  Apaga as despesas da categoria ativa, ou todas se o filtro for "Todas".
  Abre o pop-up de confirmação com o número de despesas que vão ser apagadas.
 */
function apagarTodasVisiveis() {
  const filtro = $("filtroCategoria").value;
  const aApagar = despesasDoFiltro();
  if (aApagar.length === 0) return;

  const mensagem =
    filtro === "todas"
      ? t("lista.confirmarTodas").replace("{n}", aApagar.length)
      : t("lista.confirmarCategoria")
          .replace("{n}", aApagar.length)
          .replace("{cat}", traduzirCategoria(filtro));
  pedirConfirmacao(mensagem, () => {
    despesas = despesas.filter((d) => !aApagar.includes(d));
    guardarDespesas();
    desenharDespesas();
  });
}

/*
  gerarDespesasExemplo()
  Cria QTD_EXEMPLOS despesas de exemplo e junta-as às que já existem.
  - As categorias são usadas à vez (ficam todas representadas).
  - A descrição e o valor saem de EXEMPLOS, ao acaso.
  - A data é um dia ao acaso entre 1 de janeiro e hoje.
  - Ligada ao botão do modal de opções, que fecha no fim.
 */
function gerarDespesasExemplo() {
  const categorias = Object.keys(EXEMPLOS);
  const hoje = new Date(hojeISO() + "T00:00:00");
  const diasDesdeJaneiro = Math.round(
    (hoje - new Date(hoje.getFullYear(), 0, 1)) / 86400000
  );

  for (let i = 0; i < QTD_EXEMPLOS; i++) {
    const categoria = categorias[i % categorias.length];
    const modelo = EXEMPLOS[categoria];
    const descricao =
      modelo.descricoes[Math.floor(Math.random() * modelo.descricoes.length)];
    const valor = modelo.min + Math.random() * (modelo.max - modelo.min);
    // new Date(ano, 0, 1 + n) é o dia n depois de 1 de janeiro
    const dia = new Date(
      hoje.getFullYear(),
      0,
      1 + Math.floor(Math.random() * (diasDesdeJaneiro + 1))
    );

    despesas.push({
      id: crypto.randomUUID(),
      descricao,
      valor: Math.round(valor * 100) / 100,
      categoria,
      data_despesa: dia.toLocaleDateString("sv-SE"),
      created_at: new Date().toISOString(),
    });
  }

  guardarDespesas();
  bootstrap.Modal.getOrCreateInstance($("modalOpcoes")).hide();
  desenharDespesas();
}

/*
  cliqueNaLista(e)
  Um único listener na tabela trata de todos os botões das linhas ("delegação de eventos"). 
  Cada botão traz data-acao e data-id.
 */
function cliqueNaLista(e) {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;

  if (botao.dataset.acao === "editar") abrirEdicao(botao.dataset.id);
  if (botao.dataset.acao === "apagar") apagarDespesa(botao.dataset.id);
}




  /* =========================================================
             ----------  7. BITCOIN  ---------- 
   ========================================================= */
/*
  obterTotalDespesas()
  Devolve a soma de TODAS as despesas (sem aplicar o filtro de categoria).
  Usada pelo atualizarBitcoin() em apis.js.
 */
function obterTotalDespesas() {
  if (typeof despesas === "undefined") return 0;
  return despesas.reduce((soma, d) => soma + Number(d.valor), 0);
}



/* ========== 8. EVENTOS E ARRANQUE ========== */

$("formLogin").addEventListener("submit", fazerLogin);
$("btnLogout").addEventListener("click", terminarSessao);
["btnIdioma", "btnIdiomaLogin"].forEach((id) => $(id).addEventListener("click", mudarIdioma));
["btnTema", "btnTemaLogin"].forEach((id) => $(id).addEventListener("click", alternarTema));
$("formDespesa").addEventListener("submit", adicionarDespesa);
$("formEditar").addEventListener("submit", guardarEdicao);
$("listaDespesas").addEventListener("click", cliqueNaLista);
$("filtroCategoria").addEventListener("change", desenharDespesas);
$("btnApagarTodas").addEventListener("click", apagarTodasVisiveis);
$("btnGerarExemplos").addEventListener("click", gerarDespesasExemplo);
$("btnConfirmar").addEventListener("click", confirmarAcao);
$("formOpcoes").addEventListener("submit", guardarOpcoes);
$("modalBitcoin").addEventListener("show.bs.modal", atualizarBitcoin);

carregarTema();
definirDataHoje();
aplicarIdioma();
verificarSessao();
sincronizarHora();
setInterval(atualizarRelogio, 1000); // relógio avança a cada segundo
carregarTempo();





