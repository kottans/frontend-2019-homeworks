export default function initialize() {
  const input = document.getElementById('city-input');

  const options = {
    types: ['(cities)'],
    // componentRestrictions: {country: 'ua'}
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
  });
}
