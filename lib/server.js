import {EventEmitter} from 'events'
import Router from './router.js'

import './request.js'
import './response.js'

class Server extends EventEmitter{

	constructor(args){
		super(args)

	    this.name = args.name;
	    this.router = new Router();

		this.server = http.createServer(args);


		this.server.on('request',(req,res)=>{

			this.emit('request',req,res);

			if (options.socketio && (/^\/socket\.io.*/).test(req.url)) {
	            return;
	        }

	        self._setupRequest(req, res);
	        self._handle(req, res);
		})
	}


	listen(...args){	
		return this.server.listen.apply(this.server,args);
	}


	_handle(req,res){
		let routes;

		if(this.router.routes && (this.router.routes['get'].length>0|| this.router.routes['post'].length>0)){
			routes = this.router.routes;
		}else{
			return;
		}

		let method = req.method.toLowerCase();

		let routes_method = routes[method];

		for(let i=0;i<routes_method.length;i++){

			routes_method[i].handler.call(null,routes_method[i].name);
		}

	}


	_setupRequest(req, res){
		req.serverName = this.name;

		res.serverName = this.name;

		if(this.name !== ''){
			res.header('Server',this.name);
		}
	}

}


export default Server;