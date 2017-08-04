const {app, BrowserWindow} = require('electron')
const baseurl = 'https://jsonplaceholder.typicode.com/users/';



let listAllNames = (theUrl) => {

    

    let xmlHttp = new XMLHttpRequest();



    xmlHttp.onreadystatechange = ((theUrl) => {

        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            

            let namesList = document.getElementById('names');

            let result = JSON.parse(xmlHttp.responseText);



            if (result.length > 0) {



                for (let i = 0; i < result.length; i++) {



                    let listitems = document.createElement('li');

                    listitems.setAttribute('class', 'list-group-item');

                    listitems.innerHTML = "<span style='display:none'>"+result[i].id+"</span>"+result[i].name;

                    namesList.appendChild(listitems);

                }

            }

        }

    }).bind(undefined, theUrl);



    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request

    xmlHttp.send( null );

}



let getListNames = () => {

    listAllNames(baseurl)

}



///////////////////



$('#names').on('click', () => {



    //Get the details from the object you are clicking on

    let getEventTarget = (e) => {

        e = e || window.event;

        return e.target || e.srcElement; 

    }



    //Setup variable to get the id

    let target = getEventTarget(event);

    let span = target.firstChild.innerHTML;

    let id = span - 1; //array index



    //URL for rest call

    let singleIDURL = baseurl+span;

    console.log(singleIDURL);

    console.log(typeof(singleIDURL));



    //Get the details of the selected person

    $.ajax({

        url: singleIDURL,

        dataType: "json",

        contentType: 'application/json',

        success: (text) => {

        

            document.getElementById('id-receive').innerHTML = text.id;

            document.getElementById('name-receive').innerHTML = text.name;

            document.getElementById('un-receive').innerHTML = text.username;

            document.getElementById('email-receive').innerHTML = text.email;

            document.getElementById('phone-receive').innerHTML = text.phone;

            document.getElementById('web-receive').innerHTML = text.website;

            document.getElementById('street-receive').innerHTML = text.address.street;

            document.getElementById('suite-receive').innerHTML = text.address.suite;

            document.getElementById('city-receive').innerHTML = text.address.city;

            document.getElementById('zip-receive').innerHTML = text.address.zipcode;

            document.getElementById('geolat-receive').innerHTML = text.address.geo.lat;

            document.getElementById('geolng-receive').innerHTML = text.address.geo.lng;

            document.getElementById('cname-receive').innerHTML = text.company.name;

            document.getElementById('cp-receive').innerHTML = text.company.catchPhrase;



            // right-panel

            let rightPanel = document.getElementById('panel2');

            rightPanel.innerHTML = "<img style='width: 80%; float: right; border-radius: 40%;' src='http://lorempixel.com/300/300/people/\'+id' >";

    }});

});