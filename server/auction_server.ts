import * as express from 'express';
import {Server} from 'ws';

const app = express();

export class Product {
    constructor(public id: number,
                public title: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}

const products: Product[] = [
    new Product(1, '第1个商品', 21.9, 2.5, '这是商品的介绍6，此商品仍全宇宙中最好的商品之一。', ['电子', '小科技']),
    new Product(2, '第2个商品', 8.8, 1.5, '这是商品的介绍6，此商品仍全宇宙中最好的商品之一。', ['图书']),
    new Product(3, '第23个商品', 4.9, 5, '这是商品的介绍45，此商品仍全宇宙中最好的商品之一。', ['电子', '图书']),
    new Product(4, '第24个商品', 99.9, 3.5, '这是商品的介绍5，此商品仍全宇宙中最好的商品之一。', ['电子', '图书']),
    new Product(5, '第5个商品', 55.2, 5, '这是商品的介绍，此商品仍全宇宙中最好的商品之一。', ['小科技']),
    new Product(6, '第16个商品', 23.9, 3.5, '这是商品的介绍，此商品仍全宇宙中最好的商品之一。', ['电子', '小科技']),
]

app.get('/api', (req, res) => {
    res.send('hello Express');
})
app.get('/api/products', (req, res) => {
    // res.send('接收到商品查询请求!!!');
    res.json(products);
})
app.get('/api/products/:id', (req, res) => {
    // res.send('接收到商品查询请求!!!');
    res.json(products.find((products) => products.id == req.params.id));
})
const server = app.listen(8000, 'localhost', () => {
    console.log('服务器已启动，地址是：http://localhost:8000');
});

const wsServer = new Server({port: 8085});
wsServer.on('connection', websocket => {
    websocket.send('是服务器主动发送的');
    websocket.on('message', message => {
        console.log('接收到消息' + message);
    })
});
setInterval(() => {
    if (wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send('这是定时推送')
        });
    }
}, 2000);
