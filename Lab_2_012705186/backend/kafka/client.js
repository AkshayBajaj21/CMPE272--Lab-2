var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    console.log('in make request');
    console.log(msg_payload);
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
        console.log('entered rpc');
		if(err)
			console.error("error at 10 is ",err);
		else{
			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;