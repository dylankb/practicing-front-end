var App = {
  bindEvents: function() {
    _.extend(this, Backbone.Events) // Gain access to event publishers/subscribers
    this.listenTo(this.IndexView, "SHOW_NEW_ALBUM", this.renderNewAlbum); // context set to
    this.on('ADD_TO_CART', this.Cart.addItem.bind(this.Cart));
  },
  createCart: function() {
    this.Cart = new CartItems();
    this.Cart.view = new CartView({
      collection: this.Cart,
    })
  },
  templates: JST,
  $el: $('main'),
  renderIndexView: function() {
    this.IndexView = new IndexView();
    this.createCart();
    this.renderAlbums();
    this.bindEvents();
  },
  init: function() {
    this.renderIndexView();
    this.bindEvents();
  },
  renderAlbumView: function(album) {
    new AlbumView({ model: album });
  },
  renderAlbums: function() {
    this.albums.each(this.renderAlbumView);
  },
  renderNewAlbum: function() {
    new NewAlbumView();
  }
};

Handlebars.registerHelper("format_price", function(price) {
  return Number(price).toFixed(2);
});
