const APIKEY =  'b33505cebde4ca0f7f447922d0eafb5a';
const APIURL =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b33505cebde4ca0f7f447922d0eafb5a&page=";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=b33505cebde4ca0f7f447922d0eafb5a&query=";

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
  
  showMovies(respData.results)
}

function showMovies(movies) {
  // clear mainWrapper
  let count = 1
  mainWrapper.innerHTML = '';
   movies.forEach( movie => {
    
    if (count <= 18 ) {
      
      count++
      
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
    } else {

    }
    
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


// footer

const footer = document.querySelector('.footer__row')
getMoviesFooter()

async function getMoviesFooter() {
  let resFooter = await fetch(APIURL)
  resFooter = await resFooter.json()
  showMoviesFooter(resFooter.results)
  console.log(resFooter.results)
}

function showMoviesFooter(resFooter) {
  
  resFooter.forEach((movieF) => {
    
    const {backdrop_path} = movieF
    const movieElFoot = document.createElement('div')
     movieElFoot.classList.add('footer__card')
     movieElFoot.innerHTML = `
          
            <img src="${IMGPATH+backdrop_path}" alt="">
          `
    footer.appendChild( movieElFoot)
    
  })
}