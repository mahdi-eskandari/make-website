/* ------------------- header ---------------------*/
const header = document.querySelector("header")
const navbar = document.createElement("div")
navbar.id = "style-navbar"

const child1 = document.createElement("div")
child1.classList.add("child1")

const child2 = document.createElement("div")
child2.classList.add("child2")

const input = document.createElement("input")
input.classList.add("input")
input.placeholder = "search"
child2.appendChild(input)

const logo = document.createElement("a")
logo.href = "google.com"
logo.classList.add("logo")
logo.textContent = "AkibaStream"
child1.appendChild(logo)

const navbarElement = ["Home", "Popular", "About Us"]
navbarElement.forEach((el, index) => {
    const a = document.createElement("a");
    a.textContent = el
    a.href = "#"
    a.classList.add(`style-a${index + 1}`)
    child2.appendChild(a)
});

navbar.appendChild(child1)
navbar.appendChild(child2)
header.appendChild(navbar)

const a_home = document.querySelector(".style-a1")
const a_popular = document.querySelector(".style-a2")
const a_aboutUs = document.querySelector(".style-a3")
a_home.style.display = "none"

const titreParent = document.querySelector("#titre")
const h1 = document.createElement("h1")
const h2 = document.createElement("h2")
h1.classList.add("titre1")
h2.classList.add("titre2")
h1.textContent = "The most popular anime of the week!"
h2.textContent = "Don't miss the best and most viewed anime of this week!"
titreParent.appendChild(h1)
titreParent.appendChild(h2)
document.body.appendChild(titreParent)
/* ------------------- header ---------------------*/





/* ----------------------  request  -----------------------*/
async function request2() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response_page2 = await fetch("https://api.jikan.moe/v4/top/anime?page=3")
    if (!response_page2.ok) {
        throw "Undefined data ... !!!!!!";
    }
    const data_page2 = await response_page2.json()
    return data_page2.data
}


async function request1() {
    console.log("Fetching data...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("https://api.jikan.moe/v4/top/anime?page=4");

    if (!response.ok) {
        throw "Undefined data ... !!!!!!";
    }

    const data1 = await response.json();
    return data1.data
}


async function mergeDatas() {
    try {
        const data1 = await request2();
        const data2 = await request1();

        const mergeDatas = [...data1, ...data2];

        console.log("merge data:", mergeDatas);

        createCard(mergeDatas);
        productsSearch(mergeDatas);
        popular(mergeDatas)
        home(mergeDatas)

    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}
mergeDatas()



function createCard(data) {
    displayResult(data.slice(42, 50));
}

function displayResult(animes) {
    const productList = document.querySelector("#product-list");
    productList.innerHTML = "";

    let htmlContent = "";
    animes.slice(0, 8).forEach(anime => {
        htmlContent += `
        <div class="style-divParent">
            <div class="divIMG">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            </div>
            <div class="divTEXT">
                <h3>${anime.title}</h3>
                <p>Score: ${anime.score}</p>
                <p class="Summary">${anime.synopsis.slice(0, 100)}...</p>
            </div>
        </div>
        `;
    });

    productList.innerHTML = htmlContent;
}
/* ----------------------  request  -----------------------*/



/*  ---------------------   Popular   -----------------------*/
function popular(animes) {
    const a_popular = document.querySelector(".style-a2")
    const a_aboutUs = document.querySelector(".style-a3")

    const productList = document.querySelector("#product-list");

    const Interesting = document.querySelector("#Interesting_statistics");
    const h1 = document.querySelector(".titre1");
    const h2 = document.querySelector(".titre2");

    const containerFooter = document.querySelector("#con_footer")
    const footer = document.createElement("footer");

    const a_home = document.querySelector(".style-a1")

    a_popular.addEventListener("click", () => {
        productList.style.display = "none";
        Interesting.style.display = "none";
        containerFooter.style.display = "none";
        a_home.style.display = "block"
        a_popular.style.display = "none"
        a_aboutUs.style.display = "block"


        let htmlContent = "";
        animes.slice(5, 37).forEach(anime => {
            htmlContent += `
                <div class="style-divParent">
                    <div class="divIMG">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    </div>
                    <div class="divTEXT">
                        <h3>${anime.title}</h3>
                        <p>Score: ${anime.score}</p>
                        <p class="Summary">${anime.synopsis.slice(0, 100)}...</p>
                    </div>
                </div>
            `;
        });

        productList.innerHTML = htmlContent;
        productList.style.display = "flex";

        containerFooter.innerHTML = `
        <footer id="footer-2">
<div id="AboutUs">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182); font-weight: 50px;">About Us</h2>
    <p class="p_footer" style="font-size: 20px;">Welcome to AkibaStream! Your ultimate destination for anime news, reviews, and top anime recommendations. Stay tuned for the latest updates!</p>
    <p style="padding-bottom: 20px;" class="footer-bottom">&copy; 2025 AkibaStream | Powered by Anime Fans ❤️</p>
</div>

<div id="explore">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182);">Explore</h2>
    <div id="explore_child">
        <a href="">Home</a>
        <a href="">Top Anime</a>
        <a href="">New Releases</a>
        <a href="">Community</a>
    </div>
</div>
</footer>
`;
        containerFooter.style.display = "block"
        about_us.style.display = "none";
        h1.style.display = "block"
        h2.style.display = "block"


        h1.textContent = "Anime that has taken over the world!"
        h2.textContent = "The best of the anime world that you should not miss!"
    });
}
/*  ---------------------   Popular   -----------------------*/









/*  ---------------------   Home   -----------------------*/
function home(animes) {
    const a_home = document.querySelector(".style-a1")

    a_home.addEventListener("click", () => {
        const productList = document.querySelector("#product-list");
        const footer_2 = document.querySelector("#footer-2")
        const Interesting = document.querySelector("#Interesting_statistics");
        const h1 = document.querySelector(".titre1");
        const h2 = document.querySelector(".titre2");
        const containerFooter = document.querySelector("#con_footer")
        const footer = document.createElement("footer");
        const a_home = document.querySelector(".style-a1")
        const a_popular = document.querySelector(".style-a2")
        const a_aboutUs = document.querySelector(".style-a3")

        footer_2.style.display = "none"

        productList.innerHTML = "";

        let htmlContent = "";
        animes.slice(30, 38).forEach(anime => {
            htmlContent += `
        <div class="style-divParent">
            <div class="divIMG">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            </div>
            <div class="divTEXT">
                <h3>${anime.title}</h3>
                <p>Score: ${anime.score}</p>
                <p class="Summary">${anime.synopsis.slice(0, 100)}...</p>
            </div>
        </div>
        `;
        });

        productList.innerHTML = htmlContent;
        containerFooter.innerHTML = `
        <footer id="footer">
<div id="AboutUs">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182); font-weight: 50px;">About Us</h2>
    <p class="p_footer" style="font-size: 20px;">Welcome to AkibaStream! Your ultimate destination for anime news, reviews, and top anime recommendations. Stay tuned for the latest updates!</p>
    <p style="padding-bottom: 20px;" class="footer-bottom">&copy; 2025 AkibaStream | Powered by Anime Fans ❤️</p>
</div>

<div id="explore">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182);">Explore</h2>
    <div id="explore_child">
        <a href="">Home</a>
        <a href="">Top Anime</a>
        <a href="">New Releases</a>
        <a href="">Community</a>
    </div>
</div>
</footer>
`;
        h1.style.display = "block"
        h2.style.display = "block"
        Interesting.style.display = "block";
        a_home.style.display = "none"
        a_popular.style.display = "block"
        about_us.style.display = "none";
        a_aboutUs.style.display = "block"
        h1.textContent = "The most popular anime of the week!"
        h2.textContent = "Don't miss the best and most viewed anime of this week!"
    })
}
/*  ---------------------   Home   -----------------------*/









/* --------------------------- style about US ---------------------------*/
const about_us = document.querySelector("#about_us")
about_us.style.display = "none"

about_us.innerHTML = `
            <div class="about-img">
                <img src="World-Anime.jpg" alt="World Anime">
            </div>
            <div class="about-text">
                <h2 class="h_aboutUS">About Us - Discover the World of Anime</h2>
                <p class="p_aboutUS">Welcome to the ultimate Anime universe, where passionate fans come together to explore, discover, and celebrate everything anime has to offer. Whether you're a long-time anime enthusiast or someone just beginning to dive into this captivating world, Anime Galaxy is here to be your guide, companion, and community.</p>
                <p class="p_aboutUS">At Anime Galaxy, we believe that anime is more than just a form of entertainment. It's a culture, a lifestyle, and a community. From action-packed adventures to heartwarming stories, anime transcends genres and brings people of all ages, backgrounds, and interests together. Our mission is to provide you with the best anime reviews, recommendations, and discussions, while also offering a space for fans to interact and share their love for anime.</p>
                <p class="p_aboutUS">Our team consists of anime lovers, critics, and creators who dedicate themselves to researching and providing the latest anime releases, trends, and in-depth reviews. We want to help you stay updated on what's trending in the anime world, highlight hidden gems that may have flown under the radar, and introduce you to anime genres you may have never considered before.</p>
                <h3 class="h_aboutUS">Our Story</h3>
                <p class="p_aboutUS">The idea for Anime Galaxy was born from a shared love for anime and the need for a centralized platform where fans can not only find information about their favorite series but also discuss, rate, and share their personal anime experiences. Our founders, who have been fans of anime for over a decade, recognized the growing demand for a community-focused platform that goes beyond simply watching anime. They envisioned a space where anime enthusiasts can come together to share their passion, discuss theories, and discover new shows that they might have missed. That vision turned into the Anime Galaxy you see today.</p>
                <h3 class="h_aboutUS">Our Mission</h3>
                <p class="p_aboutUS">Our mission is simple: to build a supportive, inclusive, and engaging space for anime fans around the world. We aim to bring anime fans closer together by providing quality content, helpful resources, and a platform for sharing experiences. We also strive to make it easy for newcomers to explore the world of anime, with curated lists, beginner's guides, and expert recommendations.</p>
                <h3 class="h_aboutUS" style="color: rgb(224, 224, 224);">What We Offer</h3>
                <ul>
                    <li><strong>In-Depth Anime Reviews:</strong> Our team provides comprehensive reviews of anime series, movies, and OVAs, analyzing themes, characters, animation quality, and much more. Whether you're looking for the next big hit or an underrated gem, we’ve got you covered.</li>
                    <li><strong>Anime Recommendations:</strong> Whether you love action, romance, sci-fi, or slice-of-life, we curate lists to match every taste. Our personalized recommendation engine will help you discover the perfect anime based on your preferences.</li>
                    <li><strong>Anime Community:</strong> Join our forums and online communities where fans from all over the world discuss episodes, share fan art, talk about upcoming releases, and theorize about the next plot twists.</li>
                    <li><strong>Anime News and Updates:</strong> Stay updated on the latest news, including new anime announcements, season releases, and industry events. We bring you the latest headlines from the anime world as soon as they break.</li>
                    <li><strong>Special Features and Articles:</strong> Dive deeper into the anime industry with special features, interviews with creators, and articles on the cultural impact of anime across the globe.</li>
                </ul>
                <h3 class="h_aboutUS">Join Us on This Journey</h3>
                <p class="p_aboutUS">We invite you to be a part of the Anime Galaxy family. Whether you want to share your thoughts, discover new anime, or engage with like-minded individuals, there is a place for you here. Our platform is constantly evolving to meet the needs of our community, so don’t forget to subscribe to our newsletter and stay connected with the latest anime news, reviews, and events.</p>
                <p class="p_aboutUS">Join us as we continue to explore the vast world of anime and share our love for this incredible art form. Together, let's create a space where anime fans can unite, inspire each other, and build lasting connections.</p>
                <p class="p_aboutUS">Welcome to the Anime Galaxy - where the adventure never ends!</p>
            </div>
`

a_aboutUs.addEventListener("click", () => {
    const a_home = document.querySelector(".style-a1")
    const a_popular = document.querySelector(".style-a2")
    const a_aboutUs = document.querySelector(".style-a3")
    const productList = document.querySelector("#product-list");

    const Interesting = document.querySelector("#Interesting_statistics");

    const h1 = document.querySelector(".titre1");
    const h2 = document.querySelector(".titre2");

    const containerFooter = document.querySelector("#con_footer")
    const footer = document.createElement("footer");

    h1.style.display = "none"
    h2.style.display = "none"
    productList.style.display = "none"
    Interesting.style.display = "none"

    about_us.style.display = "block"
    a_aboutUs.style.display = "none"
    a_home.style.display = "block"
    a_popular.style.display = "block"



    containerFooter.innerHTML = `
        <footer id="footer3">
<div id="AboutUs">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182); font-weight: 50px;">About Us</h2>
    <p class="p_footer" style="font-size: 20px;">Welcome to AkibaStream! Your ultimate destination for anime news, reviews, and top anime recommendations. Stay tuned for the latest updates!</p>
    <p style="padding-bottom: 20px;" class="footer-bottom">&copy; 2025 AkibaStream | Powered by Anime Fans ❤️</p>
</div>

<div id="explore">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182);">Explore</h2>
    <div id="explore_child">
        <a href="">Home</a>
        <a href="">Top Anime</a>
        <a href="">New Releases</a>
        <a href="">Community</a>
    </div>
</div>
</footer>
`;
})
/* --------------------------- style about US ---------------------------*/





/*   ------------- search ------------   */
function productsSearch(data) {
    const searchBox = document.querySelector(".input");

    searchBox.addEventListener("keyup", (e) => {
        const searchValue = e.target.value.toLowerCase().trim();

        const filteredResults = data.filter((anime) => {
            return anime.title.toLowerCase().includes(searchValue) ||
                anime.synopsis.toLowerCase().includes(searchValue);
        });

        displayResult(filteredResults);
    });
}
/*   ------------- search ------------   */








/*-------------------------- Interesting ----------------------------*/
const interesting = document.querySelector("#Interesting_statistics")
const p_interesting = document.createElement("p")
p_interesting.id = "interesting_text"
p_interesting.textContent = "Interesting anime facts"
interesting.appendChild(p_interesting)

const animeFact1 = [
    {
        title: "😱 The Anime Where Fans Brought a Dead Character Back to Life!",
        name: "JoJo’s Bizarre Adventure: Stardust Crusaders",
        releaseYear: 2014,
        character: "Jean Pierre Polnareff",
        description: "In the Stardust Crusaders arc of JoJo’s Bizarre Adventure, a character named Jean Pierre Polnareff was originally meant to die. However, after the manga was released, fans protested so intensely that the author, Hirohiko Araki, was forced to change the story and keep the character alive!",
        specialFact: "This is one of the rare cases in anime and manga history where fan pressure directly influenced the storyline and saved a character from death!",
        image: "https://de7i3bh7bgh0d.cloudfront.net/2019/01/25/19/12/01/6367c0d3-770c-44d6-a8e7-0f4dc6011adb/JOJOstardust3_screen_1200x630v3.jpg"
    }]

const animeFact2 = [
    {
        title: "💰 Most Expensive Anime Movie",
        name: "The Boy and The Heron",
        director: "Hayao Miyazaki",
        studio: "Studio Ghibli",
        budget: "80,000,000$", // $80 million
        releaseYear: 2023,
        description: "Released in 2023, this movie became the most expensive anime film ever made! Its budget was even higher than movies like Toy Story 3.",
        specialFact: "One of Miyazaki's most anticipated films after coming out of retirement!",
        image: "https://sfreporter.com/downloads/63266/download/Movies-The-Boy-and-the-Heron.jpg?cb=4da6fbb5be8db2c1b5e4d6ca119a8160&w=1000"
    }]

const animeFact3 = [
    {
        title: "📖 Best-Selling Manga",
        name: "One Piece",
        author: "Eiichiro Oda",
        copiesSold: "500,000,000", // 500 million copies
        description: "One Piece is not only the best-selling manga but also one of the best-selling books in human history! It has even outsold Harry Potter.",
        specialFact: "It has been running since 1997 and is still not finished!",
        image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/One-Piece-Featured.jpg"
    }]

animeFact1.forEach(fact => {
    const divEL = document.createElement("div")
    divEL.classList.add("divEL_1")
    divEL.innerHTML = `
<div class = "imggggg">
<img class = "style_imaggggg" src="${fact.image}" alt="${fact.name}">
</div>

<div class = "texttttt" style = "border: 3px solid rgb(255, 145, 0); border-radius :50px; height: auto">
        <h3 style = "font-size: 36px; color: rgb(255, 145, 0);padding: 0 20px">${fact.title}</h3>
        <p style = "font-size: 30px; padding-top:20px"><strong>name: ${fact.name}</strong></p>
        <p style = "font-size: 20px; padding-top:20px">episodes: ${fact.character}</p>
        <p style = "padding:30px 50px 0 50px; font-size:19px; padding-bottom: 10px"><em>${fact.description}</em></p>
</div>
`
    interesting.appendChild(divEL)
})

animeFact2.forEach(fact => {
    const divEL = document.createElement("div")
    divEL.classList.add("divEL_1")
    divEL.innerHTML = `
    <div class = "texttttt" style = "border: 3px solid rgb(255, 145, 0); border-radius :50px">
    <h3 style = "font-size: 36px; color: rgb(255, 145, 0);">${fact.title}</h3>
    <p style = "font-size: 30px; padding-top:20px"><strong>name: ${fact.name}</strong></p>
    <p style = "font-size: 20px; padding-top:20px">budget: ${fact.budget}</p>
    <p style = "padding:30px 50px 0 50px; font-size:19px; padding-bottom: 10px"><em>${fact.description}</em></p>
    </div>


    <div class = "imggggg">
    <img class = "style_imaggggg" src="${fact.image}" alt="${fact.name}">
    </div>
`
    interesting.appendChild(divEL)
})

animeFact3.forEach(fact => {
    const divEL = document.createElement("div")
    divEL.classList.add("divEL_1")
    divEL.innerHTML = `
    <div class = "imggggg">
    <img class = "style_imaggggg" src="${fact.image}" alt="${fact.name}">
    </div>


    <div class = "texttttt" style = "border: 3px solid rgb(255, 145, 0); border-radius :50px">
    <h3 style = "font-size: 36px; color: rgb(255, 145, 0);">${fact.title}</h3>
    <p style = "font-size: 30px; padding-top:20px"><strong>name: ${fact.name}</strong></p>
    <p style = "font-size: 20px; padding-top:20px">copiesSold: ${fact.copiesSold}</p>
    <p style = "padding:30px 50px 0 50px; font-size:19px; padding-bottom: 10px"><em>${fact.description}</em></p>
    </div>
`
    interesting.appendChild(divEL)
})
/*-------------------------- Interesting ----------------------------*/







/*----------------------------  footer  -----------------------------*/
const containerFooter = document.querySelector("#con_footer")
const footer = document.createElement("footer");
footer.id = "footer"

footer.innerHTML = `
<div id="AboutUs">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182); font-weight: 50px;">About Us</h2>
    <p class="p_footer" style="font-size: 20px;">Welcome to AkibaStream! Your ultimate destination for anime news, reviews, and top anime recommendations. Stay tuned for the latest updates!</p>
    <p style="padding-bottom: 20px;" class="footer-bottom">&copy; 2025 AkibaStream | Powered by Anime Fans ❤️</p>
</div>

<div id="explore">
    <h2 style="display: inline-block; border-bottom: 2px solid rgb(255, 196, 0); color: rgb(169, 179, 182);">Explore</h2>
    <div id="explore_child">
        <a href="">Home</a>
        <a href="">Top Anime</a>
        <a href="">New Releases</a>
        <a href="">Community</a>
    </div>
</div>
`;
containerFooter.appendChild(footer);
/*----------------------------  footer  -----------------------------*/