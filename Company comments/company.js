const params = new URLSearchParams(window.location.search);
const companyName = params.get("name") || "Placeholder Company";
document.getElementById("companyName").innerText = companyName;

const form = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// Load existing comments
const allComments = JSON.parse(localStorage.getItem('companyComments')) || {};
if(allComments[companyName]) {
    allComments[companyName].forEach(c => {
        const div = document.createElement('div');
        div.classList.add('comment');
        const strong = document.createElement('strong');
        strong.textContent = companyName;
        const p = document.createElement('p');
        p.textContent = c.text;
        div.appendChild(strong);
        div.appendChild(p);
        commentsList.appendChild(div);
    });
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    const comment = document.getElementById('comment').value;

    // Save comment in localStorage
    if(!allComments[companyName]) allComments[companyName] = [];
    allComments[companyName].push({ text: comment, timestamp: Date.now() });
    localStorage.setItem('companyComments', JSON.stringify(allComments));

    // Add comment to page
    const div = document.createElement('div');
    div.classList.add('comment');
    const strong = document.createElement('strong');
    strong.textContent = companyName;
    const p = document.createElement('p');
    p.textContent = comment;
    div.appendChild(strong);
    div.appendChild(p);
    commentsList.appendChild(div);

    commentsList.scrollTop = commentsList.scrollHeight;
    form.reset();
});

const ul = document.getElementById('companyList');
const totalCompanies = 100;

for(let i = 1; i <= totalCompanies; i++){
    const li = document.createElement('li');
    li.innerHTML = `<span class="rank">${i}</span>
                    <a class="player" href="company-comments.html?name=Company%20${i}">Company ${i}</a>`;
    ul.appendChild(li);
}
