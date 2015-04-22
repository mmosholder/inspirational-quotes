$(document).on('ready', function(){

    // Star ranking display functionality
    $(':radio').change(function () {
        var starRating = $('.choice').text( this.value + ' stars' );
        
        console.log(starRating);
        return starRating;
    });

	var Quote = function(text, author, rating) {
		this.text = text;
		this.author = author;
        this.rating = rating;

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

	QuoteLibrary.prototype.addQuote = function(quote) {
		this.quotes.push(quote);

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

		return this.el;
	};

	QuoteLibrary.prototype.renderQuoteList = function () {
		var quoteElements = this.quotes.map(function (quote) {
			return quote.render();
		});

		this.el.find('.quote-list').append(quoteElements);
	};

    //Initialize new library on load for housing quotes
    var quotesLibrary = new QuoteLibrary();


	$('.add-quote').on('submit', function (e){
		var quoteText = $('#quote-text').val();
		var authorName = $('#author-text').val();

		var tempQuote = new Quote(quoteText, authorName);

		e.preventDefault();

        quotesLibrary.addQuote(tempQuote);

		$('.quote-entry').before( quotesLibrary.render() );

	});
});