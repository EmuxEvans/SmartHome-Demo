
function onUpdate(jsonOBJ) {
    //adding obj
    console.log(jsonOBJ);
    //todo add foreach in jsonString
    for(e in jsonOBJ){
      jsonString = jsonOBJ[e];

      console.log(jsonString);
      if (jsonString.Event == 'add') {
        //message.textContent = "Adding " + jsonString.Type;
        if ('att' in jsonString) {
          listOBJ[jsonString.Type].add(jsonString);
        } else {
          //message.textContent += "Error" ;
        }

        //updating obj
      } else if (jsonString.Event == 'update') {
          
         if ('att' in jsonString) {
            console.log("Updating " + jsonString.Type)
            listOBJ[jsonString.Type].update(jsonString);
          }else {
            message.textContent += "Error" ;
          }

        //dropping obj
      } else if (jsonString.Event == 'drop') {
          //message.textContent = "Dropping " + jsonString.Type
          listOBJ[jsonString.Type].drop();
      }
    }
}

// Initialize everything when the window finishes loading
window.addEventListener("load", function(event) {
/*  var status = document.getElementById("status");
  var url = document.getElementById("url");
  var open = document.getElementById("open");
  var close = document.getElementById("close");*/
  //var send = document.getElementById("send");
 // var text = document.getElementById("text");
  //var message = document.getElementById("message");

  status.textContent = "Not Connected";
  url_value = "ws://"+window.location.host;
  //close.disabled = true;
  //send.disabled = true;

  //put the connect 

  function onResourceAdd(jsonString) {
   
  }
  // Create a new connection when the Connect button is clicked
  //open.addEventListener("click", function(event) {
    open.disabled = false;
    socket = new WebSocket(url_value, "echo-protocol");
    console.log(url_value);
    socket.addEventListener("open", function(event) {
      status.textContent = "Connected";
    });

    // Display messages received from the server
    socket.addEventListener("message", function(event) {
      //console.log(event);
      onUpdate(JSON.parse(event.data));
      //this data will be the json payload. parset the json out of event.data
      //
    });

    // Display any errors that occur
    socket.addEventListener("error", function(event) {
      message.textContent = "Error: " + event;
    });

    socket.addEventListener("close", function(event) {
      open.disabled = false;
      status.textContent = "Not Connected";
    });
  //});

  // Close the connection when the Disconnect button is clicked
/*  close.addEventListener("click", function(event) {
    close.disabled = true;
    send.disabled = true;
    message.textContent = "";
    socket.close();
  });*/
}); 
