import http from 'http';
import httpDate from './http_date.js';
import formatters from './formatters.js';

class Response {
	constructor(){
		
	}

	header(name,value){
		if(value === undefined){
			return this.getHeader(name);
		}

		if(value instanceof Date){
			value = httpDate(value);
		}

		let current = this.getHeader(name);

		if(current){
			if(Array.isArray(value)){
				current.push(value);
				value = current;
			}else{
				value = [current,value];
			}
		}

		this.setHeader(name,value);
	}


	status(code){
		this.statusCode = Number(code);
	}


	json(code,obj,headers){

		if(!/application\/json/.test(this.header('content-type'))){
			this.header('Content-Type','application/json');
		}

		let data = formatters('json')(this.req,this.res,obj);

		this.send(code,data,headers);
	}


	jsonp(code,obj,headers){

		let data = formatters('jsonp')(this.req,this.res,obj);

		this.send(code,data,headers);
	}


	/*
		send(obj)
		send(obj,headers)
		send(code,obj,callback)
		send(code,obj,headers,callback)

	*/
	send(code,obj,headers,callback){
		if(typeof code === 'number'){
			this.writeStatus(code);
		}

		if(typeof headers === 'function'){
			callback = headers;
			headers = undefined;
		}else{
			for(let key of Object.keys(headers)){
				this.setHeader(key,headers[key])
			}
		}

		this.write(obj,callback);
	}

}


Response = http.serverResponse;



export default Response;