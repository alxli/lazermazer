var mapLoaded = false;
var mapContents = null;

function Map(level) {
  this.level = level;
  this.filePath = "maps/map" + level + ".txt";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(event) {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      mapLoaded = true;
      mapContents = xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", this.filePath, true);
  xmlhttp.send();


}