address_to_coordinates() {
  var address = "The Jane, 113 Jane St, New York, NY 10014, United States"
  var formatted_address = address.replace(/ /g,"+")
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formatted_address + "&key=AIzaSyCCyBbVWsgVD7NQmDXcwF7w0GKbL00SiUA"
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.results['0'].geometry.location.lat)
      console.log(json.results['0'].geometry.location.lng)
    })
}
