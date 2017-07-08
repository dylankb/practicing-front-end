var persons = [
  { name: 'Tim', colors: ['Red', 'White', 'Blue'] },
  { name: 'Babs', colors: ['Orange', 'Evermint', 'Yellow'] },
  { name: 'Weasel', colors: ['Maroon', 'Chartrouse', 'Blue'] },
];

var App = {
  init: function() {
    this.appView = new AppView;
    this.appView.render();

    this.list = new List(persons);
    this.listView = new ListView({ collection: this.list });
    this.listView.render();
  },
}

App.init();
