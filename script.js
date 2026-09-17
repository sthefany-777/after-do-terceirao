const tipo = document.getElementById("tipo");
const quantidade = document.getElementById("quantidade");
const total = document.getElementById("total");
const form = document.getElementById("purchaseForm");
const pedido = document.getElementById("pedido");


function calcularTotal() {

  let preco = 0;

  if (tipo.value === "Masculino") {
    preco = 20;
  }

  if (tipo.value === "Feminino") {
    preco = 10;
  }

  const qtd = Number(quantidade.value) || 0;

  const valorTotal = preco * qtd;

  total.textContent = valorTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


tipo.addEventListener("change", calcularTotal);
quantidade.addEventListener("input", calcularTotal);


function selecionarIngresso(tipoSelecionado, preco) {

  tipo.value = tipoSelecionado;
  quantidade.value = 1;

  calcularTotal();

  document.getElementById("compra").scrollIntoView({
    behavior: "smooth"
  });
}


form.addEventListener("submit", function(event) {

  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const email = document.getElementById("email").value.trim();
  const tipoIngresso = tipo.value;
  const qtd = Number(quantidade.value);

  if (!nome || !whatsapp || !email || !tipoIngresso || qtd < 1) {
    alert("Preencha todos os campos.");
    return;
  }


  let preco = tipoIngresso === "Masculino" ? 20 : 10;

  const valor = preco * qtd;


  const numeroPedido =
    "AT-" +
    Date.now().toString().slice(-8);


  const dadosPedido = {
    pedido: numeroPedido,
    nome: nome,
    whatsapp: whatsapp,
    email: email,
    ingresso: tipoIngresso,
    quantidade: qtd,
    valor: valor,
    data: new Date().toLocaleString("pt-BR")
  };


  localStorage.setItem(
    "ultimoPedidoAfter",
    JSON.stringify(dadosPedido)
  );


  pedido.innerHTML = `
    <div class="pedido-sucesso">

      <strong>Pedido criado!</strong>

      <p>
        Número do pedido:
        <b>${numeroPedido}</b>
      </p>

      <p>
        ${qtd} ingresso(s) ${tipoIngresso.toLowerCase()} —
        <b>R$ ${valor.toFixed(2).replace(".", ",")}</b>
      </p>

      <br>

      <p>
        O pagamento será realizado via Pix.
      </p>

      <p>
        <strong>
          Nesta versão, ainda precisamos conectar o Pix real
          para gerar o QR Code e confirmar automaticamente o pagamento.
        </strong>
      </p>

    </div>
  `;


  document.getElementById("pix").scrollIntoView({
    behavior: "smooth"
  });

});


calcularTotal();