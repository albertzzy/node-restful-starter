class Router{
	constructor(){

		this.routes = {};
	}

	get(path,cb){

		this.routes['get'].push({
			name:path,
			handler:cb
		})
	}

	post(path,cb){

		this.routes['post'].push({
			name:path,
			handler:cb
		})
	}
}


export default Router;