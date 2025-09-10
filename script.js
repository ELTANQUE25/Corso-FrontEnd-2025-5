// Dati prodotti
const productCatalog = [
    { id: 1, name: "Olio detergente struccante", price: 12.81, imageUrl: "https://www.skinfirstcosmetics.it/cdn/shop/files/Olio-Detergente-Struccante-Front-1_fac2d5f4-02d8-4a99-873c-5d71c579d1f0.png?v=1733848179&width=1800" },
    { id: 2, name: "Be Total Integratore Alimentare ", price: 15.87, imageUrl: "https://farmaciadelcorso.net/image/cache/catalog/prodotto/933151209-800x800.webp" },
    { id: 3, name: "crema mani non profumata", price: 8.30, imageUrl: "https://openfarma.it/image/cache/catalog/prodmancanti/neutrogena-crema-mani-concentrata-senza-profumo-900x900.webp" }
];

// Carrello inizialmente vuoto
let cart = [];

// Catalogo prodotti
function showCatalog() {
    const catalogDiv = document.getElementById('catalog');
    catalogDiv.innerHTML = '';

    for (let i = 0; i < productCatalog.length; i++) {
        let product = productCatalog[i];

        let productDiv = document.createElement('div');

        let img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;

        let nameP = document.createElement('p');
        nameP.textContent = product.name;

        let priceP = document.createElement('p');
        priceP.textContent = "€" + product.price.toFixed(2);

        let addBtn = document.createElement('add-button'); //per avere un DOM più dinamico in js
        addBtn.textContent = "Aggiungi";
        addBtn.classList.add('add-btn');
        addBtn.setAttribute('data-id', product.id); //per identificare quale "dato"/prodotto aggiungere in base all'id
        addBtn.addEventListener('click', function() { //evento click per aggiungere il prodotto selezionato
            let id = Number(this.getAttribute('data-id'));
            addToCart(id);
        });

        productDiv.appendChild(img); //div per ogni prodotto con immagine, nome, prezzo, pulsante
        productDiv.appendChild(nameP);
        productDiv.appendChild(priceP);
        productDiv.appendChild(addBtn);

        catalogDiv.appendChild(productDiv);
    }
}

// Aggiunge prodotto al carrello, ogni prodotto ha il suo ID di riferimento infatti
function addToCart(productId) {
    let found = false; //vedere se un prodotto è o meno presente nel carrello

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) { //verificare se l’ID del prodotto nell’elemento del carrello (cart[i].productId) è uguale all’ID del prodotto aggiunto
            cart[i].quantity += 1; //Se il prodotto è già nel carrello, incrementa la quantità di 1.
            found = true; //quindi da falso diventa true perchè esiste il prodotto nel carrello
            break; //per uscire dal ciclo
        }
    }

    if (!found) {
        cart.push({ productId: productId, quantity: 1 });
    }

    updateCart(); //aggiorna la visualizzazione del carrello.
    updateTotal(); //aggiorna il totale.
}

// Aggiorna carrello
function updateCart() {
    const cartDiv = document.getElementById('shopping-cart');//selezione del prodotto con id nel DOM
    cartDiv.innerHTML = ''; //svuotare il contenuto del carrello prima di aggiungere altri articoli

    if (cart.length === 0) { //si verifica se la lunghezza è = a 0 quindi verifica se il carrello è vuoto
        let emptyMsg = document.createElement('p'); //se è vuoto si genere una messaggio
        emptyMsg.textContent = "Il carrello è vuoto";
        cartDiv.appendChild(emptyMsg); //aggiunge il messaggio al cartDiv cioè lo visualizza nel carrello.
        return; //ferma l'esecuzione della funzione
    }

    for (let i = 0; i < cart.length; i++) { 
        let item = cart[i];
        let product = null;

        for (let j = 0; j < productCatalog.length; j++) {
            if (productCatalog[j].id === item.productId) {
                product = productCatalog[j];
                break;
            }
        }

        let div = document.createElement('div');
        div.classList.add('cart-item');
        div.textContent = product.name + " x" + item.quantity + " - €" + (product.price * item.quantity).toFixed(2);

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Rimuovi";
        removeBtn.classList.add('remove-btn');
        removeBtn.setAttribute('data-id', product.id);
        removeBtn.addEventListener('click', function() {
            let id = Number(this.getAttribute('data-id'));

            for (let k = 0; k < cart.length; k++) {
                if (cart[k].productId === id) {
                    if (cart[k].quantity > 1) {
                        cart[k].quantity -= 1;
                    } else {
                        cart.splice(k, 1);
                    }
                    break;
                }
            }

            updateCart();
            updateTotal();
        });

        div.appendChild(removeBtn);
        cartDiv.appendChild(div);
    }
}

