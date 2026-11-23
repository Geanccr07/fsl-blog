const MIN_COLUNAS_EMPILHAR = 4;

function filhos(no, tag) {
  return (no.children || []).filter((f) => f.type === 'element' && f.tagName === tag);
}

function texto(no) {
  if (no.type === 'text') return no.value;
  return (no.children || []).map(texto).join('');
}

function ajustarTabela(tabela) {
  const [thead] = filhos(tabela, 'thead');
  const [tbody] = filhos(tabela, 'tbody');
  if (!thead || !tbody) return;
  const [linhaCabecalho] = filhos(thead, 'tr');
  if (!linhaCabecalho) return;
  const rotulos = filhos(linhaCabecalho, 'th').map((th) => texto(th).trim());
  if (rotulos.length < MIN_COLUNAS_EMPILHAR) return;

  const classes = tabela.properties.className || [];
  tabela.properties.className = [...classes, 'tabela-empilhada'];

  for (const linha of filhos(tbody, 'tr')) {
    filhos(linha, 'td').forEach((td, i) => {
      if (rotulos[i]) td.properties.dataLabel = rotulos[i];
    });
  }
}

function percorrer(no) {
  if (no.type === 'element' && no.tagName === 'table') ajustarTabela(no);
  for (const filho of no.children || []) percorrer(filho);
}

export default function rehypeTabelaResponsiva() {
  return (arvore) => percorrer(arvore);
}
