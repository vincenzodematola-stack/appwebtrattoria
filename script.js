<script>
      // La tua configurazione di Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyAm-0lgqE-ecZ4LJ_pn3sgDmDaQPId6X4E",
        authDomain: "comande-digitali.firebaseapp.com",
        projectId: "comande-digitali",
        storageBucket: "comande-digitali.firebasestorage.app",
        messagingSenderId: "831913671987",
        appId: "1:831913671987:web:e5035df8e47bea69331246",
        measurementId: "G-RRJ4RC7YPG"
      };

      // Inizializza Firebase
      firebase.initializeApp(firebaseConfig);
    </script>
// Inizializza il database di Firebase
const database = firebase.database();
const ordiniRef = database.ref('ordini');

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
        const nuovoOrdine = {
            ora: ora,
            pietanza: pietanza,
            quantita: quantita,
            timestamp: Date.now()
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

    const li = document.createElement('li');
    li.setAttribute('data-key', ordineKey); // Aggiungi la chiave per la rimozione
    li.innerHTML = `
        Ora: <span>${ordine.ora}</span> -
        Pietanza: <span>${ordine.quantita} ${ordine.pietanza}</span>
    `;

    const completaBtn = document.createElement('button');
    completaBtn.textContent = 'Completato';
    completaBtn.classList.add('completa-btn');
    
    completaBtn.addEventListener('click', () => {
        ordiniRef.child(ordineKey).remove();
    });

    li.appendChild(completaBtn);
    listaOrdiniUl.appendChild(li);
});

// Ascolta gli ordini rimossi da Firebase e li rimuove dalla lista
ordiniRef.on('child_removed', (snapshot) => {
    const ordineKey = snapshot.key;
    const elementoDaRimuovere = document.querySelector(`li[data-key="${ordineKey}"]`);
    if (elementoDaRimuovere) {
        listaOrdiniUl.removeChild(elementoDaRimuovere);
    }
});
