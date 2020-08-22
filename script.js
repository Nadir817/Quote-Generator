const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Get Quotes from API
async function getQuote() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();

        //Author Field Validation
        if (data.quoteAuthor === '') {
            authorText.innerText = 'UNKNOWN';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //Check Quote Length and Adjust Font Size Accordingly
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
    } catch (err) {
        getQuote();
    }
}

function tweetQuote() {
    const text = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuote()