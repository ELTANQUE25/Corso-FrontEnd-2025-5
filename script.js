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
        let item = cart[i]; //assegnamo l'elemento corrente del carrello alla variabile item.
        let product = null; //dichiariamo una variabile vuota che viene popolata poi dal ciclo for

        for (let j = 0; j < productCatalog.length; j++) { //Se troviamo un prodotto con lo stesso id di item.productId, assegniamo l'oggetto prodotto a product e usiamo break per uscire dal ciclo, perché non c'è bisogno di continuare a cercare.
            if (productCatalog[j].id === item.productId) {
                product = productCatalog[j];
                break;
            }
        }

        let div = document.createElement('div'); //questo è per visualizzare il prodotto nel carrello
        div.classList.add('cart-item');
        div.textContent = product.name + " x" + item.quantity + " - €" + (product.price * item.quantity).toFixed(2);

        let removeBtn = document.createElement('button'); //creiamo il pulsante
        removeBtn.textContent = "Rimuovi";
        removeBtn.classList.add('remove-btn');
        removeBtn.setAttribute('data-id', product.id); //aggiungiamo un attributo personalizzato data-id che contiene l'ID del prodotto. Questo è utile per identificare quale prodotto stiamo rimuovendo quando l'utente clicca sul pulsante.
        removeBtn.addEventListener('click', function() { //quando l'utente clicca sul pulsante "Rimuovi", eseguiamo la funzione all'interno dell'evento.
            let id = Number(this.getAttribute('data-id'));

            for (let k = 0; k < cart.length; k++) { //ciclo per trovare prodotti nel carrello
                if (cart[k].productId === id) { 
                    if (cart[k].quantity > 1) {
                        cart[k].quantity -= 1; //decrementiamo la quantità
                    } else {
                        cart.splice(k, 1); //rimuovere il prodotto dal carrello
                    }
                    break;
                }
            }

            updateCart(); //per visualizzare il carrello aggiornato
            updateTotal(); //per visualizzare il totale aggiornato
        });

        div.appendChild(removeBtn); //aggiunge il pulsante Rimuovi al div
        cartDiv.appendChild(div); //aggiungiamo il pulsante e il DIV al carrello
    }
}

// Aggiorna totale
function updateTotal() { 
    let total = 0; //variabile utilizzata per accumulare la somma dei prodotti

    for (let i = 0; i < cart.length; i++) { //per scorrere gli articoli nel carrello
        let item = cart[i]; //item rappresenta ogni oggetto nel carrello
        for (let j = 0; j < productCatalog.length; j++) {
            if (productCatalog[j].id === item.productId) { //si cerca nel catalogo il prodotto che corrisponde a quell'ID
                total += productCatalog[j].price * item.quantity; //aggiorna il totale sommando il prezzo del prodotto moltiplicato per la quantità
                break;
            }
        }
    }

    document.getElementById('total-price').textContent = total.toFixed(2); //converte il totale in una stringa con due decimali (per visualizzare il totale in formato monetario).
}

// Inizializzazione al caricamento DOM
document.addEventListener('DOMContentLoaded', function() {
    showCatalog();
    updateCart();
});