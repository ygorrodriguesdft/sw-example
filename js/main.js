if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then((registration) => {
        console.log('Service worker: Registrado com sucesso')
      })
      .catch((error) => console.log('Falha ao Registrar o Service Worker:', error))
  });
}
