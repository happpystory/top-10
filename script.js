const indianFlag =  './assets/india.png';
const chinaFlag =  './assets/china.png';
const usaFlag =  './assets/usa.png';
const indonesiaFlag =  './assets/indonesia.png';
const brazilFlag =  './assets/brazil.png';
const bangladeshFlag =  './assets/bangladesh.png';
const mexicoFlag =  './assets/mexico.png';
const nigeriaFlag =  './assets/nigeria.png';
const pakistanFlag =  './assets/pakistan.png';
const russiaFlag =  './assets/russia.png';

const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const countries = [
    'India',
    'China',
    'United States',
    'Indonesia',
    'Pakistan',
    'Nigeria',
    'Brazil',
    'Bangladesh',
    'Russia',
    'Mexico'
];

const countriesList = [
    {name: 'India', url: indianFlag},
    {name: 'China', url: chinaFlag},
    {name: 'United States', url: usaFlag},
    {name: 'Indonesia', url: indonesiaFlag},
    {name: 'Pakistan', url: pakistanFlag},
    {name: 'Nigeria', url: nigeriaFlag},
    {name: 'Brazil', url: brazilFlag},
    {name: 'Bangladesh', url: bangladeshFlag},
    {name: 'Russia', url: russiaFlag},
    {name: 'Mexico', url: mexicoFlag}
];

//Store listitems
const listItems = [];

let dragStartIndex;

createList();

//Insert listitems into DOM
function createList() { 
    [...countriesList]
    .map(a => ({ value: a.name, url: a.url, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a)
    .forEach((country, index) => { 
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <div class="draggable" draggable="true">
                <div class="flag__wrapper">
                    <img width="50px" src='${country.url}' />
                </div>
                <div class="country__flex-wrapper">
                    <div class="name__wrapper">
                        <p class="country-name">${country.value}</p>
                    </div>
                    <div class="grip__icon-wrapper"><i class="fas fa-grip-lines"></i></div>
                </div>
              
            </div>
        `;

        listItems.push(listItem);

        draggable_list.appendChild(listItem)
    });

    addEventListeners()
}

function dragStart() { 
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) { 
    e.preventDefault()
}

function dragDrop() { 
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function dragEnter() { 
    this.classList.add('over')
}

function dragLeave() { 
    this.classList.remove('over')
}

//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) { 
   const itemOne = listItems[fromIndex].querySelector('.draggable');
   const itemTwo = listItems[toIndex].querySelector('.draggable');

   listItems[fromIndex].appendChild(itemTwo)
   listItems[toIndex].appendChild(itemOne)
}

//Check the order of list items
function checkOrder() { 
    listItems.forEach((listItem, index) => { 
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== countries[index]) { 
            listItem.classList.add('wrong');
        } else { 
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}


function addEventListeners() { 
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => { 
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => { 
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)