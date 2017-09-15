var MainTodosView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'update sort', this.render);
    this.listenTo(this.collection, 'change:completed', this.sortCompleted);
  },
  events: {
    'click .todo-item-container': 'processToggleState',
  },
  processToggleState: function(e) {
    e.preventDefault();
    var id = App.getTodoId(e, 'tr');
    var filterMonth = window.localStorage.getItem('filterMonth');
    var filterMonthType = window.localStorage.getItem('filterMonthType');
    App.Todos.trigger('TOGGLE_TODO_STATE', id);
    App.saveToLocalStore();

    var todosGroup = filterMonth ? App.TodoMonths.get(filterMonth) : App.Todos;

    App.updateMainTodosCount(todosGroup.completed().length);
  },
  sortCompleted: function() {
    // Error: missing comparator - unable to run this.collection.sort as
    // callback with collection as context instead of view (should work)
    this.collection.sort();
  },
  render: function() {
    this.$el.html(App.templates.todoItems({ todoItems: this.collection.toJSON() }));
  },
});
