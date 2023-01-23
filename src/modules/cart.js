import { openModal, closeModal } from './modals.js'
import { getData, putData, patchData } from './api'

export const cartFunc = () => {
  let cartModal = document.querySelector('#cart-modal')
  let openCartBtn = document.querySelector('#open-cart-btn')
  let closeBtns = cartModal.querySelectorAll('.close-btn')
  let container = document.querySelector('#cart-container')
  let totalPrice = document.querySelector('#cart-totlal-price')

  const render = (data) => {
    container.innerHTML = ''

    data.forEach((item) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
        <div class="row border-bottom pb-3 pt-3">
          <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
              ${item.name}
          </div>
          <div
              class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
              <h4 class="me-3 d-flex align-itemns-center">
              ${item.price} ₽</h4>
              <button 
                type="button" 
                class="btn btn-outline-dark btn-sm cart-item-controls"
                id="control-dec"
                data-id="${item.id}"
                data-count="${item.count}" 
                data-price="${item.price}" 
                data-name="${item.name}"
                >
                  -
              </button>
              <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
              <button 
                type="button" 
                class="btn btn-outline-dark btn-sm cart-item-controls"
                id="control-inc"
                data-id="${item.id}"
                data-count="${item.count}" 
                data-price="${item.price}"
                data-name="${item.name}"
                >
                  +
              </button>
          </div>
          </div>
      `
      )
      //data-price="${item.price}" and data-name="${item.name}" let del for patch
    })
  }

  const updateCart = () => {
    getData('cart')
      .then((data) => {
        render(data)
        updateTotalCart(data)
      })
      .catch((error) => {
        console.error('404 (Not Found)')
      })
  }
  const updateTotalCart = (data) => {
    let total = 0
    data.forEach((item) => {
      total += +item.price * +item.count
    })
    totalPrice.textContent = total + ' ₽'
  }

  openCartBtn.addEventListener('click', () => {
    updateCart()
    openModal(cartModal)
  })

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(cartModal)
    })
  })

  // This is PUT request for the product with the product name selected in the cart
  /* PUT */
  // container.addEventListener('click', (e) => {
  //   if (e.target.closest('button')) {
  //     if (e.target.id && e.target.id === 'control-inc') {
  //       const id = e.target.dataset.id
  //       const count = +e.target.dataset.count
  //       const price = e.target.dataset.price
  //       const name = e.target.dataset.name

  //       const item = {
  //         id: id,
  //         count: count + 1,
  //         price: price,
  //         name: name,
  //       }
  //       putData(`cart/${id}`, item).then(() => {
  //         updateCart()
  //       })
  //     } else if (e.target.id && e.target.id === 'control-dec') {
  //       const id = e.target.dataset.id
  //       const count = +e.target.dataset.count
  //       const price = e.target.dataset.price
  //       const name = e.target.dataset.name

  //       if (count > 0) {
  //         const item = {
  //           id: id,
  //           count: count - 1,
  //           price: price,
  //           name: name,
  //         }
  //         putData(`cart/${id}`, item).then(() => {
  //           updateCart()
  //         })
  //       }
  //     }
  //   }
  // })
  /* PATCH */
  container.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
      if (e.target.id && e.target.id === 'control-inc') {
        const id = e.target.dataset.id
        const count = +e.target.dataset.count

        const item = {
          count: count + 1,
        }
        patchData(`cart/${id}`, item).then(() => {
          updateCart()
        })
      } else if (e.target.id && e.target.id === 'control-dec') {
        const id = e.target.dataset.id
        const count = +e.target.dataset.count

        if (count > 0) {
          const item = {
            count: count - 1,
          }
          patchData(`cart/${id}`, item).then(() => {
            updateCart()
          })
        }
      }
    }
  })
}
