var app = app || {};

app.SeatView = Backbone.View.extend({
  tagName: 'li',
  className: "seatInner",

  events: {
    'click': 'makeReservation'
  },

  render: function( parentView ) {
    var seatViewTemplate = $('#seatViewTemplate').html();
    var seatViewHTML = _.template(seatViewTemplate);
    $('.seatOuter', parentView).append(this.$el);

    if (this.model.user_id === app.user_id) {
      this.$el.addClass('user-booking');
    } else if ( this.model.user_id ) {
      this.$el.addClass('unavailable');
    }

  },

  makeReservation: function () {
    // console.log('making res on: ');
    var co = this.model['column'];
    var ro = this.model['row'];

    var dynamicRows = app.planes.get(this.model.plane_id).attributes.columns
    var numSelector = ( ( (ro - 1) * dynamicRows ) + (co - 1) );
    var $clicked = $('.seatOuter').children()[numSelector];
    $($clicked).addClass('user-booking');

    var url = 'planes/' + this.model.plane_id + '/flights/' + this.model.flight_id + '/reservations';
    $.post(url, {
      row: this.model.row,
      column: this.model.column,
      flight_id: this.model.flight_id
    });
  }

});