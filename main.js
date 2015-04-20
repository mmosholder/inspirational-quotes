$(document).on('ready', function(){

	var savedQuote = $('<div></div>');

	var Quote = function(text, author) {
		this.text = text;
		this.author = author;
	};

	$('.add-quote').on('submit', function (e){
		Quote.prototype.createNew = function () {
			var quoteText = $('#quote-text').val();

			var authorText = $('#author-text').val();

			this.newQuote = $('<div')
				.append(quoteText, authorText);

			return this.newQuote;	
		};

		$('.quotes-display').append(this.newQuote);
	});

});