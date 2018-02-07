/******
    To help display the Google map when user clicks the find a pool pro button
******/


function initMap() {
    var clt = {lat: 35.2271, lng: -80.8431};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: clt
    });
    var marker = new google.maps.Marker({
        position: clt,
        map: map
    });
    google.maps.event.addListenerOnce(map, 'idle', function() {
       google.maps.event.trigger(map, 'resize');
});
}