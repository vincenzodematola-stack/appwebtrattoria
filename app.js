// Seleziona gli elementi della pagina con cui dobbiamo interagire
const oraUscitaInput = document.getElementById('oraUscita');
const pietanzaInput = document.getElementById('pietanza');
const quantitaInput = document.getElementById('quantita');
const inviaOrdineBtn = document.getElementById('inviaOrdine');
const listaOrdiniUl = document.getElementById('listaOrdini');

// Aggiungi un "ascoltatore" al pulsante per l'evento "click"
inviaOrdineBtn.addEventListener('click', function() {
    // Ottieni i valori inseriti dall'utente
    const ora = oraUscitaInput.value;
    const pietanza = pietanzaInput.value;
    const quantita = quantitaInput.value;

    // Controlla se i campi sono stati compilati
    if (ora && pietanza && quantita) {
        // Crea un nuovo ordine
        const nuovoOrdine = {
            ora: ora,
            pietanza: pietanza,
            quantita: quantita
        };

        // Chiama una funzione per visualizzare l'ordine
        visualizzaOrdine(nuovoOrdine);

        // Pulisci i campi dopo l'invio
        oraUscitaInput.value = '';
        pietanzaInput.value = '';
        quantitaInput.value = '';
    } else {
        alert("Per favore, compila tutti i campi!");
    }
});

// Funzione per visualizzare l'ordine nella lista
function visualizzaOrdine(ordine) {
    const li = document.createElement('li');
    li.innerHTML = `
        Ora: <span>${ordine.ora}</span> -
        Pietanza: <span>${ordine.quantita} ${ordine.pietanza}</span>
    `;
    listaOrdiniUl.appendChild(li);
}
