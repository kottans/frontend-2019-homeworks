import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
import AppState from "../../Services/AppState";

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    this.onClickItem = this.onClickItem.bind(this);
    this.updateMyself = this.updateMyself.bind(this);
    AppState.watch("FAV", this.updateMyself);
  }

  onClickItem(e) {
    event.stopPropagation();
    if (e.target.value)
      document.querySelector("#search-input").value = e.target.value;
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  render() {
    let data = JSON.parse(localStorage.getItem("likedStorage"));
    let resultArr = [];
    if (data) {
      resultArr = Object.values(data);
    }

    return {
      tag: "select",
      attributes: [
        {
          name: "id",
          value: "weather-liked-main"
        },

        {
          name: "size",
          value: "3"
        }
      ],

      eventHandlers: {
        click: this.onClickItem
      },

      children: [
        {
          tag: "optgroup",
          classList: ["liked-history", "liked-history-item"],
          attributes: [
            {
              name: "label",
              value: "Liked cities"
            },
            {
              name: "selected",
              value: "selected"
            }
          ],

          children: data
            ? resultArr.sort().map((item, ind) => ({
                tag: "option",
                classList: ["liked-history-item"],
                content: item
              }))
            : ""
        }
      ]
    };
  }
}

ComponentFactory.register(FavouriteLocations);
