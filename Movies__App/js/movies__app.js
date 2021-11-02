const APIKEY =  '04c35731a5ee918f014970082a0088b1';
const APIURL =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const mainWrapper = document.querySelector('.movies__wrapper')

let page = 1
// buttons
const nextPage = document.querySelector('.next__movie')
const prevPage = document.querySelector('.prev__movie')

nextPage.addEventListener('click', () => {
  page += 1
  getMovies(APIURL+page)
  window.scrollTo(0, 0)
  if (page >= 2) {
    prevPage.classList.remove('noActive')
  }
})

prevPage.addEventListener('click', () => {
  if (page > 1) {
    page -= 1
  getMovies(APIURL+page)
  window.scrollTo(0, 0)
  } else {
  }
  if (page < 2) {
      prevPage.classList.add('noActive')
    }

})


 // get movies
getMovies(APIURL+page)

async function getMovies(url) {
  const responce = await fetch(url)
  const respData = await responce.json()
  console.log(respData.results)
  showMovies(respData.results)
}

function showMovies(movies) {
  // clear mainWrapper
  mainWrapper.innerHTML = '';
   movies.forEach( movie => {
    const {poster_path, title, vote_average, backdrop_path, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie__card')
    movieEl.innerHTML = `
              <img src="${IMGPATH + poster_path}" alt="poster">
              <div class="movie__info">
                <h3 class="movie__title ">${title}</h3>
                <span class="movie__rating ${getClassByRate(vote_average)}">${vote_average}</span>
              </div>
              <div class ='movie__overview'> 
              <h4 class="overview__title">Overview:<h4>
              ${overview} 
              </div>
            `
  
    mainWrapper.appendChild(movieEl)
  })
}
// creating color for rating 
function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green'
  } else if (vote >=5 ) {
    return 'orange'
  } else {
    return 'red'
  }
} 


// form search button
const form = document.getElementById('search__form')
const search = document.getElementById('search')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchValue = search.value

  if(searchValue) {
    getMovies(SEARCHAPI + searchValue)
    search.value = '';
  }
})  


