// vars
const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

// listeners
// fill
fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)
// empties
for (let empty of empties) {
  empty.addEventListener('dragover', dragOver)
  empty.addEventListener('dragenter', dragEnter)
  empty.addEventListener('dragleave', dragLeave)
  empty.addEventListener('drop', dragDrop)

}


// drag functions
function dragStart() {
  this.classList.add('hold')
  setTimeout(() => this.classList.add('invisible'), 0) 
}

function dragEnd() {
  this.className = 'fill'
}

// empties functions
function dragOver(e) {
  e.preventDefault()


}
function dragLeave() {
  this.classList.remove('hover')

}
function dragEnter(e) {
  e.preventDefault()
  this.classList.add('hover')

}
function dragDrop() {
    this.className = 'empty'
    this.append(fill)

}



