export default function formatters(type){
	if(type === 'json'){
		return function(req,res,obj){
			let data = obj ? JSON.stringify(obj) :'null';
			res.setHeader('Content-Length',Buffer.byteLength(data));

			return data;
		}
	}else if(type === 'jsonp'){
		return function(req,res,obj){
			if(!obj){
				res.setHeader('Content-Length',0);
				return null;
			}

			if(Buffer.isBuffer(obj)){
				obj = obj.toString('base64');
			}

			let cb = req.query.callback || req.query.jsonp;
			let data;

			if(cb){
				data = `typeof ${cb} === function && ${cb(JSON.stringify(obj))}`
			}else{
				data = JSON.stringify(obj);
			}

			res.setHeader('Content-Length', Buffer.byteLength(data));

			return data;
		}

	}
}