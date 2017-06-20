import {EventEmitter} from 'events'

import './request.js'
import './response.js'

class Server extends EventEmitter{

	constructor(args){
		super(args)


		this.chain = [];
	    this.name = args.name;
	    this.router = args.router;
	    this.routes = {};

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


	get maxHeadersCount(){
		return this.server.maxHeadersCount;
	}


	set maxHeadersCount(c){
		self.server.maxHeadersCount = c;
		return c;
	}


	listen(...args){	
		return this.server.listen.apply(this.server,args);
	}


	_handle(req,res){
		


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