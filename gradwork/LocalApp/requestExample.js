<!DOCTYPE html>
<html>
   <head>
	
      <script type="text/javascript">
         function WebSocketTest()
         {
            if ("WebSocket" in window)
            {
               alert("WebSocket is supported by your Browser!");
               
               // Let us open a web socket
               var ws = new WebSocket("ws://localhost:80/GiveMeJson");
				
               ws.onopen = function()
               {
                  // Web Socket is connected, send data using send()
                  ws.send("Message to send");
                  alert("Message is sent...");
               };
				
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("Message is received...");
                  alert(received_msg);
               };
				
               ws.onclose = function()
               { 
                  // websocket is closed.
                  alert("Connection is closed..."); 
               };
            }
            
            else
            {
               // The browser doesn't support WebSocket
               alert("WebSocket NOT supported by your Browser!");
            }
         }
      </script>
		
   </head>
   <body>
   
      <div id="sse">
         <a href="javascript:WebSocketTest()">Run WebSocket</a>
      </div>
      
   </body>
</html>
