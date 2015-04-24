// Randomize class for Bottom Colors of Quote Boxes
var colorClassArray = ['block-border-purple', 'block-border-green', 'block-border-blue', 'block-border-yellow'];
var pickColor = function () {
    var chosenClass = colorClassArray[Math.floor(Math.random() * 4)];
    return chosenClass;
};

// Quote constructor
var Quote = function(text, author) {
	this.text = text;
	this.author = author;

	this.render();
};

// Render method for each quote
Quote.prototype.render = function () {
	if (!this.el) {
		this.el = $('#quote-tpl')
		.clone()
		.attr('id', null)
		.addClass('quote-block ' + pickColor());

        var originalQuote = this;

        // Add star rating ability to rendered Quotes
        this.el.find('[name=rating]').on('click', function() {
            originalQuote.rating = this.value;
            originalQuote.el.find('.choice').text(this.value + ' stars');
        });

        // functionality to delete a quote
        this.el.find('.dismiss-text').on('click', function () {
            originalQuote.library.quotes = _.filter(originalQuote.library.quotes, function(i) {
                return ( i !== originalQuote);
            });
            originalQuote.el.remove();
            originalQuote.library.render(); 
        });

        // filter by author functionality
        this.el.find('.author-name').on('click', function() {
            var authors = _.filter(quotesLibrary.quotes, function(item) {
                return (item.author !== originalQuote.author);
            }).forEach(function(item) {
                item.el.hide();
            });
            $('.show-all').css('display', 'block');
            return authors;
        });
	}

	this.el.find('.quote-text').text(this.text);
	this.el.find('.author-name').text(this.author);

	return this.el;
};

// Quote Library constructor
var QuoteLibrary = function () {
    // initialize empty array for quotes to be housed in
	this.quotes = [];
	this.render();
};


// Add Quote Method
QuoteLibrary.prototype.addQuote = function (quote) {
    //push created quotes into quote array
	this.quotes.push(quote);
	this.render();
};

// Render library method
QuoteLibrary.prototype.render = function () {
	if (!this.el) {
		this.el = $('#library-tpl')
		.clone()
		.attr('id', null)
		.addClass('quote-library');

        this.el.find('.add-quote-form').on('submit', this.onFormSubmit.bind(this));
        this.el.find('.show-all').on('click', this.showAll.bind(this));
	}

    var quoteElements = this.quotes.map(function (quote) {
        return quote.render();
    });

    this.el.find('.quote-list').append(quoteElements);

	return this.el;
};

// Submit method for addin a new quote to the library on submittal of the form
QuoteLibrary.prototype.onFormSubmit = function(e) {
    e.preventDefault();
    var quoteText = $(e.currentTarget).find('[name=quote-data]').val();
    var authorName = $(e.currentTarget).find('[name=author-data]').val();

    var newQuote = new Quote(quoteText, authorName);
    
    newQuote.library = this;

    this.addQuote(newQuote);
};

// Show All method for re-showing hidden quotes due to filtering by author inside of quote render method
QuoteLibrary.prototype.showAll = function(e) {
    e.preventDefault();

    this.quotes.forEach(function (item) {
        item.el.show();
    });

    // render the library showing all quotes now
    this.render();

    // hide the view all tag
    $('.show-all').css('display', 'none');
};


// //Initialize new Quote Library
var quotesLibrary = new QuoteLibrary();

// Dummy Data to populate page a bit
var einstein = new Quote (
    'Two things are infinite: the universe and human stupidity\; and I\'m not sure about the universe.',
    'Albert Einstein' 
);

var brick = new Quote (
    'LOUD NOISES',
    'Brick Tamblin'
);

var frost = new Quote (
    'In three words I can sum up everything I\'ve learned about life\: it goes on.',
    'Robert Frost'
);

var twain = new Quote (
    'If you tell the truth, you don\'t have to remember anything.',
    'Mark Twain'
);
var brickLamp = new Quote (
    'I love lamp.',
    'Brick Tamblin'
);

// Add static quotes to the quote library to make the page look nice on load
quotesLibrary.addQuote(einstein);
quotesLibrary.addQuote(brick);
quotesLibrary.addQuote(frost);
quotesLibrary.addQuote(twain);
quotesLibrary.addQuote(brickLamp);

//Finally, render quote library to the page
$('.content').append(quotesLibrary.render());

