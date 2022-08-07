const ajax = new XMLHttpRequest();
const container = document.getElementById("root");
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  const id = location.hash.substr(1);

  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const item = newsFeed[i];
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${item.id}`;
  a.innerHTML = `${item.title} (${item.comments_count})`;

  // a.addEventListener("click", (e) => {});

  li.appendChild(a);
  ul.appendChild(li);
}
container.appendChild(ul);
container.appendChild(content);
