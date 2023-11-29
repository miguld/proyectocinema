var price = 13; //price
	$(document).ready(function() {
		var $cart = $('#selected-seats'), //Sitting Area
		$counter = $('#counter'), //Votes
		$total = $('#total'); //Total money
		
		var sc = $('#seat-map').seatCharts({
			map: [  //Seating chart
				'aaaaaaa_aaaaaaa_aaaaaaa',
				'aaaaaaa_aaaaaaa_aaaaaaa',
				'aaaaaaa_aaaaaaa_aaaaaaa',
				'aaaaaaa_aaaaaaa_aaaaaaa',
				'aaaaaaa_aaaaaaa_aaaaaaa'
			],
			naming : {
				top : false,
				getLabel : function (character, row, column) {
					return column;
				}
			},
			legend : { //Definition legend
				node : $('#legend'),
				items : [
					[ 'a', 'available',   'Available' ],
					[ 'a', 'unavailable', 'Unavailable'],
					[ 'a', 'selected', 'selected'],
				]					
			},
			click: function () { //Click event
				if (this.status() == 'available') { //optional seat
					$('<li>R'+(this.settings.row+1)+' S'+this.settings.label+'</li>')
						.attr('id', 'cart-item-'+this.settings.id)
						.data('seatId', this.settings.id)
						.appendTo($cart);

					$counter.text(sc.find('selected').length+1);
					$total.text(recalculateTotal(sc)+price);
								
					return 'selected';
				} else if (this.status() == 'selected') { //Checked
						//Update Number
						$counter.text(sc.find('selected').length-1);
						//update totalnum
						$total.text(recalculateTotal(sc)-price);
							
						//Delete reservation
						$('#cart-item-'+this.settings.id).remove();
						//optional
						return 'available';
				} else if (this.status() == 'unavailable') { //sold
					return 'unavailable';
				} else {
					return this.style();
				}
			}
		});
		//sold seat
		sc.get(['2_9', '2_11', '2_12','2_13','2_14','2_15','2_10','3_11','3_12','3_13',]).status('unavailable');
			
	});