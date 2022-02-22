import axios from 'axios';
import '../styles/Button.scss';


function Posts() {
    return (
        <div>
            <form id="createPost" className='createPostForm'>
                <input type="text" id="postTitle" />Titre du post
                <input type ="text" id="postBody" />Contenu du post
                <button id="newPost"className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Postez !</button>
            </form>
            <button id="openForm" className="">
                +
            </button>
        </div>
          );
}

window.addEventListener('DOMContentLoaded', (event) => {
    let title = document.getElementById('postTitle');
    let text = document.getElementById('postBody');

    const openPostForm = document.getElementById('openForm');
    function openForm(){
        const createPost = document.getElementById('createPost');
        createPost.style.display = "initial";
    }
    openPostForm.addEventListener('click', openForm);

    function newPost(ev) {
        ev.preventDefault();

        console.log('parti')
        let postTitle = title.value;
        let postText = text.value;

        let dataToSend = {
            title: postTitle,
            text: postText,
        }


        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
        axios.post('http://localhost:8080/api/posts/newPost', {             
            title: postTitle,
            text: postText},   
            headers)
        .then(res => {
            console.log('ça marche');

        })
    }

    let post = document.getElementById('newPost');
    post.addEventListener('click', newPost);
})


export default Posts