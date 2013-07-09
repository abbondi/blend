/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		uuid = device.uuid;
		//alert('Test1\nuuid:' + uuid);
		piattaforma = device.platform;
		//alert('Test2\npiattaforma: ' + piattaforma);
		if (device.platform == 'android' || device.platform == 'Android') {
			sistema = 'android';
		} else {
			sistema = 'ios';	
		}
		//alert('Test3\nsistema: ' + sistema);
        app.receivedEvent('deviceready');
		//PERSONALIZZA IL PERCORSO:
		//window.location.href = appPath + 'index.php?uuid=' + uuid;
		
    },
    tokenHandler:function(msg) {
        //console.log("Token Handler " + msg);
		//YOUR_PUSHWOOSH_APP_ID
		PushWoosh.appCode = "CB3ED-B7C1B";
    	PushWoosh.register(msg, function(data) {
                        alert("3) Dispositivo registrato con successo: " + JSON.stringify(data));
                    }, function(errorregistration) {
                        alert("4) Errore durante la registrazione: " +  errorregistration);
                    });
    },
    errorHandler:function(error) {
        //console.log("Error Handler  " + error);
        alert('messaggio errore:\n' + error);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Success! Result = '+result)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android (è il Project Number che trovi nella Dashboard di code.google.com, abbinato al progetto per le notifiche);
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"1025308329389","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
		
       // var parentElement = document.getElementById(id);
       // var listeningElement = parentElement.querySelector('.listening');
       // var receivedElement = parentElement.querySelector('.received');

       // listeningElement.setAttribute('style', 'display:none;');
       // receivedElement.setAttribute('style', 'display:block;');

       // console.log('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        //console.log("Received a notification! " + event.alert);
        //console.log("event sound " + event.sound);
        //console.log("event badge " + event.badge);
        //console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            //console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
				 {
					 // Your GCM push server needs to know the regID before it can push to this device
					 // here is where you might want to send it the regID for later use.
					 //YOUR_PUSHWOOSH_APP_ID
					 PushWoosh.appCode = "CB3ED-B7C1B";
					 PushWoosh.register(e.regid, function(data) {
								 alert("1) Dispositivo registrato con successo: " + JSON.stringify(data));
							 }, function(errorregistration) {
								 alert("2) Errore durante la registrazione: " +  errorregistration);
							 });
		 
				 }
            break;

            case 'message':
              	// this is the actual push notification. its format depends on the data model
              	// of the intermediary push server which must also be reflected in GCMIntentService.java
             	// alert('message = '+e.message+' msgcnt = '+e.msgcnt);
			 	 alert('NOTIFICA:\n'+e.message);
            	break;

            case 'error':
              	alert('GCM error = '+e.msg);
            	break;

            default:
            	alert('An unknown GCM event has occurred');
            	break;
        }
    },
	
	
	
	
	/* PERSONALIZZAZIONI */
	
	
	/* FINE PERSONALIZZAZIONI */
	
	
	
	

};
