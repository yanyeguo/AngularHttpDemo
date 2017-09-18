"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, '第1个商品', 21.9, 2.5, '这是商品的介绍6，此商品仍全宇宙中最好的商品之一。', ['电子', '小科技']),
    new Product(2, '第2个商品', 8.8, 1.5, '这是商品的介绍6，此商品仍全宇宙中最好的商品之一。', ['图书']),
    new Product(3, '第23个商品', 4.9, 5, '这是商品的介绍45，此商品仍全宇宙中最好的商品之一。', ['电子', '图书']),
    new Product(4, '第24个商品', 99.9, 3.5, '这是商品的介绍5，此商品仍全宇宙中最好的商品之一。', ['电子', '图书']),
    new Product(5, '第5个商品', 55.2, 5, '这是商品的介绍，此商品仍全宇宙中最好的商品之一。', ['小科技']),
    new Product(6, '第16个商品', 23.9, 3.5, '这是商品的介绍，此商品仍全宇宙中最好的商品之一。', ['电子', '小科技']),
];
app.get('/api', function (req, res) {
    res.send('hello Express');
});
app.get('/api/products', function (req, res) {
    // res.send('接收到商品查询请求!!!');
    res.json(products);
});
app.get('/api/products/:id', function (req, res) {
    // res.send('接收到商品查询请求!!!');
    res.json(products.find(function (products) { return products.id == req.params.id; }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已启动，地址是：http://localhost:8000');
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
    websocket.send('是服务器主动发送的');
    websocket.on('message', function (message) {
        console.log('接收到消息' + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send('这是定时推送');
        });
    }
}, 2000);
