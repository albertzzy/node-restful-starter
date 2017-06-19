export default function httpDate(time){
	if(!time){
		time = new Date();
	}
	retrurn time.toUTCString();
}