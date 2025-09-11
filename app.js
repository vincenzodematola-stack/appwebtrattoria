document.getElementById('calculate-btn').addEventListener('click', calculatePosition);

function calculatePosition() {
    // 1. Ottieni gli input dell'utente e la posizione dell'osservatore
    const azimuthDeg = parseFloat(document.getElementById('azimuth').value);
    const altitudeDeg = parseFloat(document.getElementById('altitude').value);

    // Coordinate di Napoli, Italia. Puoi cambiarle con le tue.
    const latitudeDeg = 40.85;
    const longitudeDeg = 14.26;

    // Converti in radianti per le funzioni trigonometriche
    const azimuthRad = (azimuthDeg * Math.PI) / 180;
    const altitudeRad = (altitudeDeg * Math.PI) / 180;
    const latitudeRad = (latitudeDeg * Math.PI) / 180;

    // 2. Calcola il Tempo Siderale Locale (LST)
    const now = new Date();
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const jd = (now.getTime() - J2000.getTime()) / 86400000 + 2451545.0;
    const d = jd - 2451545.0; // Giorni dal 1° gennaio 2000
    const gm_sidereal_time = (100.46 + 0.985647352 * d) % 360;
    let lstDeg = (gm_sidereal_time + longitudeDeg) % 360;
    if (lstDeg < 0) lstDeg += 360;
    const lstRad = (lstDeg * Math.PI) / 180;

    // 3. Conversione in Declinazione (Dec) e Angolo Orario (HA)
    const sinDec = Math.sin(latitudeRad) * Math.sin(altitudeRad) + Math.cos(latitudeRad) * Math.cos(altitudeRad) * Math.cos(azimuthRad);
    const decRad = Math.asin(sinDec);

    const cosHA = (Math.sin(altitudeRad) - Math.sin(latitudeRad) * Math.sin(decRad)) / (Math.cos(latitudeRad) * Math.cos(decRad));
    const haRad = Math.acos(cosHA);

    // 4. Conversione dell'Angolo Orario in Ascensione Retta (RA)
    let raRad;
    if (azimuthDeg > 180) {
        raRad = lstRad + haRad;
    } else {
        raRad = lstRad - haRad;
    }
    
    // Assicurati che RA sia nel range 0-24 ore
    let raHours = (raRad * 180 / Math.PI) / 15;
    if (raHours < 0) raHours += 24;

    // 5. Visualizza i risultati
    const decDeg = decRad * 180 / Math.PI;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Ascensione Retta (RA):</strong> ${raHours.toFixed(2)} ore</p>
        <p><strong>Declinazione (Dec):</strong> ${decDeg.toFixed(2)}°</p>
    `;

    // 6. Bonus: Identifica l'oggetto (esempio con dati fissi)
    const starDatabase = {
        'Sirio': { ra: 6.75, dec: -16.71 },
        'Vega': { ra: 18.61, dec: 38.78 },
        'Polaris': { ra: 2.52, dec: 89.26 },
        'Betelgeuse': { ra: 5.92, dec: 7.41 },
        'Alpha Centauri': { ra: 14.39, dec: -60.83 }
    };
    
    let closestStarName = "Nessun oggetto noto nelle vicinanze";
    let minDistance = 10; // Distanza soglia in gradi

    for (const name in starDatabase) {
        const star = starDatabase[name];
        const raDistance = Math.abs(star.ra - raHours);
        const decDistance = Math.abs(star.dec - decDeg);
        const distance = Math.sqrt(Math.pow(raDistance, 2) + Math.pow(decDistance, 2));

        if (distance < minDistance) {
            minDistance = distance;
            closestStarName = name;
        }
    }
    
    const starInfoDiv = document.getElementById('star-info');
    starInfoDiv.innerHTML = `<p><strong>L'oggetto più vicino è:</strong> ${closestStarName}</p>`;
}
