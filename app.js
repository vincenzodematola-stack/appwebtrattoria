// La funzione "DOMContentLoaded" si assicura che il codice venga eseguito solo dopo che la pagina è stata caricata completamente.
document.addEventListener("DOMContentLoaded", () => {
    
    // Agganciamo gli elementi HTML usando il loro ID.
    const alignButton = document.getElementById("alignButton");
    const statusDiv = document.getElementById("status");

    // Aggiungiamo un "ascoltatore di eventi" al pulsante.
    // Quando l'utente clicca il pulsante, la funzione al suo interno viene eseguita.
    alignButton.addEventListener("click", () => {
        statusDiv.textContent = "Allineamento avviato... Ora punta una stella luminosa nel tuo telescopio.";
        // Qui andrà il codice per registrare la posizione.
    });
});
