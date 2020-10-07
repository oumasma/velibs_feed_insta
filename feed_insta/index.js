const scrapInsta = () => {
fetch(`https://www.instagram.com/noutnature/?__a=1`)
  .then((response) => response.json())
  .then((data) => displayData(data))
  .catch((error) => console.error('error :', error))
}

scrapInsta();

const displayData = (data) => {
    const posts = data.graphql.user.edge_owner_to_timeline_media.edges;
    console.log(posts);

    const element = document.getElementById("gallery");
    posts.forEach(post => {
        const url = post.node.display_url;
        console.log(url);

        
        const description = post.node.edge_media_to_caption.edges[0].node.text;
        console.log(description);

        showInstagramPost(element, url, description)
    });
}

const showInstagramPost = (element, url, description) => {
    element.innerHTML += `
        <div>
            <img src='${url}' alt='' />
            <p>${description}</p>
        </div>
    `;
}

