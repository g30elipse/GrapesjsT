var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');


const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});

let pages = [];

const TEMPLATE_ROUTE = 'templates'

var server = restify.createServer();


server.get(`/${TEMPLATE_ROUTE}`, function (req, res, next) {
    console.log("get")
    res.send(pages)
    return next();
});

server.post(`/${TEMPLATE_ROUTE}`,
    function (req, res, next) {
        pages.push(req.body)
        res.send(Object.keys(req.body))
        return next();
    },
    // function (req, res, next) {
    //     res.send(req.body);
    //     return next();
    // }
);

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser({ mapParams: false }));


server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});