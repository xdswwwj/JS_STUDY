const ajax = new XMLHttpRequest();
const container = document.getElementById("root");
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

// NOTE: get 요청 xhr 함수
function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

// NOTE: news 리스트
function newsFeed() {
  const newsList = [];
  const newsFeed = getData(NEWS_URL.replace("@page", store.currentPage));
  const newsListLength = newsFeed.length;
  const showList = 10;
  const maxPage = newsListLength / showList;
  console.log(newsFeed.length);

  newsList.push("<ul>");
  for (
    let i = (store.currentPage - 1) * showList;
    i < store.currentPage * showList;
    i++
  ) {
    const item = newsFeed[i];
    newsList.push(`
      <li>
        <a href="#/show/${item.id}">
          ${item.title} (${item.comments_count})
        </a>
      </li>
    `);
  }
  newsList.push("</ul>");

  newsList.push(`
    <div>
      <a href="#/page/${
        store.currentPage > 1 ? store.currentPage - 1 : 1
      }">이전 페이지</a>
      <a href="#/page/${
        store.currentPage < maxPage ? store.currentPage + 1 : maxPage
      }">다음 페이지</a>
    </div>
  `);

  container.innerHTML = newsList.join("");
}

// NOTE: news 디테일
function newsDetail() {
  const id = location.hash.substr(7);

  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

// NOTE: router 함수
function router() {
  const routePath = location.hash;
  console.log(routePath);
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    console.log("newsDetail");
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
