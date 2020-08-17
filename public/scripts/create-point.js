
// States and Cities API

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then(states => {
    states.forEach(state => {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    });
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value="">Cidade</option>'
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json())
  .then(cities => {
    cities.forEach(city => {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    })
    citySelect.disabled = false
  })
}

document
  .querySelector('select[name=uf')
  .addEventListener('change', getCities)

// Collect Items

// Take all li's
const itemsToCollect = document.querySelectorAll('.items-grid li')
// Add an eventListener method to listen for a click on each item
for(const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

// The hidden input 'collectedItems' will send the selected items, in the 'selectedItems' array, to the database.
const colletedItems = document.querySelector('input[name=items]')
let selectedItems = []

// function to add or remove 'selected' class when the itemLi is clicked.
function handleSelectedItem(event) {
  const itemLi = event.target
  itemLi.classList.toggle('selected')
  const itemId = itemLi.dataset.id

  // Checking Item Id
  // console.log('ITEM ID:' ,  itemId)

  // verify if there are items selected, if so get the selected items into the 'selectedItems' array.
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })
    
  // if the item is already in the 'selectedItems' array, then delete duplicates.
  if(alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems

  // if the item is not in the 'selectedItems' array, then add it into the array.
  } else {
    selectedItems.push(itemId)
  }

  // Checking Selected Items
  // console.log('SELECTED ITEMS: ', selectedItems)

  // update the hidden input with the selected items.
    // Look for: const = collectedItems at line 54.
  colletedItems.value = selectedItems
}