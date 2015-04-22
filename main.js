var newStarRating = 0;
// Star ranking display functionality
$(':radio').on('click', function () {
    $('.choice').text( this.value + ' stars' );
    newStarRating = this.value;
});

var Quote = function(text, author, rating) {
	this.text = text;
	this.author = author;
    this.rating = 0;

	this.render();
};

Quote.prototype.render = function () {
	if (!this.el) {
		this.el = $('#quote-tpl')
		.clone()
		.attr('id', null)
		.addClass('quote-block');

        var originalQuote = this;

        this.el.find('[name=rating]').on('click', function() {
            originalQuote.rating = this.value;
            console.log(originalQuote);
            originalQuote.el.find('.choice').text(this.value + ' stars');
        });
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

	var tempQuote = new Quote(quoteText, authorName, newStarRating);

	e.preventDefault();

    quotesLibrary.addQuote(tempQuote);
    $('#quote-text').val('');
    $('#author-text').val('');

	$('.quote-entry').before( quotesLibrary.render() );

});

var einstein = new Quote (
    'Two things are infinite: the universe and human stupidity\; and I\'m not sure about the universe.',
    'Albert Einstein',
    '4'    
);

var brick = new Quote (
    'LOUD NOISES',
    'Brick Tamblan',
    '5'
);

var staticQuotes = new QuoteLibrary();
staticQuotes.addQuote(einstein);
staticQuotes.addQuote(brick);
$('quote-entry').before( staticQuotes.render() );
