import Component from "../../framework/Component";
export default class SearchBlock extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    //form
    let form = document.createElement('form');
    form.classList.add('search');

    //input
    let input = document.createElement('input');
    input.classList.add('search__input');
    input.classList.add('wrapperStyle--active');
    input.setAttribute('placeholder','Enter city or coordinates');
    input.setAttribute('title','Enter city or coordinates');

    //button
     let button = document.createElement('button');
     button.classList.add('search__button');
     button.classList.add('wrapperStyle--active');
     button.setAttribute('type','button');
     button.setAttribute('title', 'Search Weather');
     button.textContent = 'Search';
     //append to form
      form.append(input,button);
      console.log(input,button);
     return [
         input,
         button,
     ];
  }
}
