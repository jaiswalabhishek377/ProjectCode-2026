const searchresults = document.getElementById("searchresult");
const showmore = document.getElementById("showmore");
const searchbox = document.querySelector(".search");
const searchinput = document.getElementById("searchInput");
const searchbutton = document.getElementById("searchButton");       

let keyword = "";
let page = 1;
const apiKey = "YOUR_API_KEY";
async function search() {
    keyword = searchinput.value.trim();
    if (keyword === "") {
        alert("Please enter a search term.");
        return;
    }
    page = 1;
    searchresults.innerHTML = "";
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.results);
    showmore.style.display = "block";
    // console.log(data.results);
}

searchbutton.addEventListener("click", search);
function displayResults(results) {
    results.forEach(result => {
        const img = document.createElement("img");
        img.src = result.urls.small;
        searchresults.appendChild(img);
    });
}

showmore.addEventListener("click", async () => {
    page = page + 1;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.results);
}
);


