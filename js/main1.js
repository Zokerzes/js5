const service_url = 'https://jsonplaceholder.typicode.com';

$.ajax({
  url: service_url + '/posts',
  method: 'get',
  dataType: 'json',
  success: function (data) {
    data.forEach(post => {
      drawPost(post)
    });

    loadComments()
  }
});

function drawPost(post) {
  const div = document.createElement('div');
  div.classList.add('post');

  const title = document.createElement('h3')
  title.innerText = post.title;

  const text = document.createElement('p');
  text.innerText = post.body;

  const commentsBox = document.createElement('div');
  commentsBox.setAttribute('id', 'commentsBox_' + post.id)
  commentsBox.classList.add('comments-box')

  const button = document.createElement('span');
  button.innerText = 'Комментарии';
  button.classList.add('comments_button')

  div.append(title);
  div.append(text);
  div.append(button)
  div.append(commentsBox);

  addOpenCommentsListener(button);

  document.getElementById('posts').append(div);
}


function loadComments() {
  $.ajax({
    url: service_url + '/comments',
    method: 'get',
    dataType: 'json',
    success: function (data) {
      data.forEach(comment => {
        drawComment(comment)
      });
    }
  });
}

function drawComment(comment) {
  const div = document.createElement('div');
  div.classList.add('comment');

  const title = document.createElement('h3')
  title.innerText = comment.name;

  const text = document.createElement('p');
  text.innerText = comment.body;

  const email = document.createElement('a')
  email.innerText = comment.email;
  email.setAttribute('href', 'mailto:' + comment.email);

  div.append(title);
  div.append(email);
  div.append(text);

  const commentsBox = document.getElementById('commentsBox_' + comment.postId);
  commentsBox.append(div);
}

function addOpenCommentsListener(button) {

  button.addEventListener('click', function (e) {
    let commentBox = e.target.parentElement.querySelector('.comments-box');

    if (commentBox.style.display === 'block') {
      commentBox.style.display = 'none'
    } else {
      commentBox.style.display = 'block';
    }
  })
}
