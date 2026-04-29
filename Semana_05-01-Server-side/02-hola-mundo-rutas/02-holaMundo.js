import http from 'http';

const port = 3001;
const server = http.createServer((req, res) => {

    //Quito los query params. Si era /institucional?nombre=Juan => queda /institucional
    let processedPath  = req.url.indexOf('?') > 0? req.url.substring(0, req.url.indexOf('?')) : req.url;

    switch (processedPath) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('🏠 Inicio');
            break;
        case '/institucional':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('🏢 Institucional');
            break;
        case '/contacto':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('📧 Contacto');
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('❌ No encontrado');
            break;
    }
});
server.listen(port, () => console.log(`Servidor iniciado en el puerto: ${port}; `));