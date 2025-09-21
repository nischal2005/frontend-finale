var map = L.map('map').setView([40.4406, -79.9959], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

var clickedLocations = [];

// Complete list of Pittsburgh's 90 official neighborhoods with coordinates
const pittsburghNeighborhoods = {
    // Central Areas
    'centralbusinessdistrict': { lat: 40.4406, lng: -79.9959, radius: 0.012, name: 'Central Business District' },
    'stripdistrict': { lat: 40.4507, lng: -79.9711, radius: 0.015, name: 'Strip District' },
    'culturaldistrict': { lat: 40.4422, lng: -79.9970, radius: 0.008, name: 'Cultural District' },
    'bluff': { lat: 40.4356, lng: -79.9889, radius: 0.01, name: 'Bluff' },
    
    // Oakland Area
    'centraloakland': { lat: 40.4388, lng: -79.9514, radius: 0.012, name: 'Central Oakland' },
    'northoakland': { lat: 40.4469, lng: -79.9536, radius: 0.012, name: 'North Oakland' },
    'southoakland': { lat: 40.4308, lng: -79.9492, radius: 0.015, name: 'South Oakland' },
    'westoakland': { lat: 40.4339, lng: -79.9575, radius: 0.01, name: 'West Oakland' },
    
    // Shadyside/Squirrel Hill Area
    'shadyside': { lat: 40.4511, lng: -79.9353, radius: 0.015, name: 'Shadyside' },
    'squirrelhillnorth': { lat: 40.4406, lng: -79.9253, radius: 0.015, name: 'Squirrel Hill North' },
    'squirrelhillsouth': { lat: 40.4272, lng: -79.9236, radius: 0.015, name: 'Squirrel Hill South' },
    'pointbreeze': { lat: 40.4422, lng: -79.9231, radius: 0.015, name: 'Point Breeze' },
    'northpointbreeze': { lat: 40.4489, lng: -79.9208, radius: 0.012, name: 'North Point Breeze' },
    'regentsquare': { lat: 40.4306, lng: -79.9097, radius: 0.01, name: 'Regent Square' },
    'swisshelm': { lat: 40.4181, lng: -79.8997, radius: 0.01, name: 'Swisshelm Park' },
    
    // East End
    'eastliberty': { lat: 40.4614, lng: -79.9251, radius: 0.015, name: 'East Liberty' },
    'bloomfield': { lat: 40.4647, lng: -79.9447, radius: 0.012, name: 'Bloomfield' },
    'friendship': { lat: 40.4664, lng: -79.9353, radius: 0.01, name: 'Friendship' },
    'garfield': { lat: 40.4689, lng: -79.9286, radius: 0.012, name: 'Garfield' },
    'highlandpark': { lat: 40.4737, lng: -79.9331, radius: 0.015, name: 'Highland Park' },
    'morningside': { lat: 40.4769, lng: -79.9414, radius: 0.01, name: 'Morningside' },
    'stantonheights': { lat: 40.4753, lng: -79.9481, radius: 0.008, name: 'Stanton Heights' },
    
    // Lawrenceville Area
    'lowerlawrenceville': { lat: 40.4603, lng: -79.9614, radius: 0.015, name: 'Lower Lawrenceville' },
    'centrallawrenceville': { lat: 40.4650, lng: -79.9614, radius: 0.012, name: 'Central Lawrenceville' },
    'upperlawrenceville': { lat: 40.4697, lng: -79.9614, radius: 0.012, name: 'Upper Lawrenceville' },
    'polishhill': { lat: 40.4578, lng: -79.9508, radius: 0.008, name: 'Polish Hill' },
    
    // South Side
    'southsideflats': { lat: 40.4278, lng: -79.9731, radius: 0.015, name: 'South Side Flats' },
    'southsideslopes': { lat: 40.4244, lng: -79.9769, radius: 0.012, name: 'South Side Slopes' },
    'southshore': { lat: 40.4200, lng: -79.9900, radius: 0.015, name: 'South Shore' },
    'mountwashington': { lat: 40.4319, lng: -80.0169, radius: 0.015, name: 'Mount Washington' },
    'duquesneheights': { lat: 40.4358, lng: -80.0069, radius: 0.01, name: 'Duquesne Heights' },
    'allentown': { lat: 40.4158, lng: -79.9892, radius: 0.015, name: 'Allentown' },
    'beltzhoover': { lat: 40.4097, lng: -79.9958, radius: 0.012, name: 'Beltzhoover' },
    'knoxville': { lat: 40.4164, lng: -80.0111, radius: 0.012, name: 'Knoxville' },
    
    // North Side
    'northshore': { lat: 40.4469, lng: -80.0139, radius: 0.015, name: 'North Shore' },
    'alleghenywest': { lat: 40.4508, lng: -80.0122, radius: 0.012, name: 'Allegheny West' },
    'alleghenycenter': { lat: 40.4533, lng: -80.0089, radius: 0.01, name: 'Allegheny Center' },
    'eastallegheny': { lat: 40.4561, lng: -79.9964, radius: 0.012, name: 'East Allegheny' },
    'centralnorthside': { lat: 40.4583, lng: -80.0094, radius: 0.012, name: 'Central Northside' },
    'manchester': { lat: 40.4600, lng: -80.0192, radius: 0.015, name: 'Manchester' },
    'chateau': { lat: 40.4647, lng: -80.0053, radius: 0.008, name: 'Chateau' },
    'springgarden': { lat: 40.4667, lng: -79.9831, radius: 0.01, name: 'Spring Garden' },
    'troyhill': { lat: 40.4711, lng: -79.9911, radius: 0.012, name: 'Troy Hill' },
    'springhillcityview': { lat: 40.4769, lng: -80.0133, radius: 0.015, name: 'Spring Hill-City View' },
    'fineview': { lat: 40.4728, lng: -80.0078, radius: 0.01, name: 'Fineview' },
    'perrynorth': { lat: 40.4800, lng: -80.0311, radius: 0.015, name: 'Perry North' },
    'perrysouth': { lat: 40.4700, lng: -80.0378, radius: 0.015, name: 'Perry South' },
    'brightonheights': { lat: 40.4842, lng: -80.0233, radius: 0.015, name: 'Brighton Heights' },
    'marshallshadeland': { lat: 40.4811, lng: -80.0056, radius: 0.015, name: 'Marshall-Shadeland' },
    'northviewheights': { lat: 40.4847, lng: -80.0344, radius: 0.012, name: 'Northview Heights' },
    
    // Hill District
    'middlehill': { lat: 40.4497, lng: -79.9764, radius: 0.01, name: 'Middle Hill' },
    'upperhill': { lat: 40.4539, lng: -79.9694, radius: 0.01, name: 'Upper Hill' },
    'crawfordroberts': { lat: 40.4453, lng: -79.9639, radius: 0.012, name: 'Crawford-Roberts' },
    'bedforddwellings': { lat: 40.4419, lng: -79.9708, radius: 0.008, name: 'Bedford Dwellings' },
    'terracevillage': { lat: 40.4581, lng: -79.9722, radius: 0.008, name: 'Terrace Village' },
    
    // Homewood Area
    'homewoodnorth': { lat: 40.4583, lng: -79.9056, radius: 0.012, name: 'Homewood North' },
    'homewoodsouth': { lat: 40.4528, lng: -79.9056, radius: 0.012, name: 'Homewood South' },
    'homewoodwest': { lat: 40.4556, lng: -79.9139, radius: 0.012, name: 'Homewood West' },
    'lincolnlemingtonbelmar': { lat: 40.4639, lng: -79.8922, radius: 0.015, name: 'Lincoln-Lemington-Belmar' },
    'larimer': { lat: 40.4728, lng: -79.9028, radius: 0.015, name: 'Larimer' },
    
    // South/Southeast
    'greenfield': { lat: 40.4119, lng: -79.9453, radius: 0.015, name: 'Greenfield' },
    'hazelwood': { lat: 40.4069, lng: -79.9358, radius: 0.02, name: 'Hazelwood' },
    'glenhazel': { lat: 40.3989, lng: -79.9319, radius: 0.015, name: 'Glen Hazel' },
    'hays': { lat: 40.4064, lng: -79.9089, radius: 0.015, name: 'Hays' },
    'lincolnplace': { lat: 40.3989, lng: -79.8939, radius: 0.01, name: 'Lincoln Place' },
    'newstead': { lat: 40.3928, lng: -79.9031, radius: 0.01, name: 'New Homestead' },
    
    // West End
    'westend': { lat: 40.4383, lng: -80.0469, radius: 0.02, name: 'West End' },
    'elliott': { lat: 40.4467, lng: -80.0444, radius: 0.015, name: 'Elliott' },
    'sheraden': { lat: 40.4458, lng: -80.0633, radius: 0.02, name: 'Sheraden' },
    'windgap': { lat: 40.4536, lng: -80.0639, radius: 0.012, name: 'Windgap' },
    'esplen': { lat: 40.4458, lng: -80.0756, radius: 0.015, name: 'Esplen' },
    'fairywood': { lat: 40.4303, lng: -80.0653, radius: 0.012, name: 'Fairywood' },
    'westwood': { lat: 40.4239, lng: -80.0628, radius: 0.015, name: 'Westwood' },
    'banksville': { lat: 40.4119, lng: -80.0578, radius: 0.015, name: 'Banksville' },
    
    // Southwest
    'carrick': { lat: 40.4006, lng: -79.9886, radius: 0.02, name: 'Carrick' },
    'overbrook': { lat: 40.4072, lng: -80.0131, radius: 0.015, name: 'Overbrook' },
    'brookline': { lat: 40.4094, lng: -80.0242, radius: 0.015, name: 'Brookline' },
    'beechview': { lat: 40.4083, lng: -80.0394, radius: 0.015, name: 'Beechview' },
    'craftonheights': { lat: 40.4239, lng: -80.0456, radius: 0.012, name: 'Crafton Heights' },
    'chartiers': { lat: 40.4175, lng: -80.0386, radius: 0.015, name: 'Chartiers' },
    'mountoliver': { lat: 40.4019, lng: -79.9761, radius: 0.01, name: 'Mount Oliver' },
    'arlington': { lat: 40.4042, lng: -80.0358, radius: 0.015, name: 'Arlington' },
    'arlingtonheights': { lat: 40.4072, lng: -80.0475, radius: 0.012, name: 'Arlington Heights' },
    'californiakirbride': { lat: 40.4139, lng: -80.0492, radius: 0.012, name: 'California-Kirkbride' },
    'bonair': { lat: 40.4161, lng: -80.0608, radius: 0.01, name: 'Bon Air' },
    
    // East Hills/Outer East
    'easthills': { lat: 40.4467, lng: -79.8819, radius: 0.02, name: 'East Hills' },
    'eastcarnegie': { lat: 40.4281, lng: -79.8781, radius: 0.015, name: 'East Carnegie' },
    'summerhill': { lat: 40.4317, lng: -79.8950, radius: 0.01, name: 'Summer Hill' },
    'oakwood': { lat: 40.4536, lng: -79.8608, radius: 0.015, name: 'Oakwood' },
    'ridgemont': { lat: 40.4428, lng: -79.8708, radius: 0.01, name: 'Ridgemont' },
    'saintclair': { lat: 40.4131, lng: -79.8983, radius: 0.01, name: 'Saint Clair' }
};

function findExistingMarker(lat, lng) {
    const tolerance = 0.0001;
    return clickedLocations.find(m => Math.abs(m.getLatLng().lat - lat) < tolerance && Math.abs(m.getLatLng().lng - lng) < tolerance);
}

// Calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find neighborhood using coordinate proximity
function findNeighborhoodByProximity(lat, lng) {
    for (const [key, coords] of Object.entries(pittsburghNeighborhoods)) {
        const distance = calculateDistance(lat, lng, coords.lat, coords.lng);
        if (distance <= coords.radius) {
            return coords.name;
        }
    }
    return null;
}

// Function to check saved mappings first
function checkSavedNeighborhoodMappings(lat, lng) {
    if (!window.neighborhoodMappings) return null;
    
    const tolerance = 0.001; // About 100m
    const match = window.neighborhoodMappings.find(mapping => 
        Math.abs(mapping.lat - lat) < tolerance && 
        Math.abs(mapping.lng - lng) < tolerance
    );
    
    return match ? match.neighborhood : null;
}

// Optional: Save neighborhood mappings for future reference
function saveNeighborhoodMapping(lat, lng, neighborhood) {
    const mapping = {
        lat: lat,
        lng: lng,
        neighborhood: neighborhood,
        timestamp: new Date().toISOString()
    };
    
    if (!window.neighborhoodMappings) {
        window.neighborhoodMappings = [];
    }
    window.neighborhoodMappings.push(mapping);
    
    console.log('Saved neighborhood mapping:', mapping);
}

// Generate helpful guidance for identifying neighborhoods from addresses
function generateNeighborhoodGuidance(address) {
    const addressLower = address.toLowerCase();
    
    // Common Pittsburgh street patterns and their associated neighborhoods
    const streetPatterns = [
        { pattern: ['5th avenue', 'sixth avenue', 'seventh avenue'], hint: 'Downtown/Oakland area - likely Central Business District or Oakland' },
        { pattern: ['carson street', 'east carson'], hint: 'South Side area - likely South Side Flats' },
        { pattern: ['penn avenue', 'penn ave'], hint: 'Strip District, Lawrenceville, or East Liberty area' },
        { pattern: ['liberty avenue', 'liberty ave'], hint: 'Bloomfield, Lawrenceville, or East Liberty area' },
        { pattern: ['centre avenue', 'centre ave'], hint: 'Hill District or East Liberty area' },
        { pattern: ['forbes avenue', 'forbes ave'], hint: 'Oakland, Squirrel Hill, or Point Breeze area' },
        { pattern: ['murray avenue', 'murray ave'], hint: 'Squirrel Hill area' },
        { pattern: ['walnut street'], hint: 'Shadyside or East Liberty area' },
        { pattern: ['ellsworth avenue', 'ellsworth ave'], hint: 'Shadyside area' },
        { pattern: ['butler street'], hint: 'Lawrenceville area' },
        { pattern: ['smallman street'], hint: 'Strip District area' },
        { pattern: ['federal street'], hint: 'North Side area - Allegheny West or Central Northside' },
        { pattern: ['east ohio street', 'ohio street'], hint: 'North Side area' },
        { pattern: ['main street'], hint: 'Check if near Sharpsburg (Lawrenceville) or other areas' },
        { pattern: ['highland avenue', 'highland ave'], hint: 'Highland Park or East Liberty area' },
        { pattern: ['frankstown avenue', 'frankstown ave'], hint: 'Homewood or East Hills area' },
        { pattern: ['brownsville road'], hint: 'Carrick, Overbrook, or Baldwin area' },
        { pattern: ['west liberty avenue', 'west liberty ave'], hint: 'West End, Elliott, or Sheraden area' },
        { pattern: ['banksville road'], hint: 'Banksville area' },
        { pattern: ['saw mill run'], hint: 'West End or Westwood area' }
    ];
    
    // Check for specific street patterns
    let streetHint = null;
    for (const pattern of streetPatterns) {
        if (pattern.pattern.some(street => addressLower.includes(street))) {
            streetHint = pattern.hint;
            break;
        }
    }
    
    // Check for ZIP codes (if present in address)
    const zipHints = [
        { zip: '15213', hint: 'Oakland area (Central, North, or South Oakland)' },
        { zip: '15232', hint: 'Shadyside area' },
        { zip: '15217', hint: 'Squirrel Hill area' },
        { zip: '15206', hint: 'East Liberty, Highland Park, or Garfield area' },
        { zip: '15201', tip: 'Lawrenceville area' },
        { zip: '15222', hint: 'Strip District area' },
        { zip: '15219', hint: 'Hill District area' },
        { zip: '15203', hint: 'South Side area' },
        { zip: '15210', hint: 'Mount Washington area' },
        { zip: '15212', hint: 'North Side (Allegheny) area' },
        { zip: '15214', hint: 'North Side area' },
        { zip: '15224', hint: 'East End area' },
        { zip: '15208', hint: 'Point Breeze or Homewood area' },
        { zip: '15218', hint: 'Squirrel Hill South area' }
    ];
    
    let zipHint = null;
    for (const zipData of zipHints) {
        if (addressLower.includes(zipData.zip)) {
            zipHint = zipData.hint;
            break;
        }
    }
    
    // Generate guidance HTML
    let guidance = '<div style="background:#f8f9fa;padding:10px;margin:10px 0;border-radius:5px;text-align:left;font-size:14px;">';
    guidance += '<strong>💡 Tips for identifying the neighborhood:</strong><br>';
    
    if (streetHint) {
        guidance += `<span style="color:#007bff;">• Based on the street: ${streetHint}</span><br>`;
    }
    
    if (zipHint) {
        guidance += `<span style="color:#28a745;">• Based on the area: ${zipHint}</span><br>`;
    }
    
    // General guidance
    guidance += `<span style="color:#6c757d;">• Look for major streets or landmarks in the address</span><br>`;
    guidance += `<span style="color:#6c757d;">• Consider nearby universities, hospitals, or business districts</span><br>`;
    
    // Pittsburgh-specific guidance
    if (addressLower.includes('university') || addressLower.includes('pitt') || addressLower.includes('carnegie')) {
        guidance += `<span style="color:#dc3545;">• Near university? Likely Oakland area</span><br>`;
    }
    
    if (addressLower.includes('heinz field') || addressLower.includes('pnc park') || addressLower.includes('allegheny')) {
        guidance += `<span style="color:#dc3545;">• Near stadiums? Likely North Shore area</span><br>`;
    }
    
    if (addressLower.includes('mount') || addressLower.includes('mt.')) {
        guidance += `<span style="color:#dc3545;">• "Mount" in name? Check Mount Washington, Mount Oliver</span><br>`;
    }
    
    guidance += '</div>';
    
    return guidance;
}

// Generate helpful resources for neighborhood research
function generateNeighborhoodResources(address, lat, lng) {
    const encodedAddress = encodeURIComponent(address);
    const coords = `${lat.toFixed(5)},${lng.toFixed(5)}`;
    
    let resources = '<div style="background:#e9ecef;padding:12px;margin:10px 0;border-radius:5px;text-align:left;font-size:13px;">';
    resources += '<strong>🔍 Research Tools & Resources:</strong><br>';
    
    // Interactive mapping tools
    resources += '<strong>Official Maps:</strong><br>';
    resources += `<a href="https://pittsburghpa.gov/dcp/gis/gis-mapping" target="_blank" style="color:#007bff;text-decoration:none;">• City of Pittsburgh Official Neighborhood Map</a><br>`;
    resources += `<a href="https://tools.pittsburghpa.gov/pghsnap/" target="_blank" style="color:#007bff;text-decoration:none;">• PGHSnap - City Property Information</a><br>`;
    
    // Google Maps with specific neighborhood overlay
    resources += `<a href="https://www.google.com/maps/place/${encodedAddress}" target="_blank" style="color:#007bff;text-decoration:none;">• Google Maps - Check location context</a><br>`;
    
    // Real estate sites (often have neighborhood info)
    resources += '<br><strong>Real Estate & Community Info:</strong><br>';
    resources += `<a href="https://www.zillow.com/homes/${encodedAddress.replace(/,/g, '')}_rb/" target="_blank" style="color:#007bff;text-decoration:none;">• Zillow - Neighborhood details</a><br>`;
    resources += `<a href="https://www.trulia.com/PA/Pittsburgh/" target="_blank" style="color:#007bff;text-decoration:none;">• Trulia - Pittsburgh neighborhoods</a><br>`;
    resources += `<a href="https://www.apartments.com/pittsburgh-pa/" target="_blank" style="color:#007bff;text-decoration:none;">• Apartments.com - Neighborhood guides</a><br>`;
    
    // Local Pittsburgh resources
    resources += '<br><strong>Pittsburgh-Specific Resources:</strong><br>';
    resources += `<a href="https://www.visitpittsburgh.com/neighborhoods/" target="_blank" style="color:#007bff;text-decoration:none;">• Visit Pittsburgh - Neighborhood Guide</a><br>`;
    resources += `<a href="https://www.post-gazette.com/neighborhoods" target="_blank" style="color:#007bff;text-decoration:none;">• Pittsburgh Post-Gazette Neighborhoods</a><br>`;
    resources += `<a href="https://nextpittsburgh.com/neighborhoods/" target="_blank" style="color:#007bff;text-decoration:none;">• NEXTpittsburgh Neighborhood Profiles</a><br>`;
    
    // Wikipedia and community resources
    resources += '<br><strong>Community & Reference:</strong><br>';
    resources += `<a href="https://en.wikipedia.org/wiki/List_of_Pittsburgh_neighborhoods" target="_blank" style="color:#007bff;text-decoration:none;">• Wikipedia - Complete neighborhood list</a><br>`;
    resources += `<a href="https://www.reddit.com/r/pittsburgh/" target="_blank" style="color:#007bff;text-decoration:none;">• r/pittsburgh - Ask locals</a><br>`;
    resources += `<a href="https://www.facebook.com/groups/PittsburghPA/" target="_blank" style="color:#007bff;text-decoration:none;">• Facebook Pittsburgh groups</a><br>`;
    
    // Quick lookup tools
    resources += '<br><strong>Quick Lookup:</strong><br>';
    resources += `<span style="color:#6c757d;">• Try searching: "${address} neighborhood Pittsburgh"</span><br>`;
    resources += `<span style="color:#6c757d;">• Or: "What neighborhood is ${address.split(',')[0]} in Pittsburgh"</span><br>`;
    
    // Coordinate-based tools
    resources += '<br><strong>Coordinate Tools:</strong><br>';
    resources += `<a href="https://www.latlong.net/c/?lat=${lat}&long=${lng}" target="_blank" style="color:#007bff;text-decoration:none;">• LatLong.net - Reverse geocoding</a><br>`;
    resources += `<a href="https://nominatim.openstreetmap.org/reverse?format=html&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1" target="_blank" style="color:#007bff;text-decoration:none;">• OpenStreetMap - Detailed location info</a><br>`;
    
    // Local government resources
    resources += '<br><strong>Official City Resources:</strong><br>';
    resources += `<a href="https://pittsburghpa.gov/mayor/neighborhoods" target="_blank" style="color:#007bff;text-decoration:none;">• Mayor's Office Neighborhood Info</a><br>`;
    resources += `<a href="https://pittsburghpa.gov/council/" target="_blank" style="color:#007bff;text-decoration:none;">• City Council Districts (may help identify area)</a><br>`;
    
    // Emergency fallback
    resources += '<br><strong>Still Unsure?</strong><br>';
    resources += `<span style="color:#dc3545;">• Look for nearby landmarks, businesses, or institutions</span><br>`;
    resources += `<span style="color:#dc3545;">• Check the closest major street or intersection</span><br>`;
    resources += `<span style="color:#dc3545;">• When in doubt, use the broader area name (e.g., "East End", "North Side")</span><br>`;
    
    resources += '</div>';
    
    resources += '</div>';
    return resources;
}

// Function to prompt user for neighborhood when automatic detection fails
async function promptForNeighborhood(lat, lng, address) {
    return new Promise((resolve) => {
        if(document.getElementById("neighborhoodOverlay")) {
            resolve(null);
            return;
        }

        const overlay = document.createElement("div");
        overlay.id = "neighborhoodOverlay";
        overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:1001";

        const container = document.createElement("div");
        container.style = "background:white;padding:25px;border-radius:10px;text-align:center;max-width:400px;margin:20px";
        
        // Generate helpful guidance based on the address
        const guidance = generateNeighborhoodGuidance(address);
        const resources = generateNeighborhoodResources(address, lat, lng);
        
        container.innerHTML = `
            <h3>Unknown Neighborhood</h3>
            <p><strong>Location:</strong> ${lat.toFixed(5)}, ${lng.toFixed(5)}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p>We couldn't automatically detect the neighborhood. Please help us:</p>
            ${guidance}
            ${resources}
            <input type="text" id="neighborhoodInput" placeholder="Enter neighborhood name" style="width:100%;padding:8px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
            <div style="margin-top:15px;">
                <button id="saveNeighborhood" style="margin:5px;padding:10px 15px;background:#28a745;color:white;border:none;border-radius:5px;cursor:pointer">Save</button>
                <button id="skipNeighborhood" style="margin:5px;padding:10px 15px;background:#6c757d;color:white;border:none;border-radius:5px;cursor:pointer">Skip</button>
            </div>
        `;

        const input = container.querySelector('#neighborhoodInput');
        const saveBtn = container.querySelector('#saveNeighborhood');
        const skipBtn = container.querySelector('#skipNeighborhood');

        saveBtn.onclick = function() {
            const neighborhoodName = input.value.trim();
            if (neighborhoodName) {
                saveNeighborhoodMapping(lat, lng, neighborhoodName);
            }
            document.body.removeChild(overlay);
            resolve(neighborhoodName || null);
        };

        skipBtn.onclick = function() {
            document.body.removeChild(overlay);
            resolve(null);
        };

        // Allow Enter key to save
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveBtn.click();
            }
        });

        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        // Focus the input
        setTimeout(() => input.focus(), 100);
    });
}

// Enhanced GIS-based neighborhood detection using multiple services
async function getAddressDetailsAdvanced(lat, lng) {
    try {
        // Strategy 1: Try multiple geocoding services for better accuracy
        const geocodingResults = await Promise.allSettled([
            tryNominatimGeocoding(lat, lng),
            tryMapboxGeocoding(lat, lng),
            tryOpenCageGeocoding(lat, lng)
        ]);
        
        let bestResult = null;
        let address = "Address Unknown";
        
        // Find the best result with most detailed neighborhood info
        for (const result of geocodingResults) {
            if (result.status === 'fulfilled' && result.value) {
                if (!bestResult || (result.value.neighborhood && result.value.confidence > (bestResult.confidence || 0))) {
                    bestResult = result.value;
                    address = result.value.address || address;
                }
            }
        }
        
        let neighborhood = bestResult?.neighborhood;
        
        // Strategy 2: If still no neighborhood, try coordinate-based lookup with our comprehensive database
        if (!neighborhood) {
            neighborhood = findNeighborhoodByProximity(lat, lng);
        }
        
        // Strategy 3: Enhanced address pattern matching with Pittsburgh-specific knowledge
        if (!neighborhood && address !== "Address Unknown") {
            neighborhood = extractNeighborhoodFromAddress(address, lat, lng);
        }
        
        // Strategy 4: Use GIS boundary analysis if we have coordinates
        if (!neighborhood) {
            neighborhood = await analyzeGISBoundaries(lat, lng, address);
        }
        
        // Strategy 5: Allow user input for unknown neighborhoods with enhanced guidance
        if (!neighborhood) {
            neighborhood = await promptForNeighborhood(lat, lng, address);
        }
        
        return { address, neighborhood: neighborhood || "Neighborhood Unknown" };
        
    } catch (e) {
        console.error("Advanced geocoding failed:", e);
        
        // Fallback: Try our coordinate-based lookup and user input
        const neighborhood = findNeighborhoodByProximity(lat, lng) || 
                           await promptForNeighborhood(lat, lng, "Geocoding services unavailable");
        
        return { 
            address: "Address Unknown", 
            neighborhood: neighborhood || "Neighborhood Unknown" 
        };
    }
}

// Primary Nominatim geocoding with enhanced parsing
async function tryNominatimGeocoding(lat, lng) {
    try {
        // Call the local backend proxy which forwards to Nominatim with a proper User-Agent.
        // Make sure the backend is running on port 5000 (Flask) and CORS is configured.
        const proxyUrl = `https://boycott-backend-production.up.railway.app/nominatim/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        const res = await fetch(proxyUrl);
        const data = await res.json();
        
        if (!data.address) return null;
        
        const address = data.display_name || "Address Unknown";
        
        // Enhanced neighborhood extraction with weighted priorities
        const neighborhood = data.address.neighbourhood ||
                           data.address.suburb ||
                           data.address.city_district ||
                           data.address.quarter ||
                           data.address.residential ||
                           data.address.hamlet ||
                           data.address.village ||
                           data.address.town_district ||
                           data.address.subdistrict;
        
        return {
            address,
            neighborhood,
            confidence: neighborhood ? 0.8 : 0.3,
            source: 'Nominatim'
        };
    } catch (e) {
        console.warn("Nominatim geocoding failed:", e);
        return null;
    }
}

// Mapbox geocoding (free tier available)
async function tryMapboxGeocoding(lat, lng) {
    // Note: This would require a Mapbox API key
    // For demo purposes, this is a placeholder that could be implemented
    try {
        // Placeholder for Mapbox Places API call
        // const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=YOUR_TOKEN&types=neighborhood`);
        
        // Return null since we don't have API key in this demo
        return null;
    } catch (e) {
        return null;
    }
}

// OpenCage geocoding (alternative service)
async function tryOpenCageGeocoding(lat, lng) {
    // Note: This would require an OpenCage API key
    // Placeholder for demonstration
    try {
        // Placeholder for OpenCage API call
        // const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=YOUR_KEY&no_annotations=1`);
        
        return null;
    } catch (e) {
        return null;
    }
}

// Enhanced address pattern extraction using Pittsburgh GIS knowledge
function extractNeighborhoodFromAddress(address, lat, lng) {
    const addressLower = address.toLowerCase();
    
    // Pittsburgh-specific street-to-neighborhood mapping based on GIS data
    const streetNeighborhoodMap = {
        // Major arterials with clear neighborhood associations
        'carson street': () => lat > 40.425 ? 'South Side Flats' : 'South Side Slopes',
        'east carson street': 'South Side Flats',
        'penn avenue': () => {
            if (lng > -79.95) return 'Strip District';
            if (lng > -79.93) return 'Lawrenceville';
            return 'East Liberty';
        },
        'liberty avenue': () => {
            if (lng > -79.95) return 'Bloomfield';
            if (lng > -79.93) return 'Lawrenceville';
            return 'East Liberty';
        },
        'forbes avenue': () => {
            if (lng > -79.95) return 'Oakland';
            if (lng > -79.93) return 'Squirrel Hill';
            return 'Point Breeze';
        },
        'fifth avenue': () => lng > -79.99 ? 'Central Business District' : 'Oakland',
        'butler street': 'Lawrenceville',
        'smallman street': 'Strip District',
        'federal street': 'Allegheny West',
        'east ohio street': 'Central Northside',
        'murray avenue': 'Squirrel Hill',
        'walnut street': 'Shadyside',
        'ellsworth avenue': 'Shadyside',
        'centre avenue': () => lng > -79.97 ? 'Middle Hill' : 'East Liberty',
        'frankstown avenue': () => lng > -79.91 ? 'Homewood' : 'East Hills',
        'highland avenue': 'Highland Park',
        'brownsville road': () => lat < 40.41 ? 'Carrick' : 'Overbrook',
        'west liberty avenue': () => lng < -80.04 ? 'West End' : 'Elliott'
    };
    
    // Check each street pattern
    for (const [street, neighborhood] of Object.entries(streetNeighborhoodMap)) {
        if (addressLower.includes(street)) {
            if (typeof neighborhood === 'function') {
                return neighborhood();
            }
            return neighborhood;
        }
    }
    
    // ZIP code based neighborhood detection with GIS precision
    const zipToNeighborhood = {
        '15213': () => {
            // Oakland ZIP - use coordinates to determine sub-area
            if (lat > 44.5) return 'North Oakland';
            if (lat < 40.43) return 'South Oakland';
            if (lng < -79.955) return 'West Oakland';
            return 'Central Oakland';
        },
        '15232': 'Shadyside',
        '15217': () => lat > 40.43 ? 'Squirrel Hill North' : 'Squirrel Hill South',
        '15206': () => {
            if (lng < -79.93) return 'East Liberty';
            if (lat > 40.47) return 'Highland Park';
            return 'Garfield';
        },
        '15201': () => {
            if (lat > 40.47) return 'Upper Lawrenceville';
            if (lat > 40.465) return 'Central Lawrenceville';
            return 'Lower Lawrenceville';
        },
        '15222': 'Strip District',
        '15219': () => lng < -79.97 ? 'Middle Hill' : 'Crawford-Roberts',
        '15203': () => lat > 40.427 ? 'South Side Flats' : 'South Side Slopes',
        '15210': 'Mount Washington',
        '15212': () => lng < -80.01 ? 'Allegheny West' : 'Central Northside',
        '15208': () => lng < -79.92 ? 'Point Breeze' : 'Homewood'
    };
    
    // Extract ZIP code and determine neighborhood
    const zipMatch = address.match(/\b(15\d{3})\b/);
    if (zipMatch) {
        const zip = zipMatch[1];
        const neighborhood = zipToNeighborhood[zip];
        if (neighborhood) {
            return typeof neighborhood === 'function' ? neighborhood() : neighborhood;
        }
    }
    
    return null;
}

async function analyzeGISBoundaries(lat, lng, address) {
    // Placeholder: If you have GeoJSON for Pittsburgh neighborhoods, you can check if the point is inside a polygon
    if (!window.pittsburghNeighborhoodGeoJSON) return null;

    const point = [lng, lat]; // GeoJSON uses [lng, lat]

    for (const feature of window.pittsburghNeighborhoodGeoJSON.features) {
        if (pointInPolygon(point, feature.geometry.coordinates)) {
            return feature.properties.name || null;
        }
    }
    return null;
}

// Simple point-in-polygon check (ray casting algorithm)
function pointInPolygon(point, vs) {
    const x = point[0], y = point[1];

    let inside = false;
    for (let i = 0, j = vs[0].length - 1; i < vs[0].length; j = i++) {
        const xi = vs[0][i][0], yi = vs[0][i][1];
        const xj = vs[0][j][0], yj = vs[0][j][1];

        const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Check if coordinates are within Pittsburgh city limits
function isWithinPittsburghBounds(lat, lng) {
    // Pittsburgh approximate bounding box
    return lat >= 40.36 && lat <= 40.50 && lng >= -80.10 && lng <= -79.86;
}

// Analyze river geography for neighborhood hints
function analyzeRiverGeography(lat, lng) {
    // North of Allegheny River (North Side)
    if (lat > 40.447 && lng > -80.02) {
        if (lng < -80.005) return 'North Shore';
        if (lng < -79.995) return 'Central Northside';
        return 'East Allegheny';
    }
    
    // South of Monongahela River
    if (lat < 40.425) {
        if (lng > -79.98) return 'South Side Flats';
        return 'Mount Washington';
    }
    
    // Between rivers (downtown/strip district)
    if (lat > 40.44 && lat < 40.447 && lng > -80.0) {
        return lng > -79.99 ? 'Central Business District' : 'Strip District';
    }
    
    return null;
}

// Analyze elevation patterns (simplified)
function analyzeElevationPatterns(lat, lng) {
    // Mount Washington area (high elevation south of river)
    if (lat < 40.435 && lng < -80.005) {
        return 'Mount Washington';
    }
    
    // Highland areas in East End
    if (lat > 40.47 && lng > -79.95 && lng < -79.92) {
        return 'Highland Park';
    }
    
    return null;
}

// Enhanced address details function with multiple fallback strategies
async function getAddressDetails(lat, lng) {
    // Use the advanced GIS-based detection system
    return await getAddressDetailsAdvanced(lat, lng);
}

async function handleNewLocation(lat, lng) {
    let existingMarker = findExistingMarker(lat, lng);
    if (existingMarker) {
        showAttendChoice(existingMarker);
        return;
    }

    // First check if we have a saved mapping for this location
    let neighborhood = checkSavedNeighborhoodMappings(lat, lng);
    let address;
    
    if (neighborhood) {
        // We have a saved mapping, just get the address
        try {
                // Use local backend proxy to avoid CORS/403 from direct Nominatim requests
                const res = await fetch(`/nominatim/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                const data = await res.json();
            address = data.display_name || "Address Unknown";
        } catch (e) {
            address = "Address Unknown";
        }
    } else {
        // Use the enhanced detection
        const result = await getAddressDetails(lat, lng);
        address = result.address;
        neighborhood = result.neighborhood;
    }

    const description = prompt("Enter a description for this protest location:");
    if (!description || description.trim() === "") return;

    const marker = L.marker([lat, lng]);
    marker.description = description;
    marker.address = address;
    marker.neighborhood = neighborhood;
    marker.attendance = 0;

    showAttendChoice(marker, true);
}

function showAttendChoice(marker, isNew=false) {
    if(document.getElementById("attendOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "attendOverlay";
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:1000";

    const container = document.createElement("div");
    container.style = "background:white;padding:20px;border-radius:10px;text-align:center";
    container.innerHTML = "<p>Do you want to attend this protest?</p>";

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Yes";
    yesBtn.style = "margin:10px;padding:10px;background:#28a745;color:white;border:none;border-radius:5px;cursor:pointer";
    yesBtn.onclick = function() {
        marker.attendance++;
        marker.addTo(map);
        updateMarkerPopup(marker);
        if (!clickedLocations.includes(marker)) clickedLocations.push(marker);
        updateLocationTable();
        document.body.removeChild(overlay);
        marker.openPopup();
    };

    const noBtn = document.createElement("button");
    noBtn.textContent = "No";
    noBtn.style = "margin:10px;padding:10px;background:#dc3545;color:white;border:none;border-radius:5px;cursor:pointer";
    noBtn.onclick = function() { document.body.removeChild(overlay); };

    container.appendChild(yesBtn);
    container.appendChild(noBtn);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

function updateMarkerPopup(marker) {
    marker.bindPopup(`<b>Protest location</b><br>
        Address: ${marker.address}<br>
        Neighborhood: ${marker.neighborhood}<br>
        Lat: ${marker.getLatLng().lat.toFixed(5)}<br>
        Lng: ${marker.getLatLng().lng.toFixed(5)}<br>
        Description: ${marker.description}<br>
        Attendance: ${marker.attendance}`);
}

function updateLocationTable() {
    const tbody = document.querySelector("#locationTable tbody");
    tbody.innerHTML = "";
    clickedLocations.forEach((m,i) => {
        const row = tbody.insertRow();
        row.id = `row-${i}`;
        row.innerHTML = `
            <td>${i+1}</td>
            <td>${m.getLatLng().lat.toFixed(5)}</td>
            <td>${m.getLatLng().lng.toFixed(5)}</td>
            <td data-field="address">${m.address}</td>
            <td data-field="neighborhood">${m.neighborhood}</td>
            <td data-field="description">${m.description}</td>
            <td>
                <button class="attendance-btn decrease-btn" data-index="${i}">-</button>
                <span id="attendance-count-${i}">${m.attendance}</span>
                <button class="attendance-btn increase-btn" data-index="${i}">+</button>
            </td>
            <td>
                <button class="edit-btn" onclick="toggleEdit(${i})">Edit</button>
            </td>
        `;
    });
}

// Function to handle attendance changes
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('increase-btn') || e.target.classList.contains('decrease-btn')) {
        const index = e.target.getAttribute('data-index');
        const marker = clickedLocations[index];
        if (e.target.classList.contains('increase-btn')) {
            marker.attendance++;
        } else if (e.target.classList.contains('decrease-btn') && marker.attendance > 0) {
            marker.attendance--;
        }
        document.getElementById(`attendance-count-${index}`).textContent = marker.attendance;
        updateMarkerPopup(marker);
    }
});

// Function to toggle edit mode for a row
function toggleEdit(index) {
    const row = document.getElementById(`row-${index}`);
    const isEditing = row.classList.toggle('edit-mode');
    const marker = clickedLocations[index];

    const editBtn = row.querySelector('.edit-btn');
    editBtn.textContent = isEditing ? 'Save' : 'Edit';
    editBtn.classList.toggle('save-btn', isEditing);
    editBtn.classList.toggle('edit-btn', !isEditing);
    editBtn.onclick = isEditing ? () => saveEdit(index) : () => toggleEdit(index);

    if (isEditing) {
        // Create input fields for editable cells
        const fields = ['address', 'neighborhood', 'description'];
        fields.forEach(field => {
            const cell = row.querySelector(`[data-field="${field}"]`);
            const currentValue = cell.textContent;
            cell.innerHTML = `<input type="text" value="${currentValue}">`;
        });
    } else {
        // Revert to display mode
        updateLocationTable(); // Re-render the whole table to simplify logic
    }
}


async function addProtestMarker(markerData) {
    try {
        const response = await fetch('https://boycott-backend-production.up.railway.app/api/protests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(markerData)
        });

        const result = await response.json();
        if (!response.ok) {
            console.error('Error adding protest:', result);
            return;
        }

        console.log('Protest added with ID:', result.id);
        // Optionally add the marker to the map immediately
    } catch (err) {
        console.error('Network error:', err);
    }
}


async function loadProtests(userId) { // pass in logged-in user's ID
    if (!userId) {
    console.warn("No logged-in user ID found. Attend buttons won't work.");
}
    try {
        const response = await fetch('https://boycott-backend-production.up.railway.app/api/protests');
        const protests = await response.json();

        protests.forEach(protest => {
            const marker = L.marker([protest.latitude, protest.longitude]).addTo(map);

            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
                <strong>${protest.description}</strong><br>
                Attendance: <span id="attendance-${protest.id}">${protest.attendance}</span><br>
                Notes: ${protest.notes || 'N/A'}<br>
            `;

            // Create Attend button
            const attendButton = document.createElement('button');
            attendButton.innerText = "Attend";
            attendButton.onclick = async () => {
                try {
                    const res = await fetch(`https://boycott-backend-production.up.railway.app/api/protests/${protest.id}/attend`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId })
                    });
                    const result = await res.json();
                    if (!res.ok) {
                        alert(result.error);
                        return;
                    }
                    // Update attendance count in popup
                    document.getElementById(`attendance-${protest.id}`).innerText = result.attendance;
                } catch (err) {
                    console.error(err);
                }
            };

            popupContent.appendChild(attendButton);
            marker.bindPopup(popupContent);
        });
    } catch (err) {
        console.error('Failed to load protests:', err);
    }
}


// Call this once when the page loads
const userId = localStorage.getItem("user_id");
loadProtests(userId);

// Function to save the edits
function saveEdit(index) {
    const row = document.getElementById(`row-${index}`);
    const marker = clickedLocations[index];
    const fields = ['address', 'neighborhood', 'description'];

    fields.forEach(field => {
        const cell = row.querySelector(`[data-field="${field}"]`);
        const input = cell.querySelector('input');
        if (input) {
            marker[field] = input.value;
        }
    });

    updateMarkerPopup(marker);
    updateLocationTable();
}

// Instead of using undefined `lat` and `lng`
function createMarker(lat, lng, popupContent) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(popupContent).openPopup();
    return marker;
}


// Function to add a protest marker with reverse geocoding
async function addProtestMarker(lat, lng, userId, extraData = {}) {
    try {
        // 1️⃣ Get address from Nominatim
        const nominatimUrl = `https://boycott-backend-production.up.railway.app/nominatim/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        const nominatimResp = await fetch(nominatimUrl);
        const nominatimData = await nominatimResp.json();

        let address = '';
        let neighborhood = '';

        if (!nominatimData.error) {
            address = nominatimData.display_name || '';
            if (nominatimData.address) {
                neighborhood = nominatimData.address.neighbourhood || nominatimData.address.suburb || '';
            }
        }

        // 2️⃣ Build the marker data to send to your API
        const markerData = {
            lat,
            lng,
            address,
            neighborhood,
            description: extraData.description || '',
            attendance: extraData.attendance || 0,
            status: extraData.status || 'active',
            notes: extraData.notes || '',
            resources: extraData.resources || '',
            user_id: userId
        };

        // 3️⃣ Save marker in the database via your Flask API
        const response = await fetch('https://boycott-backend-production.up.railway.app/api/protests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(markerData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Error adding protest:', result);
            return;
        }

        console.log('Protest added with ID:', result.id);

        // 4️⃣ Add marker to the map immediately
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
            <strong>${markerData.description}</strong><br>
            Address: ${markerData.address}<br>
            Attendance: ${markerData.attendance}<br>
            Notes: ${markerData.notes || 'N/A'}
        `);

    } catch (err) {
        console.error('Error adding protest marker:', err);
    }
}

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const userId = 1; // Replace with logged-in user's ID

    const popupContent = document.createElement('div');
    popupContent.innerHTML = `<strong>Peaceful protest</strong><br>Attendance: <span id="attendance-1">0</span><br><button id="attend-btn-1">Attend</button>`;

    createMarker(lat, lng, popupContent);

    addProtestMarker(lat, lng, userId, { description: 'Peaceful protest' });
});



async function attendProtest(protestId) {
  const user_id = localStorage.getItem("user_id"); // get stored user ID
  if (!user_id) {
    alert("Please log in first!");
    return;
  }

  try {
    const res = await fetch(`https://boycott-backend-production.up.railway.app/api/protests/${protestId}/attend`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ user_id: user_id })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Attendance confirmed! Total attendees: " + data.attendance);
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
}

const marker = L.marker([lat, lng]).addTo(map);
marker.bindPopup(popupContent).openPopup();

// Wait for popup to open before adding listener
marker.on('popupopen', () => {
    const btn = document.getElementById(`attend-btn-${protestId}`);
    if (btn) {
        btn.onclick = async () => {
            // Increment attendance visually
            const span = document.getElementById(`attendance-${protestId}`);
            let current = parseInt(span.textContent);
            current++;
            span.textContent = current;

            // Optional: Call backend
            try {
                const res = await fetch(`https://boycott-backend-production.up.railway.app/api/protests/${protestId}/attend`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: 1 }) // replace with actual logged-in user ID
                });
                const data = await res.json();
                if (!res.ok) {
                    alert(data.error);
                } else {
                    span.textContent = data.attendance; // update with backend value
                }
            } catch (err) {
                console.error(err);
            }
        };
    }
});


map.on('click', e => handleNewLocation(e.latlng.lat, e.latlng.lng));

