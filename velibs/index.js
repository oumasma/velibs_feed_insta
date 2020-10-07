const scrapVelib = () => {
    fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=1000&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&refine.nom_arrondissement_communes=Paris`)
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error('error :', error))
    }

    scrapVelib();

    const displayData = (data) => {
        
        const velibStation = data.records
        console.log(velibStation);
    
        const zone = document.getElementById("velibs");
        velibStation.forEach(element => {
            const name = element.fields.name;
            console.log(name);
            const capacity = element.fields.capacity;
            console.log(capacity);
            const mechanical = element.fields.mechanical;
            console.log(mechanical);
            const ebike = element.fields.ebike;
            console.log(ebike);
            const numdocksavailable = element.fields.numdocksavailable;
            console.log(numdocksavailable);
            const coordinates = element.geometry.coordinates;
    
            showVelibStation(zone, name, capacity, mechanical, ebike, numdocksavailable, coordinates)
        });
    }


const showVelibStation = (zone, name, capacity, mechanical, ebike, numdocksavailable, coordinates) => {
    zone.innerHTML += `
        <div>
            <h2>Station : ${name}</h2>
            <p>Capacité : ${capacity} docks</p>
            <p>${mechanical} Velibs classiques disponibles</p>
            <p>${ebike} Velibs électriques disponibles</p>
            <p>${numdocksavailable} docks disponibles</p>
            <p>Coordonnées gps : ${coordinates}</p>
        </div>
    `
}
setInterval(() =>{
    scrapVelib();
}, 60000);