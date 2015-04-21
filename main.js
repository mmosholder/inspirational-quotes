$(document).on('ready', function(){

	var Quote = function(text, author) {
		this.text = text;
		this.author = author;

		this.render();
	};

	Quote.prototype.render = function () {
		if (!this.el) {
			this.el = $('#quote-tpl')
			.clone()
			.attr('id', null)
			.addClass('quote-block');
		}

		this.el.find('.quote-text').text(this.text);
		this.el.find('.author-name').text(this.author);

		return this.el;
	};

	var QuoteLibrary = function () {
		this.quotes = [];

		this.render();
	};

	QuoteLibrary.prototype.addQuote = function(tempQuote) {
		this.quotes.push(tempQuote);

		this.renderQuoteList();

	};

	QuoteLibrary.prototype.render = function () {
		if (!this.el) {
			this.el = $('#library-tpl')
			.clone()
			.attr('id', null)
			.addClass('quote-library');
		}

		this.renderQuoteList();

		return this.el();
	};

	QuoteLibrary.prototype.renderQuoteList = function () {
		var quoteElements = this.quotes.map(function (quote) {
			return quote.render();
		});

		this.el.find('.quote-list').append(quoteElements);
	};


	$('.add-quote').on('submit', function (e){
		var quoteText = $('#quote-text').val();
		var authorName = $('#author-text').val();

		var tempQuote = new Quote(quoteText, authorName);

		e.preventDefault();

		$('#quotes-container').append( tempQuote.render() );

	});
});