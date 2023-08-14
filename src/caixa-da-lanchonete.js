class CaixaDaLanchonete {
  ItensDisponiveis = {
    Cafe: "cafe",
    Chantily: "chantily",
    Suco: "suco",
    Sanduiche: "sanduiche",
    Queijo: "queijo",
    Salgado: "salgado",
    Combo1: "combo1",
    Combo2: "combo2",
  };

  Cardapio = {
    [this.ItensDisponiveis.Cafe]: { descricao: "Café", valor: 3 },
    [this.ItensDisponiveis.Chantily]: {
      descricao: "Chantily (extra do Café)",
      valor: 1.5,
      extraDe: this.ItensDisponiveis.Cafe,
    },
    [this.ItensDisponiveis.Suco]: { descricao: "Suco Natural", valor: 6.2 },
    [this.ItensDisponiveis.Sanduiche]: { descricao: "Sanduíche", valor: 6.5 },
    [this.ItensDisponiveis.Queijo]: {
      descricao: "Queijo (extra do Sanduíche)",
      valor: 2,
      extraDe: this.ItensDisponiveis.Sanduiche,
    },
    [this.ItensDisponiveis.Salgado]: { descricao: "Salgado", valor: 7.25 },
    [this.ItensDisponiveis.Combo1]: {
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.5,
    },
    [this.ItensDisponiveis.Combo2]: {
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.5,
    },
  };

  MetodosPagamento = {
    Dinheiro: "dinheiro",
    Debito: "debito",
    Credito: "credito",
  };

  Descontos = {
    [this.MetodosPagamento.Dinheiro]: -0.05,
    [this.MetodosPagamento.Debito]: 0,
    [this.MetodosPagamento.Credito]: 0.03,
  };

  calcularValorDaCompra(metodoDePagamento, itens = []) {
    const semItens = !itens.length;

    if (semItens) {
      return "Não há itens no carrinho de compra!";
    }

    const carrinho = itens.map((item) => {
      const [codigo, quantidade] = item.split(",");
      return { codigo, quantidade: +quantidade };
    });

    const itensInvalidos = carrinho.some((item) => {
      const itensCardapio = Object.values(this.ItensDisponiveis);
      return !item.codigo || !itensCardapio.includes(item.codigo);
    });

    if (itensInvalidos) {
      return "Item inválido!";
    }

    const quantidadeInvalida = carrinho.some(
      (item) => !item.quantidade || item.quantidade === 0
    );

    if (quantidadeInvalida) {
      return "Quantidade inválida!";
    }

    const itemExtraSemPrincipal = carrinho.some((item) => {
      const principal = this.Cardapio[item.codigo].extraDe;

      if (!principal) {
        return false;
      }

      const temPrincipalNoCarrinho = !carrinho.find(
        (item) => item.codigo === principal
      );
      return temPrincipalNoCarrinho;
    });

    if (itemExtraSemPrincipal) {
      return "Item extra não pode ser pedido sem o principal";
    }

    const metodosPagamento = Object.values(this.MetodosPagamento);
    const pagamentoInvalido = !metodosPagamento.includes(metodoDePagamento);

    if (pagamentoInvalido) {
      return "Forma de pagamento inválida!";
    }

    let valorTotal = carrinho.reduce((acumulador, item) => {
      const valorDoItem = this.Cardapio[item.codigo].valor * item.quantidade;
      return acumulador + valorDoItem;
    }, 0);

    const descontoACalcular = this.Descontos[metodoDePagamento];
    const valorFinal = valorTotal + valorTotal * descontoACalcular;
    const valorFinalFormatado = `R$ ${valorFinal.toFixed(2)}`.replace(".", ",");

    return valorFinalFormatado;
  }
}

export { CaixaDaLanchonete };
