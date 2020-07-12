let Client= new Object();

// A much simpler caffeine chat log, no need for dodgy executables 
// You may modify as you wish just remember to credit LordRampantHump

//******** This is the config, change what you need here ********//
let init = false;
//This is the stage id,(who we are connecting to) find yours here: https://api.caffeine.tv/v1/users/kaph, just change the username: 
Client.stage_id = "7D59649AE6A04BF9A3F6D50329CB223E";

//This is chat background, if you want transparent chat just leave it blank or white make it #fff or semi transparent make it rgba(0,0,0,0.4):  
Client.background = "";

//This is chat body font color and size:  
Client.fontColor = "#000";
//Do you want the users color to be remembered or always random? 
Client.rememberFontColor = false;
Client.fontSize = "2.5rem";

//Do you want to show donations?
Client.ShowDonation = true;

//Do you want to show the donation image? (Only works is Client.ShowDonation is true. If you set it to false it will show text)
Client.ShowDonationImage = true;


// I didn't spend a long time on this as you can tell, so this function should protect you from special characters crashing your chat, 
//however it might break some emotes or punctuation. You can turn it off by setting it to false
Client.Parse = true;




// Do not change anything else unless you know what you are doing

Client.Chatters = new Object();
document.body.style.backgroundColor = Client.background;
document.body.style.fontSize = Client.fontSize;
document.body.style.color = Client.fontColor;





function CaffeineconnectChat(){	


socket = new WebSocket("wss://realtime.caffeine.tv/v2/reaper/stages/"+Client.stage_id+"/messages");

socket.onopen = function() {
        
        socket.send('{"Headers":{"Authorization":"Anonymous ","X-CLIENT-TYPE":"LUCIO","X-CLIENT-VERSION":"1.0.1061"}}'); // Send the
        socketInterval = setInterval(function(){   socket.send('"HEALZ"'); }, 20000); 
		if(!init){
			insert("#output",`<span class="message">
            <span class="user" style="color:red;">SYSTEM: </span>
            <span class="body">Chat ready, have fun!</span>
            </span>`);
			init = true;
		}
			
		
		};



// Socket on close
 socket.onclose = function() {
        clearInterval(socketInterval);
		CaffeineconnectChat();
		return;
		 
};


// Socket on message
socket.onmessage = function(message) {
 

	
    var checkmethod = message.data;
    var message  = JSON. parse(message.data);
	
console.log(message)
	if(checkmethod.indexOf("publisher") > 0){
		if (!message.endorsement_count) {
			// avoid upvotes

			if (!(message.publisher.caid in Client.Chatters)  || !Client.rememberFontColor){

				Client.Chatters[message.publisher.caid] = new Object;
				Client.Chatters[message.publisher.caid].color = (Math.random().toString(16) + "000000").slice(2, 8);
			}

			if (checkmethod.indexOf("digital_item") > 0 && Client.ShowDonation)  {
				// donation
				var purple = (message.body.digital_item.count * message.body.digital_item.credits_per_item);
				var gold = (purple / 3);
				
				 
				 insert("#output",`<span class="message">
				 <span class="user" style="color:#`+Client.Chatters[message.publisher.caid].color+`;">`+message.publisher.username+`: </span>
				 <span class="body">Sent `+ purple +` purple credits or `+ gold +` Gold by donation!</span>
				 </span>`)
				 if(Client.ShowDonationImage){
				   insert("#output",`<span class="message"><img class="image" src="https://assets.caffeine.tv`+message.body.digital_item.static_image_path+`"></span>`)
				}
			  
			}
			
			if(message.body.text != "" || message.body.text != null){
					insert("#output",`<span class="message">
					<span class="user" style="color:#`+Client.Chatters[message.publisher.caid].color+`;">`+message.publisher.username+`: </span>
					<span class="body">`+parsemalicious(message.body.text)+`</span>
					</span>`)
			   
				 
			} 
	 
				window.scrollTo(0,document.body.scrollHeight);

		}
	}

}};



// Main functions

function insert(h,i){
let elem = document.querySelector ( h )
elem.innerHTML = elem.innerHTML + i;
}

function parsemalicious(i){
    if (!Client.Parse)
    return i

	var i = i.replace('-', '');
	i = i.replace('"', '');
	i = i.replace('/', '');
	i = i.replace('\\', '');
	i = i.replace('>', '');
	i = i.replace('<', '');
	i = i.replace('(', '');
	i = i.replace(')', '');
	i = i.replace('=', '');
	return i.replace(/<(?:.|\n)*?>/gm, '');
}



CaffeineconnectChat();
