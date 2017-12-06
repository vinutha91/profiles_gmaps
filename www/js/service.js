function getProfilesList(url, success, failure) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) 
        {
            success(JSON.parse(xhr.responseText));
        } else {
            failure(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function createMapAndMarker(lat, lng, container) {
    if (lat && lng) {
        var gmapsMarkers = [];

        gmapObjects.push({
            div: container,
            lat: lat,
            lng: lng
        });

        gmapsMarkers.push({
            lat: lat,
            lng: lng
        });

        for (var i = 0; i<gmapObjects.length; i++) {
            (function(i) {
                var maps = new GMaps(gmapObjects[i]);
            })(i);
        }   
    } 
}