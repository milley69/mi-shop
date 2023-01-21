import { postData, getData, deletData } from '../api'

export const addProduct = () => {
  const titleInp = document.querySelector('#product-title')
  const nameInp = document.querySelector('#product-name')
  const priceInp = document.querySelector('#product-price')
  const previewInp = document.querySelector('#product-image')
  const saveBtn = document.querySelector('#product-add-btn')
  const container = document.querySelector('#product-table')
  const select = document.querySelector('#product-category')

  const productData = {
    name: '',
    title: '',
    price: 0,
    preview: '',
    category: 0,
  }

  const render = (data) => {
    container.innerHTML = ''
    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
        <tr>
        <th scope="row">${index + 1}</th>
          <td>${item.title}</td>
          <td>${item.name}</td>
          <td>${item.price} ₽</td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-product=${item.id}
            >
              удалить
            </button>
          </td>
        </tr>
      `
      )
    })
  }

  const checkValues = () => {
    if (
      nameInp.value === '' ||
      previewInp.value === '' ||
      Number(priceInp.value) === 0 ||
      titleInp.value === '' ||
      select.value === 'defualt'
    ) {
      saveBtn.disabled = true
    } else {
      saveBtn.disabled = false
    }
  }

  const updateTable = () => {
    getData('products').then((data) => {
      render(data)
    })
  }

  select.addEventListener('change', () => {
    productData.category = select.value
    const url =
      select.value !== 'defualt'
        ? `products?category=${select.value}`
        : `products`

    getData(url).then((data) => {
      render(data)
    })

    checkValues()
  })

  nameInp.addEventListener('input', () => {
    productData.name = nameInp.value
    checkValues()
  })
  titleInp.addEventListener('input', () => {
    productData.title = titleInp.value
    checkValues()
  })
  priceInp.addEventListener('input', () => {
    productData.price = Number(priceInp.value)
    checkValues()
  })

  previewInp.addEventListener('input', () => {
    const file = previewInp.files[0]

    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    ) {
      const reader = new FileReader()

      reader.onload = () => {
        productData.preview = reader.result
      }
      reader.onerror = () => {
        productData.preview = ''
        previewInp.value = ''
      }
      reader.readAsDataURL(file)
    } else {
      previewInp.value = ''
    }
    checkValues()
  })

  saveBtn.addEventListener('click', () => {
    postData('products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      nameInp.value = ''
      titleInp.value = ''
      priceInp.value = ''
      previewInp.value = ''

      updateTable()
    })
  })

  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.product
      deletData(`products/${id}`).then((data) => {
        updateTable()
      })
    }
  })

  updateTable()
  checkValues()
}
