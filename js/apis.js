/* =========================================================
                            API

    1. RELÓGIO (API time.now)
    2. TEMPO (API Open-Meteo, sem chave)
    3. OPÇÕES (horário e cidade)
    4. BITCOIN (API Coinbase, sem chave)

   ========================================================= */

/* =========================================================
      ---------- 1. RELÓGIO (API time.now) ---------- 
   ========================================================= */

/*
  sincronizarHora()
  Pede à API time.now a hora do fuso escolhido e calcula a diferença para o relógio do computador (diferencaMs).
  Assim só é preciso chamar a API uma vez: o relógio depois anda sozinho.
  Se a API falhar, usa a hora do computador.
 */
function sincronizarHora() {
  fetch(`https://time.now/developer/api/timezone/${opcoes.fuso}`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      // Remove as frações de segundo (ex.: ".123456") para o Date ler bem
      const iso = data.datetime.replace(/\.\d+/, "");
      diferencaMs = new Date(iso).getTime() - Date.now();
      atualizarRelogio();
    })
    .catch((error) => {
      console.error(error);
      diferencaMs = 0;
      atualizarRelogio();
    });
}

/*
  atualizarRelogio()
  Corre a cada segundo (setInterval).
  Calcula a hora certa, formata-a no fuso escolhido e escreve hora e data nos elementos (versão normal e versão mobile).
 */
function atualizarRelogio() {
  const agora = new Date(Date.now() + diferencaMs);
 
  const hora = agora.toLocaleTimeString(localeAtual(), {
    timeZone: opcoes.fuso,
  });

  const partes = new Intl.DateTimeFormat(localeAtual(), {
    timeZone: opcoes.fuso,
    weekday: "long",
    day: "numeric",
    month: "long", // mês escrito por extenso
    // month: "numeric", // mês escrito por números
    year: "numeric",
  }).formatToParts(agora);
  const parte = (tipo) => partes.find((p) => p.type === tipo).value;
 
  // Ex.: "segunda-feira, 2 novembro 2026"
  const textoData = `${parte("weekday")}, ${parte("day")} ${parte("month")} ${parte("year")}`;

  // Ex.: "segunda-feira, 2/novembro/2026"
// const textoData = `${parte("weekday")}, ${parte("day")}/${parte("month")}/${parte("year")}`;

  // Primeira letra maiúscula: "Segunda-feira, 2 novembro 2026"
  const data = textoData.charAt(0).toUpperCase() + textoData.slice(1);
 
  ["horaAtual", "horaAtualMobile"].forEach((id) => ($(id).textContent = hora));
  ["dataAtual", "dataAtualMobile"].forEach((id) => ($(id).textContent = data));
}


/* =========================================================
  ---------- 2. TEMPO (API Open-Meteo, sem chave) ----------
   ========================================================= */
/*
  cidadeAtual()
  Devolve o objeto da cidade escolhida nas opções.
 */
function cidadeAtual() {
  return CIDADES.find((c) => c.id === opcoes.cidade) || CIDADES[0];
}

/*
  chaveTempo(codigo)
  Converte o código do tempo da Open-Meteo (weather_code)
  na chave do texto correspondente em TEXTOS.
 */
function chaveTempo(codigo) {
  if (codigo === 0) return "tempo.limpo";
  if (codigo <= 3) return "tempo.nublado";
  if (codigo <= 48) return "tempo.nevoeiro";
  if (codigo <= 57) return "tempo.chuvisco";
  if (codigo <= 67) return "tempo.chuva";
  if (codigo <= 77) return "tempo.neve";
  if (codigo <= 82) return "tempo.aguaceiros";
  if (codigo <= 86) return "tempo.neve";
  return "tempo.trovoada";
}

/*
  carregarTempo()
  Vai buscar o tempo atual da cidade escolhida.
  Mostra "A carregar", depois os dados (ou o erro, se falhar).
 */
function carregarTempo() {
  const c = cidadeAtual();
  $("tempoCarregando").classList.remove("d-none");
  $("tempoConteudo").classList.add("d-none");
  $("tempoErro").classList.add("d-none");

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      ultimoTempo = data.current;
      mostrarTempo();
    })
    .catch((error) => {
      console.error(error);
      ultimoTempo = null;
      $("tempoCarregando").classList.add("d-none");
      $("tempoErro").classList.remove("d-none");
    });
}

/*
  mostrarTempo()
  Escreve no cartão os últimos dados do tempo, no idioma atual.
  Não faz nada se ainda não houver dados.
 */
function mostrarTempo() {
  if (!ultimoTempo) return;

  $("tempoLocal").textContent = nomeDe(cidadeAtual());
  $("tempoTemp").textContent = Math.round(ultimoTempo.temperature_2m);
  $("tempoDescricao").textContent = t(chaveTempo(ultimoTempo.weather_code));
  $("tempoVento").textContent = Math.round(ultimoTempo.wind_speed_10m);
  $("tempoHumidade").textContent = ultimoTempo.relative_humidity_2m;

  $("tempoCarregando").classList.add("d-none");
  $("tempoErro").classList.add("d-none");
  $("tempoConteudo").classList.remove("d-none");
}

/* =========================================================
      ---------- 3. OPÇÕES (horário e cidade) ----------
   ========================================================= */
/*
  preencherSelect(select, lista, valorAtual)
  Cria os <option> de um <select> a partir de uma lista (FUSOS ou CIDADES) e seleciona o valor atual.
 */
function preencherSelect(select, lista, valorAtual) {
  select.innerHTML = "";
  lista.forEach((item) => {
    const op = document.createElement("option");
    op.value = item.id;
    op.textContent = nomeDe(item);
    select.appendChild(op);
  });
  select.value = valorAtual;
}

/*
  preencherOpcoes()
  Preenche os dois selects do modal de opções com os valores guardados.
 */
function preencherOpcoes() {
  preencherSelect($("opcaoFuso"), FUSOS, opcoes.fuso);
  preencherSelect($("opcaoCidade"), CIDADES, opcoes.cidade);
}

/*
  guardarOpcoes(e)
  Corre ao submeter o modal de opções.
  Guarda as escolhas no localStorage, fecha o modal e volta a pedir a hora e o tempo com os novos valores.
 */
function guardarOpcoes(e) {
  e.preventDefault();

  opcoes = { fuso: $("opcaoFuso").value, cidade: $("opcaoCidade").value };
  localStorage.setItem("opcoes", JSON.stringify(opcoes));

  bootstrap.Modal.getOrCreateInstance($("modalOpcoes")).hide();
  sincronizarHora();
  carregarTempo();
}


/* =========================================================
    -------- 4. BITCOIN (API Coinbase, sem chave) --------
   ========================================================= */
/*
  atualizarBitcoin()
  Corre sempre que o pop-up vai abrir (ligada em script.js).
  1. Calcula o total das despesas (obterTotalDespesas, em script.js).
  2. Pede à API da Coinbase o preço atual de 1 BTC em euros.
  3. Divide o total pelo preço e mostra o resultado com 8 casas decimais (a menor fração de um bitcoin é 0,00000001).
  Se a API falhar, mostra o aviso de erro.
 */
function atualizarBitcoin() {
  const total = obterTotalDespesas();

  $("btcErro").classList.add("d-none");
  $("btcTotal").textContent = "";
  $("btcPreco").textContent = "";
  $("btcResultado").textContent = "...";

  // Sem despesas não vale a pena chamar a API
  if (total <= 0) {
    $("btcResultado").textContent = "—";
    $("btcTotal").textContent = t("btc.vazio");
    return;
  }

  fetch("https://api.coinbase.com/v2/prices/BTC-EUR/spot")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const preco = Number(data.data.amount); // vem como texto, ex.: "61234.56"
      const bitcoins = total / preco;

      $("btcResultado").textContent =
        bitcoins.toLocaleString(localeAtual(), {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        }) + " BTC";
      $("btcTotal").textContent = `${t("btc.total")}: ${formatarEuros(total)}`;
      $("btcPreco").textContent = `${t("btc.preco")}: ${formatarEuros(preco)}`;
    })
    .catch((error) => {
      console.error(error);
      $("btcResultado").textContent = "—";
      $("btcErro").classList.remove("d-none");
    });
}