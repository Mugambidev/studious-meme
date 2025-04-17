document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const postsContainer = document.getElementById('postsContainer');
  const suggestedUsersContainer = document.getElementById('suggestedUsers');
  const themeToggle = document.getElementById('themeToggle');
  const createPostBtn = document.getElementById('createPost');
  const createPostMobileBtn = document.getElementById('createPostMobile');
  const createPostModal = document.getElementById('createPostModal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const postPreview = document.getElementById('postPreview');
  const previewImage = document.getElementById('previewImage');
  const submitPostBtn = document.getElementById('submitPost');
  const postCaption = document.getElementById('postCaption');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const storyViewerModal = document.getElementById('storyViewerModal');
  const storyUserImage = document.getElementById('storyUserImage');
  const storyUsername = document.getElementById('storyUsername');
  const storyImage = document.getElementById('storyImage');
  const stories = document.querySelectorAll('.story');
  
  // Data
  let posts = [
      {
          id: 1,
          user: {
              username: 'cheddar',
              image: 'https://mighty.tools/mockmind-api/content/cartoon/10.jpg'
          },
          image: 'https://cdn.pixabay.com/photo/2021/12/04/20/59/animal-6845972_640.jpg',
          caption: 'This is Cheddar the dog. #dog #puppy',
          likes: 1234,
          comments: [
              { username: 'floo', text: 'Nice post!' },
              { username: 'drilay', text: 'Looking good 👍' }
          ],
          time: '2 HOURS AGO',
          isLiked: false,
          isSaved: false
      },
      {
          id: 2,
          user: {
              username: 'mylod',
              image: 'https://mighty.tools/mockmind-api/content/human/65.jpg'
          },
          image: 'https://cdn.pixabay.com/photo/2025/03/19/19/40/square-9481441_640.jpg',
          caption: 'Abstract. #feature #painting',
          likes: 567,
          comments: [],
          time: '5 HOURS AGO',
          isLiked: false,
          isSaved: false
      },
      {
          id: 3,
          user: {
              username: 'floo',
              image: 'https://mighty.tools/mockmind-api/content/cartoon/23.jpg'
          },
          image: 'https://cdn.pixabay.com/photo/2023/09/02/12/25/mountains-8228434_640.jpg',
          caption: 'Beautiful mountains view from my hike today! #nature #hiking',
          likes: 892,
          comments: [
              { username: 'drilay', text: 'Amazing view!' },
              { username: 'lorde', text: 'Where is this?' }
          ],
          time: '1 DAY AGO',
          isLiked: true,
          isSaved: false
      }
  ];
  
  let suggestedUsers = [
      {
          username: 'floo',
          image: 'https://mighty.tools/mockmind-api/content/cartoon/23.jpg',
          relation: 'Followed by drilay',
          isFollowing: false
      },
      {
          username: 'drilay',
          image: 'https://mighty.tools/mockmind-api/content/cartoon/22.jpg',
          relation: 'New to SocialApp',
          isFollowing: false
      },
      {
          username: 'spweein',
          image: 'https://mighty.tools/mockmind-api/content/cartoon/31.jpg',
          relation: 'Followed by floo + 3 more',
          isFollowing: true
      },
      {
          username: 'lorde',
          image: 'https://mighty.tools/mockmind-api/content/human/85.jpg',
          relation: 'Followed by byte',
          isFollowing: false
      },
      {
          username: 'byte',
          image: 'https://mighty.tools/mockmind-api/content/human/102.jpg',
          relation: 'Suggested for you',
          isFollowing: false
      }
  ];
  
  let storiesData = [
      {
          username: 'floo',
          userImage: 'https://mighty.tools/mockmind-api/content/handdrawn/24.jpg',
          storyImage: 'https://cdn.pixabay.com/photo/2023/08/20/07/36/mountain-8202087_640.jpg'
      },
      {
          username: 'drilay',
          userImage: 'https://mighty.tools/mockmind-api/content/alien/18.jpg',
          storyImage: 'https://cdn.pixabay.com/photo/2023/09/04/10/06/street-8232360_640.jpg'
      },
      {
          username: 'lorde',
          userImage: 'https://mighty.tools/mockmind-api/content/human/85.jpg',
          storyImage: 'https://cdn.pixabay.com/photo/2023/08/27/12/40/waterfall-8216600_640.jpg'
      },
      {
          username: 'byte',
          userImage: 'https://mighty.tools/mockmind-api/content/human/102.jpg',
          storyImage: 'https://cdn.pixabay.com/photo/2023/08/31/04/51/ai-generated-8224461_640.jpg'
      }
  ];
  
  // Initialize the app
  function init() {
      renderPosts();
      renderSuggestedUsers();
      checkThemePreference();
      setupEventListeners();
  }
  
  // Render posts
  function renderPosts() {
      postsContainer.innerHTML = '';
      
      posts.forEach(post => {
          const postElement = document.createElement('article');
          postElement.className = 'post';
          postElement.dataset.id = post.id;
          
          postElement.innerHTML = `
              <div class="post-header">
                  <div class="post-user">
                      <img src="${post.user.image}" alt="${post.user.username}">
                      <span>${post.user.username}</span>
                  </div>
                  <button class="more-options"><i class="fas fa-ellipsis-h"></i></button>
              </div>
              <div class="post-image">
                  <img src="${post.image}" alt="Post">
              </div>
              <div class="post-actions">
                  <button class="like-btn ${post.isLiked ? 'liked' : ''}">
                      <i class="${post.isLiked ? 'fas' : 'far'} fa-heart"></i>
                  </button>
                  <button class="comment-btn"><i class="far fa-comment"></i></button>
                  <button class="share-btn"><i class="far fa-paper-plane"></i></button>
                  <button class="save-btn ${post.isSaved ? 'saved' : ''}">
                      <i class="far fa-bookmark"></i>
                  </button>
              </div>
              <div class="post-likes">
                  <span>${formatNumber(post.likes)} likes</span>
              </div>
              <div class="post-caption">
                  <span class="username">${post.user.username}</span>
                  <span>${post.caption}</span>
              </div>
              <div class="post-comments">
                  <span class="view-comments">View all ${post.comments.length} comments</span>
                  ${post.comments.slice(0, 2).map(comment => `
                      <div class="comment">
                          <span class="comment-user">${comment.username}</span>
                          <span>${comment.text}</span>
                      </div>
                  `).join('')}
              </div>
              <div class="post-time">
                  <span>${post.time}</span>
              </div>
              <div class="add-comment">
                  <input type="text" placeholder="Add a comment..." class="comment-input">
                  <button class="post-comment-btn" disabled>Post</button>
              </div>
          `;
          
          postsContainer.appendChild(postElement);
      });
  }
  
  // Render suggested users
  function renderSuggestedUsers() {
      suggestedUsersContainer.innerHTML = '';
      
      suggestedUsers.forEach(user => {
          const userElement = document.createElement('div');
          userElement.className = 'suggested-user';
          
          userElement.innerHTML = `
              <img src="${user.image}" alt="${user.username}">
              <div>
                  <span>${user.username}</span>
                  <span>${user.relation}</span>
              </div>
              <button class="follow-btn ${user.isFollowing ? 'following' : ''}">
                  ${user.isFollowing ? 'Following' : 'Follow'}
              </button>
          `;
          
          suggestedUsersContainer.appendChild(userElement);
      });
  }
  
  // Format large numbers
  function formatNumber(num) {
      if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
  }
  
  // Check user's theme preference
  function checkThemePreference() {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
          updateThemeIcon(savedTheme);
      } else if (prefersDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
          updateThemeIcon('dark');
      }
  }
  
  // Update theme toggle icon
  function updateThemeIcon(theme) {
      if (theme === 'dark') {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
  }
  
  // Toggle theme
  function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
  }
  
  // Setup event listeners
  function setupEventListeners() {
      // Theme toggle
      themeToggle.addEventListener('click', toggleTheme);
      
      // Create post buttons
      createPostBtn.addEventListener('click', () => showModal(createPostModal));
      createPostMobileBtn.addEventListener('click', () => showModal(createPostModal));
      
      // Close modals
      closeModalBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              document.querySelectorAll('.modal').forEach(modal => {
                  modal.classList.remove('active');
              });
          });
      });
      
      // Click outside modal to close
      document.querySelectorAll('.modal').forEach(modal => {
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  modal.classList.remove('active');
              }
          });
      });
      
      // File upload
      uploadArea.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', handleFileSelect);
      
      // Submit post
      submitPostBtn.addEventListener('click', createNewPost);
      
      // Post caption validation
      postCaption.addEventListener('input', () => {
          submitPostBtn.disabled = postCaption.value.trim() === '';
      });
      
      // Search functionality
      searchButton.addEventListener('click', performSearch);
      searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              performSearch();
          }
      });
      
      // Story click handlers
      stories.forEach((story, index) => {
          if (index > 0) { // Skip "Your Story"
              story.addEventListener('click', () => viewStory(index - 1));
          }
      });
      
      // Delegate events for dynamically created elements
      document.addEventListener('click', (e) => {
          // Like button
          if (e.target.closest('.like-btn') || e.target.classList.contains('fa-heart')) {
              const likeBtn = e.target.closest('.like-btn') || e.target.parentElement;
              const postElement = likeBtn.closest('.post');
              const postId = parseInt(postElement.dataset.id);
              toggleLike(postId, likeBtn);
          }
          
          // Save button
          if (e.target.closest('.save-btn') || e.target.classList.contains('fa-bookmark')) {
              const saveBtn = e.target.closest('.save-btn') || e.target.parentElement;
              const postElement = saveBtn.closest('.post');
              const postId = parseInt(postElement.dataset.id);
              toggleSave(postId, saveBtn);
          }
          
          // Follow button
          if (e.target.classList.contains('follow-btn')) {
              const followBtn = e.target;
              const userElement = followBtn.closest('.suggested-user');
              const username = userElement.querySelector('div span:first-child').textContent;
              toggleFollow(username, followBtn);
          }
          
          // Post comment
          if (e.target.classList.contains('post-comment-btn')) {
              const postCommentBtn = e.target;
              const postElement = postCommentBtn.closest('.post');
              const postId = parseInt(postElement.dataset.id);
              const commentInput = postElement.querySelector('.comment-input');
              addComment(postId, commentInput.value);
              commentInput.value = '';
              postCommentBtn.disabled = true;
          }
          
          // Comment input validation
          if (e.target.classList.contains('comment-input')) {
              const commentInput = e.target;
              const postCommentBtn = commentInput.nextElementSibling;
              postCommentBtn.disabled = commentInput.value.trim() === '';
          }
      });
  }
  
  // Show modal
  function showModal(modal) {
      modal.classList.add('active');
  }
  
  // Handle file selection
  function handleFileSelect(e) {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              previewImage.src = event.target.result;
              uploadArea.style.display = 'none';
              postPreview.style.display = 'flex';
          };
          reader.readAsDataURL(file);
      }
  }
  
  // Create new post
  function createNewPost() {
      const newPost = {
          id: posts.length + 1,
          user: {
              username: 'Motherboard',
              image: 'https://mighty.tools/mockmind-api/content/cartoon/11.jpg'
          },
          image: previewImage.src,
          caption: postCaption.value,
          likes: 0,
          comments: [],
          time: 'JUST NOW',
          isLiked: false,
          isSaved: false
      };
      
      posts.unshift(newPost);
      renderPosts();
      
      // Reset modal
      previewImage.src = '';
      postCaption.value = '';
      postPreview.style.display = 'none';
      uploadArea.style.display = 'flex';
      createPostModal.classList.remove('active');
      fileInput.value = '';
  }
  
  // Toggle like on post
  function toggleLike(postId, likeBtn) {
      const post = posts.find(p => p.id === postId);
      const heartIcon = likeBtn.querySelector('i');
      
      if (post.isLiked) {
          post.likes--;
          post.isLiked = false;
          likeBtn.classList.remove('liked');
          heartIcon.classList.replace('fas', 'far');
      } else {
          post.likes++;
          post.isLiked = true;
          likeBtn.classList.add('liked');
          heartIcon.classList.replace('far', 'fas');
          heartIcon.classList.add('fa-heart');
          heartIcon.style.animation = 'none';
          void heartIcon.offsetWidth; // Trigger reflow
          heartIcon.style.animation = 'heartBeat 0.8s';
      }
      
      // Update likes count
      const postElement = likeBtn.closest('.post');
      const likesCount = postElement.querySelector('.post-likes span');
      likesCount.textContent = `${formatNumber(post.likes)} likes`;
  }
  
  // Toggle save on post
  function toggleSave(postId, saveBtn) {
      const post = posts.find(p => p.id === postId);
      const bookmarkIcon = saveBtn.querySelector('i');
      
      if (post.isSaved) {
          post.isSaved = false;
          saveBtn.classList.remove('saved');
          bookmarkIcon.classList.replace('fas', 'far');
      } else {
          post.isSaved = true;
          saveBtn.classList.add('saved');
          bookmarkIcon.classList.replace('far', 'fas');
      }
  }
  
  // Toggle follow user
  function toggleFollow(username, followBtn) {
      const user = suggestedUsers.find(u => u.username === username);
      
      if (user.isFollowing) {
          user.isFollowing = false;
          followBtn.textContent = 'Follow';
          followBtn.classList.remove('following');
      } else {
          user.isFollowing = true;
          followBtn.textContent = 'Following';
          followBtn.classList.add('following');
      }
  }
  
  // Add comment to post
  function addComment(postId, commentText) {
      if (commentText.trim() === '') return;
      
      const post = posts.find(p => p.id === postId);
      post.comments.unshift({
          username: 'Motherboard',
          text: commentText
      });
      
      // Update comments count
      const postElement = document.querySelector(`.post[data-id="${postId}"]`);
      const commentsCount = postElement.querySelector('.view-comments');
      commentsCount.textContent = `View all ${post.comments.length} comments`;
      
      // Add new comment to the top
      const commentsContainer = postElement.querySelector('.post-comments');
      const newComment = document.createElement('div');
      newComment.className = 'comment';
      newComment.innerHTML = `
          <span class="comment-user">Motherboard</span>
          <span>${commentText}</span>
      `;
      
      // Insert after the view comments link
      commentsContainer.insertBefore(newComment, commentsContainer.children[1]);
  }
  
  // Perform search
  function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (query === '') return;
      
      alert(`Searching for: ${query}`);
      // In a real app, you would make an API call here
  }
  
  // View story
  function viewStory(index) {
      const story = storiesData[index];
      storyUserImage.src = story.userImage;
      storyUsername.textContent = story.username;
      storyImage.src = story.storyImage;
      showModal(storyViewerModal);
  }
  
  // Initialize the app
  init();
});