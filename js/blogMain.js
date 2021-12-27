'use strict';

const URI = 'http://imtles.noodless.co.ua/';
const PER_PAGE = 5;

async function getPosts(page = 1) {

    const postsDiv = document.getElementById('posts');
    postsDiv.innerText = '';

    const posts_response = await fetch(`${URI}` + '/wp-json/wp/v2/posts' + `?per_page=${PER_PAGE}` + `&page=${page}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/posts?per_page=2&page=1
    const posts_data = await posts_response.json();


    async function getImage(id) {


        const img_response = await fetch(`${URI}` + '/wp-json/wp/v2/media/' + `${id}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/media/7
        const img_data = await img_response.json();
    
        return img_data;
      }

      posts_data.map(async (postItem) => {

        const placeholder = {
          'media_details': {
            'sizes': {
              'thumbnail': {
                'source_url': './img/avatar.jpg'
                }
            }
          }
        }
        
        const image = postItem.featured_media ? await getImage(postItem.featured_media) : placeholder;

    const post = document.createElement('div');
    const postTitle = document.createElement('h2');
    postTitle.innerHTML = postItem.title.rendered;
   
    const date = new Date(postItem.date);

    const postText = document.createElement('p');
    postText.innerHTML = postItem.content.rendered;
    const postDate = document.createElement('p');
    postDate.innerHTML = `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
    const button = document.createElement('button');
    button.setAttribute('value', postItem.id);
    button.setAttribute('onclick', `getPost(${button.value})`);
    button.innerHTML = `Читать далее...`;


    const postImage = document.createElement('img');
    postImage.setAttribute('src', `${image.media_details.sizes.thumbnail.source_url}`);
    post.appendChild(postImage);

    postsDiv.appendChild(post);
    post.appendChild(postTitle);
    post.appendChild(postText);
    post.appendChild(postDate);
    post.appendChild(button);



    return postsDiv;
  })

  return posts_data;
}

getPosts();

async function getPost(id) {

  const post_response = await fetch(`${URI}` + '/wp-json/wp/v2/posts/' + `${id}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/posts/10
  const post_data = await post_response.json();

  const placeholder = {
      'media_details': {
          'sizes': {
              'thumbnail': {
                  'source_url': './images/avatar.jpg'
              }
          }
      }
  };

  async function getImage(id) {


    const img_response = await fetch(`${URI}` + '/wp-json/wp/v2/media/' + `${id}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/media/7
    const img_data = await img_response.json();

    return img_data;
}

    const image = post_data.featured_media ? await getImage(post_data.featured_media) : placeholder;

    const singlePost = document.getElementById('modalPosts');
    console.log(singlePost)
    singlePost.innerHTML = '';

    const close = document.createElement('button');
      // close.setAttribute('value', post_data.id);
    close.setAttribute('onclick', () => {
    })
    close.innerHTML = `закрыть`;
       

    const post = document.createElement('div');
    const postTitle = document.createElement('h2');
    postTitle.innerHTML = post_data.title.rendered;
   
    const date = new Date(post_data.date);

    const postText = document.createElement('p');
    postText.innerHTML = post_data.content.rendered;
    const postDate = document.createElement('p');
    postDate.innerHTML = `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
    
    
    const postImage = document.createElement('img');
    postImage.setAttribute('src', `${image.media_details.sizes.thumbnail.source_url}`);
    post.appendChild(postImage);

    singlePost.appendChild(post);
    
   
    post.appendChild(postTitle);
    post.appendChild(postText);
    post.appendChild(postDate);
    post.appendChild(close);

    // close.addEventListener('click', () => getPosts())
  
}


