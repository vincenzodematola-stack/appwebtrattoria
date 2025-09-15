document.addEventListener("DOMContentLoaded", () => {
    
    // Agganciamo gli elementi HTML.
    const alignButton = document.getElementById("alignButton");
    const findButton = document.getElementById("findButton");
    const raInput = document.getElementById("raInput");
    const decInput = document.getElementById("decInput");
    const statusDiv = document.getElementById("status");
    const instructionsDiv = document.getElementById("instructions");
    
    let isAligned = false;
    let referenceCoords = { ra: null, dec: null };

    // Funzione per mostrare messaggi di stato.
    function setStatus(message) {
        statusDiv.textContent = message;
    }

    // Funzione per mostrare le istruzioni.
    function setInstructions(message) {
        instructionsDiv.innerHTML = message;
    }

    // Aggiungiamo un ascoltatore per il pulsante "Allinea".
    alignButton.addEventListener("click", () => {
        // Qui dovremmo calcolare le coordinate attuali. Per ora, le impostiamo manualmente.
        referenceCoords.ra = '18h 36m'; // AR di Vega
        referenceCoords.dec = '+38° 47\''; // Dec di Vega
        isAligned = true;
        setStatus(`Allineamento completato! Ora puoi cercare gli oggetti.`);
        setInstructions(""); // Pulisce le istruzioni precedenti
    });
    
    // Aggiungiamo un ascoltatore per il pulsante "Trova".
    findButton.addEventListener("click", () => {
        if (!isAligned) {
            setStatus("Errore: Prima devi allineare il telescopio (Step 1).");
            setInstructions("");
            return;
        }

        const targetRa = raInput.value;
        const targetDec = decInput.value;

        if (!targetRa || !targetDec) {
            setStatus("Errore: Inserisci le coordinate dell'oggetto da trovare.");
            setInstructions("");
            return;
        }
        
        // Qui calcoleremo la differenza tra le coordinate di riferimento e quelle dell'oggetto.
        // Per ora, simuleremo il calcolo con un messaggio.
        const raDiff = "2h 10m"; // Differenza fittizia in AR
        const decDiff = "5° 20'";  // Differenza fittizia in Dec

        setStatus("Calcolo completato! Segui le istruzioni qui sotto.");
        setInstructions(`
            <h3>Istruzioni per il puntamento</h3>
            <p>Sposta il telescopio di <strong>${raDiff}</strong> in Ascensione Retta e <strong>${decDiff}</strong> in Declinazione.</p>
        `);
    });
});
