/**
 * Recebe os leads do popup da página de vendas (institutoverstehen.com.br)
 * e grava na planilha "Leads | Desafio Filhos Sem Tela".
 *
 * COMO PUBLICAR / ATUALIZAR (o passo 4 é o que costuma ser esquecido):
 *
 *  1. Abra a planilha > menu Extensões > Apps Script.
 *  2. Selecione TUDO que está no editor (Ctrl+A) e apague.
 *  3. Cole este arquivo INTEIRO e salve (Ctrl+S).
 *  4. Implantar > Nova implantação > tipo "App da web" >
 *     Executar como: Eu · Quem pode acessar: QUALQUER PESSOA > Implantar.
 *     Em atualizações: Gerenciar implantações > lápis > Versão: "Nova versão".
 *     Sem criar uma versão nova, o Google continua servindo o código antigo.
 *
 * Para conferir, abra a URL /exec no navegador: tem que aparecer
 * {"ok":true,...}. Se aparecer "Função de script não encontrada",
 * o passo 4 não foi feito. Se aparecer 403, o acesso não está em
 * "Qualquer pessoa" ("Qualquer pessoa com uma Conta do Google" também bloqueia).
 */

function doPost(e) {
  try {
    var lead = JSON.parse(e.postData.contents);
    var aba = pegarAba_();

    aba.appendRow([
      formatarData_(lead.enviado_em),
      lead.nome || '',
      lead.telefone || '',
      lead.origem || '',
      lead.pagina || '',
      lead.url || '',
      lead.referencia || 'acesso direto',
      lead.utm_source || '',
      lead.utm_medium || '',
      lead.utm_campaign || '',
      lead.utm_content || '',
      lead.utm_term || '',
      lead.fbclid || ''
    ]);

    return responder_({ ok: true });
  } catch (erro) {
    return responder_({ ok: false, erro: String(erro) });
  }
}

/* Abrir a URL /exec no navegador cai aqui: confere se a implantação
   está servindo esta versão do código. */
function doGet() {
  return responder_({ ok: true, servico: 'leads desafio filhos sem tela' });
}

/* Grava uma linha de teste sem depender do site. Rode pelo botão "Executar". */
function testarGravacao() {
  pegarAba_().appendRow([
    formatarData_(null), 'Teste pelo editor', '(61) 90000-0000',
    'teste', 'vendas', '', 'teste', '', '', '', '', '', ''
  ]);
}

function pegarAba_() {
  var ID_PLANILHA = '1xqTdFRqkQn8a-Sl-h1nnYGgAluOkyEua0IDtDLzuZ8E';
  var COLUNAS = ['Data e hora', 'Nome', 'Telefone', 'Origem do botão', 'Página',
                 'URL', 'Veio de', 'utm_source', 'utm_medium', 'utm_campaign',
                 'utm_content', 'utm_term', 'fbclid'];

  var planilha = SpreadsheetApp.getActiveSpreadsheet() ||
                 SpreadsheetApp.openById(ID_PLANILHA);
  var aba = planilha.getSheets()[0];

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }

  return aba;
}

/* o navegador manda ISO em UTC; a planilha mostra no horário de Brasília */
function formatarData_(iso) {
  var data = iso ? new Date(iso) : new Date();
  return Utilities.formatDate(data, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
}

function responder_(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
