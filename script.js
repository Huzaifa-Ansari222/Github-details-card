function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return ` ${day}/${month}/${year}`;
}

function fetchGitHubUser() {
    const username = document.getElementById('username').value.trim();//input username value and remove spaces
    if (username === '') {
        alert('Please enter a GitHub username.');
        return;
    }
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failed!');
            }
            return response.json();
        })
        .then(data => {
            const userDetails = `
                <img src="${data.avatar_url}" alt="Avatar" style="width: 200px; height: auto;">
                <h3>${data.name ||'Name: N/A'}</h3>
                <h5>${data.bio || 'Bio: N/A'}</h5>
                <p><strong>Username:</strong> ${data.login}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
                <p><b>Joined at:</b>${data.created_at ? formatDate(data.created_at) : 'N/A'}</p>
                <p><strong>Website:</strong> <a href="${data.blog}" target="_blank">${data.blog || 'N/A'}</a></p>
            `;
            // console.log(data);
            document.getElementById('user-details').innerHTML = userDetails; //put all details in useDetails div
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('user-details').innerHTML = '<p>Failed to fetch user details. Please check the username and try again.</p>';
        });
}
