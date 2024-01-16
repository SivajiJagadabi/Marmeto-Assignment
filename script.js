let searchInputEl = document.getElementById("searchInput")

let productsContainerEl = document.getElementById('products');


let imageUrls = ['https://www.urbanmonkey.com/cdn/shop/products/um-training-001-1.jpg?v=1681193995',
    'https://www.urbanmonkey.com/cdn/shop/products/limited-edition-003-4_1024x.jpg?v=1667474573',
    'https://www.urbanmonkey.com/cdn/shop/products/beach-bum-01_1024x.jpg?v=1678254733',
    'https://www.urbanmonkey.com/cdn/shop/products/limited-edition-003-4_1024x.jpg?v=1667474573',
    'https://www.urbanmonkey.com/cdn/shop/products/um-training-001-1.jpg?v=1681193995',
    'https://www.urbanmonkey.com/cdn/shop/products/beach-bum-01_1024x.jpg?v=1678254733',
]


function highlightVariant(ul, searchTerm) {
    ul.querySelectorAll('li').forEach(li => li.classList.remove('highlight'));

    ul.querySelectorAll('li').forEach(li => {
        if (li.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            li.classList.add('highlight');
        }
    });
}


function toggleView(view) {
    const productsContainer = document.getElementById('products');

    productsContainer.classList.remove('normal-view', 'grid-view');

    productsContainer.classList.add(`${view}-view`);


}




function displayResult(productData) {
    for (let i = 0; i < productData.length; i++) {
        let product = productData[i];

        let productContainerEl = document.createElement('div');
        productContainerEl.classList.add('response-container', 'prodcts-card');

        let bgImgEl = document.createElement('div');
        bgImgEl.style.backgroundImage = `url(${imageUrls[i]})`;
        bgImgEl.style.backgroundSize = 'cover';
        bgImgEl.style.backgroundPosition = 'center';
        bgImgEl.classList.add('prod-img')
        bgImgEl.style.height = '300px';
        bgImgEl.style.float = 'left';
        bgImgEl.style.position = 'relative';
        bgImgEl.style.padding = '15px'

        let badgeEl = document.createElement('button');
        badgeEl.textContent = product.product_badge;
        badgeEl.classList.add('badge', 'badge-button');
        bgImgEl.appendChild(badgeEl)


        let title = document.createElement('h1');
        title.textContent = product.product_title;
        title.classList.add('titleHeading');

        let variantsUl = document.createElement('ul');
        variantsUl.classList.add('ul-element');
        variantsUl.appendChild(title)
        for (let variant of product.product_variants) {
            const key = Object.keys(variant)[0];
            const value = variant[key];

            let li = document.createElement('li');
            li.textContent = `${value}`;

            li.style.padding = '15px'
            variantsUl.appendChild(li);

        }


        productContainerEl.appendChild(bgImgEl);
        // productContainerEl.appendChild(badgeEl);

        productContainerEl.appendChild(variantsUl);

        productsContainerEl.appendChild(productContainerEl);


        searchInputEl.addEventListener('input', () => {
            highlightVariant(variantsUl, searchInputEl.value);
        });

    }
}



function getProductsList() {
    let url = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
    let options = {
        method: 'GET'
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            displayResult(jsonData.data);
        });
}

getProductsList();