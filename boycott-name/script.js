const form = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const company = document.getElementById('company').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if(!company || !comment) return;

    // Save in localStorage
    const allComments = JSON.parse(localStorage.getItem('companyComments')) || {};
    if(!allComments[company]) allComments[company] = [];
    allComments[company].push({ text: comment, timestamp: Date.now() });
    localStorage.setItem('companyComments', JSON.stringify(allComments));

    // Display the comment on this page
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = company;
    const p = document.createElement('p');
    p.textContent = comment;
    commentDiv.appendChild(strong);
    commentDiv.appendChild(p);
    commentsList.appendChild(commentDiv);
    commentsList.scrollTop = commentsList.scrollHeight;

    form.reset();

    alert(`${company} has been added to the leaderboard!`);
});
