const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Redis = require('ioredis');

const app = new Koa();
const router = Router();
const redis=new Redis({
    host : 'redis',
    port : 6379,
    prefix : 'sam:',
    ttl : 60 * 60 * 23,
    db: 0
});

app.use(bodyParser());

router.get('/', async(ctx) => {
    redis.set('foo', 'bar');
    const doc = await redis.get('foo', function(err, doc) {
        return doc;
    });
    ctx.body = doc;
});

app.use(router.routes());

app.listen(8080);