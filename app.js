document.addEventListener("DOMContentLoaded", () => {
    
    // Agganciamo i nuovi elementi HTML.
    const alignButton = document.getElementById("alignButton");
    const findButton = document.getElementById("findButton");
    const raInput = document.getElementById("raInput");
    const decInput = document.getElementById("decInput");
    const statusDiv = document.getElementById("status");
    
    let isAligned = false; // Una variabile per tenere traccia se l'allineamento è stato fatto.
    let referenceCoords = { ra: null, dec: null }; // Per salvare le coordinate del punto di allineamento.

    // Aggiungiamo un ascoltatore per il pulsante "Allinea".
    alignButton.addEventListener("click", () => {
        // Qui dovremmo ottenere le coordinate attuali dell'oggetto che l'utente sta puntando.
        // Per ora, useremo coordinate fisse come esempio.
        // (In futuro, questa parte dovrà essere dinamica).
        referenceCoords.ra = '18h 36m';
        referenceCoords.dec = '+38° 47\'';
        isAligned = true;
        statusDiv.textContent = `Allineamento completato su un oggetto a AR: ${referenceCoords.ra}, Dec: ${referenceCoords.dec}.`;
    });
    
    // Aggiungiamo un ascoltatore per il pulsante "Trova".
    findButton.addEventListener("click", () => {
        if (!isAligned) {
            statusDiv.textContent = "Errore: Prima devi allineare il telescopio (Step 1).";
            return;
        }

        const targetRa = raInput.value;
        const targetDec = decInput.value;

        if (!targetRa || !targetDec) {
            statusDiv.textContent = "Inserisci le coordinate dell'oggetto da trovare.";
            return;
        }

        // Qui calcoleremo la differenza tra il punto di riferimento e l'oggetto da trovare.
        // Per ora, mostriamo solo un messaggio.
        statusDiv.textContent = `Sto calcolando la direzione verso ${targetRa}, ${targetDec}.`;

        // Qui in futuro verrà mostrata la mappa e le istruzioni.
    });

});
