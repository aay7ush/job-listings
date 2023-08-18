const main = document.querySelector("main")
const filterBox = document.querySelector("#filter-box")

fetch("../data.json")
  .then((res) => res.json())
  .then((entries) => {
    entries.forEach((entry) => {
      const article = document.createElement("article")
      article.innerHTML = `
          <article class="lg:flex lg:justify-between lg:items-center relative p-5 space-y-4 font-bold bg-white rounded-lg ${
            entry.featured ? "border-l-[6px] border-clr-desaturated-cyan" : ""
          }">
            <div class="absolute w-14 -top-7 lg:left-7 lg:w-16 lg:top-11">
              <img src="${entry.logo}" alt="" />
            </div>
            <div class="space-y-2 lg:ml-24">
              <div class="flex items-center gap-5">
                <p class="text-clr-desaturated-cyan">${entry.company}</p>
                ${
                  entry.new
                    ? `
                  <div class="flex gap-2 text-white uppercase">
                    <p class="bg-clr-desaturated-cyan pt-[2.5px] px-2 rounded-xl">New!</p>
                    ${
                      entry.featured
                        ? `<p class="bg-clr-grayish-cyan-700 pt-[2.5px] px-2 rounded-xl">Featured</p>`
                        : ""
                    }
                  </div>
                `
                    : ""
                }
              </div>
              <p class="transition duration-300 cursor-pointer text-clr-grayish-cyan-700 hover:text-clr-desaturated-cyan">${
                entry.position
              }</p>
              <div class="flex items-center gap-3 font-medium text-clr-grayish-cyan-600">
                <p>${entry.postedAt}</p>
                <span class="dot"></span>
                <p>${entry.contract}</p>
                <span class="dot"></span>
                <p>${entry.location}</p>
              </div>
            </div>
            <hr class="border " />
            <div class="flex flex-wrap gap-4">
              <button class="filter">${entry.role}</button>
              <button class="filter">${entry.level}</button>
              ${entry.languages
                .map((lang) => `<button class="filter">${lang}</button>`)
                .join("")}
              ${entry.tools
                .map((tool) => `<button class="filter">${tool}</button>`)
                .join("")}
            </div>
          </article>
        `
      main.append(article)
    })

    function filterArticles() {
      const selectedFilters = Array.from(
        filterBox.querySelectorAll(".filterbox-filter")
      ).map((filter) => filter.textContent.trim())

      const articles = main.querySelectorAll("article")

      articles.forEach((article) => {
        const articleFilters = Array.from(
          article.querySelectorAll(".filter")
        ).map((filter) => filter.textContent.trim())

        if (
          selectedFilters.every((filter) => articleFilters.includes(filter))
        ) {
          article.classList.remove("hidden")
        } else {
          article.classList.add("hidden")
        }
      })
    }

    const filters = document.querySelectorAll("button.filter")
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        if (filterBox.classList.contains("hidden")) {
          filterBox.classList.replace("hidden", "flex")
        }

        const existingFilters = filterBox.querySelectorAll(".filterbox-filter")
        const filterText = filter.textContent
        const filterExists = Array.from(existingFilters).some(
          (existingFilter) => existingFilter.textContent.trim() === filterText
        )

        if (!filterExists) {
          filterBox.firstElementChild.innerHTML += `
        <div class="filterbox-filter flex overflow-hidden rounded-[4px]">
          <span class="bg-clr-grayish-cyan-200 text-clr-desaturated-cyan px-2.5 pt-1">${filter.textContent}</span>
          <button class="px-2 transition duration-300 bg-clr-desaturated-cyan hover:bg-clr-grayish-cyan-700">
            <img src="../images/icon-remove.svg" alt="" />
          </button>
        </div>
      `
        }

        filterArticles()
      })
    })

    const clearBtn = document.getElementById("clear-btn")

    clearBtn.addEventListener("click", () => {
      while (filterBox.firstElementChild.firstChild) {
        filterBox.firstElementChild.removeChild(
          filterBox.firstElementChild.firstChild
        )
      }
    })

    filterBox.addEventListener("click", (e) => {
      e.target.parentNode.nodeName === "BUTTON"
        ? e.target.parentNode.parentElement.remove()
        : null

      filterBox.firstElementChild.childElementCount === 0
        ? filterBox.classList.replace("flex", "hidden")
        : null

      filterArticles()
    })
  })
