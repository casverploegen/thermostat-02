var output = document.getElementById("temperature");

document.getElementById("slider").oninput = function() {
       output.innerHTML = this.value;
   }
