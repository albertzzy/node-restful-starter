import Server from './server.js';
import Router from './router.js';


export default function createServer(opts={}){
	let server;

	// opts.router = opts.router || new Router(opts);

	server = new Server(opts);

	server.on('uncaughtException',(req,res,e)=>{
		res.send(e.message);
	})


	return server;
}