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
Client.fontSize = "2.8rem";

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

//Handles Caffeine Badges 
let badges = new Object();
badges.CASTER  = '<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" viewBox="0 0 21 18"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M21 9l-5.25 9H5.25L0 9l5.25-9h10.5z"></path><path d="M14.75 2L19 9l-4.25 7h-8.5L2 9l4.25-7h8.5zm-4.052 2C8.108 4 6 6.243 6 9s2.108 5 4.698 5c1.79 0 3.4-1.059 4.202-2.763.233-.494.045-1.095-.419-1.342-.464-.248-1.029-.048-1.26.446C12.737 11.364 11.771 12 10.697 12 9.144 12 7.88 10.654 7.88 9s1.265-3 2.82-3c1.073 0 2.04.636 2.521 1.66.232.493.797.693 1.261.445.464-.247.652-.848.42-1.342C14.097 5.06 12.487 4 10.697 4z" fill="#FFFD00"></path></g></svg>';
badges.PARTNER1  = '<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" viewBox="0 0 26 18"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M26 9l-5.25 9H5.25L0 9l5.25-9h15.5z"></path><path fill="#0FF" d="M9.25 2L5 9l4.25 7h-3L2 9l4.25-7z"></path><path d="M19.75 2L24 9l-4.25 7h-8.5L7 9l4.25-7h8.5zm-4.052 2C13.108 4 11 6.243 11 9s2.108 5 4.698 5c1.79 0 3.4-1.059 4.202-2.763.233-.494.045-1.095-.419-1.342-.464-.248-1.029-.048-1.26.446C17.737 11.364 16.771 12 15.697 12c-1.554 0-2.819-1.346-2.819-3s1.265-3 2.82-3c1.073 0 2.04.636 2.521 1.66.232.493.797.693 1.261.445.464-.247.652-.848.42-1.342C19.097 5.06 17.487 4 15.697 4z" fill="#0FF"></path></g></svg>';
badges.VERIFIED  = '<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" viewBox="0 0 21 18"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M21 9l-5.25 9H5.25L0 9l5.25-9h10.5z"></path><path d="M14.75 2L19 9l-4.25 7h-8.5L2 9l4.25-7h8.5zm-.712 3.113c-.441-.232-1.006-.095-1.26.307l-3.206 5.052-1.35-2.128c-.254-.402-.819-.54-1.26-.308-.442.232-.593.746-.338 1.148l2.154 3.396c.254.402.819.54 1.26.307a.868.868 0 00.386-.394l3.952-6.233c.255-.401.104-.915-.338-1.147z" fill="#FFF"></path></g></svg>';
badges.PURPLE ='<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" class="purple" viewBox="0 0 12 12"><g fill-rule="evenodd"><path d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 .5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"></path><circle cx="6" cy="6" r="4.5"></circle></g></svg>';
badges.GOLD ='<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" class="gold" viewBox="0 0 12 12"><g fill-rule="evenodd"><path d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 .5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"></path><circle cx="6" cy="6" r="4.5"></circle></g></svg>';
badges.NONE = '<svg style="vertical-align:middle;" width="'+(+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) + ((+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])/100)*85))+'px" height="'+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])+'px" viewBox="0 0 21 18"></svg>';
badges.NONE = "";

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
				 <span class="user" style="color:#`+Client.Chatters[message.publisher.caid].color+`;">`+ message.publisher.username +`:`+(message.publisher.badge ? badges[message.publisher.badge] : badges.NONE)+` </span>
				 <span class="body">Sent `+ purple +` `+ badges.PURPLE +` Credits or `+ gold +` `+ badges.GOLD +` Gold by donation!</span>
				 </span>`)
				 if(Client.ShowDonationImage){
				   insert("#output",`<span class="message"><img width="`+Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]) * 2 +`" src="https://assets.caffeine.tv`+message.body.digital_item.static_image_path+`"></span>`)
				}
			  
			}
			
			if(message.body.text != "" || message.body.text != null){
					insert("#output",`<span class="message">
					<span class="user" style="color:#`+Client.Chatters[message.publisher.caid].color+`;">`+ message.publisher.username +`:`+(message.publisher.badge ? badges[message.publisher.badge] : badges.NONE)+` </span>
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
