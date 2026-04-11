const quote= document.getElementById("quote");
const author= document.getElementById("author");
const newQuoteBtn= document.getElementById("Newquote");
const shareBtn= document.getElementById("Share");


const proxyUrl = "https://corsproxy.io/?";
const targetUrl = "https://zenquotes.io/api/quotes/";
const quoteurl = proxyUrl + encodeURIComponent(targetUrl);

async function getQuote(){
    try{
        const response= await fetch(quoteurl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data= await response.json();
        const randomIndex= Math.floor(Math.random() * data.length);
        data= [data[randomIndex]];
        // console.log(data);
        quote.textContent= `"${data[0].q}"`;
        author.textContent= `- ${data[0].a}`;
    }catch(error){
        quote.textContent= "An error occurred while fetching the quote.";
        author.textContent= "";
        console.error("Error fetching quote:", error);
    }
}

newQuoteBtn.addEventListener("click", getQuote);
getQuote();
// shareBtn.addEventListener("click", function(){  // to copy the quote to clipboard
//     const textToShare= `${quote.textContent} ${author.textContent}`;
//     navigator.clipboard.writeText(textToShare);
// });

shareBtn.addEventListener("click", whatsapp);  // to share the quote using Web Share API
// function whatsapp(){
//     const textToShare= `${quote.textContent}\n -${author.textContent}`;
//     if (navigator.share) {
//         navigator.share({
//             title: 'Inspirational Quote',
//             text: textToShare,
//             // url: window.location.href
//         })
//         .catch(error => {
//             console.error('Error sharing quote:', error);
//         });
//     } else {
//         console.log('Web Share API not supported');
//     }
// }
//another way to share the quote using whatsapp web
function whatsapp(){
    const textToShare= `${quote.textContent}\n -${author.textContent}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
    window.open(whatsappUrl, '_blank');
}


// const Quotes=[
//     {
//         quote: "The only way to do great work is to love what you do.",
//         author: "Steve Jobs"
//     },
//     {
//         quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//         author: "Winston Churchill"
//     },
//     {
//         quote: "Believe you can and you're halfway there.",
//         author: "Theodore Roosevelt"
//     },
//     {
//         quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
//         author:"Nikola Tesla"
//     },
//     {
//         quote: "The best way to predict the future is to invent it.",
//         author: "Alan Kay"
//     },
//     {
//         quote: "The present is theirs; the future, for which I really worked, is mine.",
//         author: "Nikola Tesla"
//     },
//     {   quote: "369 is the key to the universe.",
//         author:"Nikola Tesla",
//     },
//     {
//         quote: "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe.",
//         author: "Srinivasa Ramanujan",
//     },
//     {
//         quote :"An equation has no meaning for me unless it expresses a thought of God.",
//         author: "Srinivasa Ramanujan",
//     },
//     {   
//         quote:" Somewhere, something incredible is waiting to be known.",
//         author: "Srinivasa Ramanujan",
//     },
//     {
//         quote: "Arise, awake, and stop not until the goal is reached.",
//         author:"Swami Vivekananda",
//     }
// ];

// function getRandomQuote(){
//     const randomIndex= Math.floor(Math.random() * Quotes.length);
//     return Quotes[randomIndex];
// }
// function displayQuote(){
//     const randomQuote= getRandomQuote();
//     quote.textContent= `"${randomQuote.quote}"`; // or innerHTML
//     author.textContent= `- ${randomQuote.author}`;
// }
// newQuoteBtn.addEventListener("click", displayQuote);
// shareBtn.addEventListener("click", function(){
//     const textToShare= `${quote.textContent} ${author.textContent}`;
//     navigator.clipboard.writeText(textToShare);
// });
// displayQuote();

