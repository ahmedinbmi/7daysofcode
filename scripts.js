	var request = new XMLHttpRequest();
	request.open('GET', 'https://free.currencyconverterapi.com/api/v5/currencies', true);
	request.onload = function () {

	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {

		    select_from = document.getElementById('CURR_FR');
			select_to = document.getElementById('CURR_TO');

					
		Object.keys(data).forEach(function (key) {
		  let obj = data[key];
		  //document.getElementById("Result1").innerHTML = obj['results'] ;
		//console.log(obj.AED); 
			Object.keys(obj).forEach(function (key) {
			let obj1 = obj[key];
			
			let opt = document.createElement('option');
			let opt1 = document.createElement('option');
				opt.value = obj1.id;
				opt.innerHTML = obj1.id;
				opt1.value = obj1.id;
				opt1.innerHTML = obj1.id;
				select_from.appendChild(opt);
				select_to.appendChild(opt1);
				
			});

		});
		
	  }
	}

	request.send();
	
	
	
	
function calcule_curr() {
	
	
	let request = new XMLHttpRequest();
	let e = document.getElementById("CURR_FR");
	let curr1 = e.options[e.selectedIndex].value;
	let e2 = document.getElementById("CURR_TO");
	let curr2 = e2.options[e2.selectedIndex].value;
	let curr= curr1+"_"+curr2;
	request.open('GET', 'https://free.currencyconverterapi.com/api/v5/convert?q='+curr+'&compact=y', true);
	request.onload = function () {

	  // Begin accessing JSON data here
	  let data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {

		Object.keys(data).forEach(function (key) {
		  let obj = data[key];
		  document.getElementById("Result").innerHTML = obj['val'] ;

		});
		
	  } else {
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	  }
	}

	request.send();
}




if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
