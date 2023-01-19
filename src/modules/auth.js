import { openModal, closeModal } from './modals.js'
import { getData } from './api.js'

export const authFunc = () => {
  let authBtn = document.querySelector('#open-auth-btn')
  let openCartBtn = document.querySelector('#open-cart-btn')
  let logoutBtn = document.querySelector('#logout-btn')
  let modal = document.querySelector('#auth-modal')
  let cartModal = document.querySelector('#cart-modal')
  let closeAuthBtns = modal.querySelectorAll('.close-btn')
  let loginBtn = modal.querySelector('.login-btn')

  function checkAuth() {
    // if (JSON.parse(localStorage.getItem('auth'))) {
    //   login()
    // }
    const user = JSON.parse(localStorage.getItem('auth'))
    if (user) {
      getData('profile').then((data) => {
        if (
          data.login &&
          data.login === user.login &&
          data.password &&
          data.password === user.password
        ) {
          login()
        }
      })
    }
  }

  function login() {
    authBtn.classList.add('d-none')
    openCartBtn.classList.remove('d-none')
    logoutBtn.classList.remove('d-none')
    closeModal(modal)
  }
  function logout() {
    authBtn.classList.remove('d-none')
    openCartBtn.classList.add('d-none')
    logoutBtn.classList.add('d-none')
  }

  authBtn.addEventListener('click', () => {
    openModal(modal)
  })
  closeAuthBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(modal)
    })
  })
  loginBtn.addEventListener('click', () => {
    let loginInput = modal.querySelector('#login-control')
    let passwordInput = modal.querySelector('#password-control')
    let user = {
      login: loginInput.value,
      password: passwordInput.value,
    }

    getData('profile').then((data) => {
      if (
        data.login &&
        data.login === user.login &&
        data.password &&
        data.password === user.password
      ) {
        localStorage.setItem('auth', JSON.stringify(data))
        login()
      }
    })
  })
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('auth')

    logout()
  })

  openCartBtn.addEventListener('click', () => {
    openModal(cartModal)
  })

  checkAuth()
}
