export const openModal = (modal) => {
  let layout = document.createElement('div')
  layout.classList.add('modal-backdrop')
  layout.classList.add('fade')
  document.body.append(layout)
  /*   document.body.insertAdjacentHTML('beforeend',`<div class="modal-backdrop fade show"></div>`) */

  modal.classList.add('d-block')
  setTimeout(() => {
    layout.classList.add('show')
    modal.classList.add('show')
  }, 100)
}
export const closeModal = (modal) => {
  let layout = document.querySelector('.modal-backdrop')
  modal.classList.remove('show')
  layout && layout.classList.remove('show')
  setTimeout(() => {
    modal.classList.remove('d-block')
    layout && layout.remove()
  }, 500)
}
