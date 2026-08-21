const http = require('http');
const hostname = '0.0.0.0'; 
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/mensagem') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      texto: `Servidor funcionando. Hora atual: ${new Date().toLocaleTimeString('pt-BR')}`
    }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head><meta charset="UTF-8"><title>Servidor Node</title></head>
      <body>
        <h1 id="texto">Carregando...</h1>
        <script>
          async function atualizarTexto() {
            const resposta = await fetch('/mensagem');
            const dados = await resposta.json();
            document.querySelector('#texto').textContent = dados.texto;
          }

          atualizarTexto();
          setInterval(atualizarTexto, 1000);
        </script>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});