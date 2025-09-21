const ul = document.getElementById('companyList');
const buttons = document.querySelectorAll('.button-container .btn');
const form = document.getElementById('boycottForm');

// Track current mode (default = "chosen")
let currentMode = "chosen";  

// Load leaderboard from backend
async function loadLeaderboard() {
    const user_id = localStorage.getItem("user_id"); // get current user ID

    try {
        const res = await fetch(`http://boycott-backend-production.up.railway.app/leaderboard?mode=${currentMode}`);
        const data = await res.json();

        ul.innerHTML = ''; // clear existing list

        data.forEach((item, idx) => {
            const li = document.createElement('li');

            const rank = document.createElement('span');
            rank.className = 'rank';
            rank.textContent = idx + 1;

            const link = document.createElement('a');
            link.className = 'player';
            link.href = '/Company comments/company.html?name=' + encodeURIComponent(item.company_name);
            link.textContent = `${item.company_name}   (# of boycotters: ${item.num_boycotters})`;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Join';
            btn.addEventListener('click', () => {
                if (!user_id) {
                    alert("You must be logged in to join a boycott.");
                    return;
                }
                joinBoycott(user_id, item.boycott_id);
            });

            li.appendChild(rank);
            li.appendChild(link);
            li.appendChild(btn);
            ul.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading leaderboard:", err);
    }
}


// Join boycott (hardcoded user_id = 1 for demo)
async function joinBoycott(user_id, boycott_id) {
    try {
        const res = await fetch('https://boycott-backend-production.up.railway.app/join-boycott', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, boycott_id })
        });

        const result = await res.json();
        if (result.success) {
            alert("You joined the boycott!");
            loadLeaderboard(); // refresh leaderboard
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error("Error joining boycott:", err);
    }
}

// Create boycott
async function createBoycott(e) {
    e.preventDefault();

    const company = document.getElementById('companyName').value.trim();
    const reason = document.getElementById('reason').value.trim();

    if (!company || !reason) {
        alert("Please enter both company and reason.");
        return;
    }

    try {
        const res = await fetch('http://boycott-backend-production.up.railway.app/boycotts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ company, reason })
        });

        const result = await res.json();
        if (res.ok) {
            alert("Boycott created successfully!");
            form.reset();
            loadLeaderboard(); // refresh leaderboard
        } else {
            alert(result.error || "Failed to create boycott.");
        }
    } catch (err) {
        console.error("Error creating boycott:", err);
    }
}

// Toggle buttons
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentMode = btn.innerText.includes("Recent") ? "recent" : "chosen";
        loadLeaderboard();
    });
});

// Attach boycott form listener
if (form) {
    form.addEventListener('submit', createBoycott);
}

// Initial load
loadLeaderboard();

// Refresh leaderboard every 5 seconds
setInterval(loadLeaderboard, 5000);