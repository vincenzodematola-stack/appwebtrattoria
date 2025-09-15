// Inizializza il database di Firebase
const database = firebase.database();
const ordiniRef = database.ref('ordini'); // Riferimento alla cartella "ordini" nel database

// Seleziona gli elementi della pagina
const oraUscitaInput = document.getElementById('oraUscita');
const pietanzaInput = document.getElementById('pietanza');
const quantitaInput = document.getElementById('quantita');
const inviaOrdineBtn = document.getElementById('inviaOrdine');
const listaOrdiniUl = document.getElementById('listaOrdini');

// Gestisce l'invio dell'ordine
inviaOrdineBtn.addEventListener('click', function() {
    const ora = oraUscitaInput.value;
    const pietanza = pietanzaInput.value;
    const quantita = quantitaInput.value;

    if (ora && pietanza && quantita) {
        // Crea un nuovo oggetto ordine
        const nuovoOrdine = {
            ora: ora,
            pietanza: pietanza,
            quantita: quantita,
            timestamp: Date.now() // Aggiunge un timestamp per l'ordine
        };

        // Invia l'ordine a Firebase
        ordiniRef.push(nuovoOrdine)
            .then(() => {
                console.log("Ordine inviato con successo!");
                oraUscitaInput.value = '';
                pietanzaInput.value = '';
                quantitaInput.value = '';
            })
            .catch((error) => {
                console.error("Errore nell'invio dell'ordine: ", error);
            });
    } else {
        alert("Per favore, compila tutti i campi!");
    }
});

// Ascolta gli ordini in arrivo da Firebase e li visualizza
ordiniRef.on('child_added', (snapshot) => {
    const ordine = snapshot.val();
    const ordineKey = snapshot.key;

    // Crea l'elemento della lista per l'ordine
    const li = document.createElement('li');
    li.innerHTML = `
        Ora: <span>${ordine.ora}</span> -
        Pietanza: <span>${ordine.quantita} ${ordine.pietanza}</span>
    `;

    // Aggiungi un pulsante per segnare l'ordine come completato
    const completaBtn = document.createElement('button');
    completaBtn.textContent = 'Completato';
    completaBtn.classList.add('completa-btn'); // Aggiungi una classe per lo stile
    
    // Aggiungi un ascoltatore per il pulsante "Completato"
    completaBtn.addEventListener('click', () => {
        ordiniRef.child(ordineKey).remove();
    });

    li.appendChild(completaBtn);
    listaOrdiniUl.appendChild(li);
});

// Ascolta gli ordini rimossi da Firebase e li rimuove dalla lista
ordiniRef.on('child_removed', (snapshot) => {
    const ordineKey = snapshot.key;
    const elementiLista = listaOrdiniUl.children;
    for (let i = 0; i < elementiLista.length; i++) {
        // Cerca l'elemento della lista corrispondente all'ordine rimosso
        if (elementiLista[i].getAttribute('data-key') === ordineKey) {
            listaOrdiniUl.removeChild(elementiLista[i]);
            break;
        }
    }
});

          
