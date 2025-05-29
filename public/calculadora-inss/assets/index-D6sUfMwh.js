// Polyfill para suporte a 'modulepreload' em navegadores que não o suportam nativamente.
// Verifica se o navegador já suporta 'modulepreload'. Se sim, não faz nada.
(function () {
  const S = document.createElement("link").relList;
  if (S && S.supports && S.supports("modulepreload")) return;

  // Itera sobre todos os links com rel="modulepreload" existentes no documento e os pré-carrega.
  for (const P of document.querySelectorAll('link[rel="modulepreload"]')) R(P);

  // Observa o DOM para pré-carregar dinamicamente novos links com rel="modulepreload" que forem adicionados.
  new MutationObserver((P) => {
    for (const k of P)
      if (k.type === "childList")
        for (const D of k.addedNodes)
          D.tagName === "LINK" && D.rel === "modulepreload" && R(D);
  }).observe(document, { childList: true, subtree: true }); // Observa adições de nós filhos em toda a subárvore.

  // Função auxiliar para construir o objeto de opções para a requisição fetch.
  // Copia atributos relevantes como 'integrity', 'referrerPolicy' e 'crossOrigin'.
  function p(P) {
    const k = {};
    return (
      P.integrity && (k.integrity = P.integrity),
      P.referrerPolicy && (k.referrerPolicy = P.referrerPolicy),
      P.crossOrigin === "use-credentials"
        ? (k.credentials = "include")
        : P.crossOrigin === "anonymous"
          ? (k.credentials = "omit")
          : (k.credentials = "same-origin"),
      k
    );
  }

  // Função principal para pré-carregar um link.
  // Evita recarregar se já foi processado (P.ep).
  // Marca como processado (P.ep = true).
  // Obtém as opções de fetch e realiza a requisição.
  function R(P) {
    if (P.ep) return; // 'ep' provavelmente significa 'enqueued' ou 'processed'.
    P.ep = true;
    const k = p(P);
    fetch(P.href, k); // Realiza o fetch para pré-carregar o módulo.
  }
})();
// Fim do polyfill 'modulepreload'.
// O código abaixo contém as bibliotecas React e ReactDOM minificadas (versão de produção).
// Não é recomendado editar este código diretamente.

