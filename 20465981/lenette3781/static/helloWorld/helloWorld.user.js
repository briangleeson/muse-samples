// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
//
// @name         helloWorld
// @version      0.1
// @description  *** PROTOTYPE CODE *** demonstrates simple hello world script to customize the Home Page
//
// @namespace  http://ibm.com
//
// @author       Hello World (aka You!)
//
// @include      *://apps.collabservintegration.com/homepage/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if(typeof(dojo) != "undefined") {
	require(["dojo/domReady!"], function(){
        try {
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                    clearInterval(intId);
                    if( waitInter >= maxInter) { 
                        console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback();
                    }
                }, waitTime);
            };

            // here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
            // before we proceed to customize the page...
            waitFor( function(){

                // example customization of the "Updates" title...
                var updatesDescription = document.getElementById("asDesc");
                var originalText = updatesDescription.textContent;
                updatesDescription.textContent="Hello Muse Gary: "+originalText;
                updatesDescription.style="color:#ff0000";
                
                // ... more of your own customization code here please :-) let's see what you come up with!! ...
		dojo.query("span.shareSome-title")[0].textContent= "Hello Gary "+lconn.homepage.userName+" -"; 
		    
               // wait until the "loading..." node has been hidden, indicating that we have loaded content.
            }, ".lotusStreamTopLoading div.loaderMain.lotusHidden");

      } catch(e) {
          alert("Exception occurred in helloWorld: " + e);
      }
   });
}
