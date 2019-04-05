export default function initialize () {

    const input = document.getElementById('search');

    let options = {
        types: ['(cities)'],
        //componentRestrictions: {country: 'ua'}
    };

    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        let place = autocomplete.getPlace();
    });

}
