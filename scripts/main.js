document.addEventListener('DOMContentLoaded', function() {
  // Enhanced like button functionality
  const likeButtons = document.querySelectorAll('.post-actions button:first-child');
  likeButtons.forEach(button => {
      button.addEventListener('click', function() {
          const icon = this.querySelector('i');
          const likesCounter = this.closest('.post').querySelector('.post-likes span');
          let currentLikes = parseInt(likesCounter.textContent.replace(/,/g, ''));
          
          if (icon.classList.contains('far')) {
              icon.classList.remove('far');
              icon.classList.add('fas');
              icon.style.color = '#ed4956';
              currentLikes += 1;
          } else {
              icon.classList.remove('fas');
              icon.classList.add('far');
              icon.style.color = '';
              currentLikes -= 1;
          }
          
          likesCounter.textContent = currentLikes.toLocaleString() + ' likes';
      });
  });

  // Double tap to like on post images
  const postImages = document.querySelectorAll('.post-image img');
  postImages.forEach(image => {
      let lastTap = 0;
      image.addEventListener('click', function(e) {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          
          if (tapLength < 300 && tapLength > 0) {
              // Double tap detected
              const post = this.closest('.post');
              const likeButton = post.querySelector('.post-actions button:first-child');
              const icon = likeButton.querySelector('i');
              const likesCounter = post.querySelector('.post-likes span');
              let currentLikes = parseInt(likesCounter.textContent.replace(/,/g, ''));
              
              if (icon.classList.contains('far')) {
                  icon.classList.remove('far');
                  icon.classList.add('fas');
                  icon.style.color = '#ed4956';
                  currentLikes += 1;
                  
                  // Create temporary heart animation
                  const heart = document.createElement('div');
                  heart.innerHTML = '<i class="fas fa-heart" style="font-size: 80px; color: white; position: absolute; opacity: 0.8;"></i>';
                  heart.style.position = 'absolute';
                  heart.style.top = `${e.clientY - 40}px`;
                  heart.style.left = `${e.clientX - 40}px`;
                  heart.style.pointerEvents = 'none';
                  heart.style.zIndex = '1000';
                  document.body.appendChild(heart);
                  
                  setTimeout(() => {
                      heart.style.transform = 'scale(1.5)';
                      heart.style.opacity = '0';
                      setTimeout(() => heart.remove(), 300);
                  }, 50);
              }
              
              likesCounter.textContent = currentLikes.toLocaleString() + ' likes';
          }
          
          lastTap = currentTime;
      });
  });

  // Save button functionality
  const saveButtons = document.querySelectorAll('.post-actions .save');
  saveButtons.forEach(button => {
      button.addEventListener('click', function() {
          const icon = this.querySelector('i');
          if (icon.classList.contains('far')) {
              icon.classList.remove('far');
              icon.classList.add('fas');
              this.style.transform = 'scale(1.2)';
              setTimeout(() => {
                  this.style.transform = 'scale(1)';
              }, 300);
          } else {
              icon.classList.remove('fas');
              icon.classList.add('far');
          }
      });
  });

  // Enhanced comment functionality
  const commentInputs = document.querySelectorAll('.add-comment input');
  commentInputs.forEach(input => {
      const button = input.nextElementSibling;
      
      input.addEventListener('input', function() {
          if (this.value.trim() !== '') {
              button.style.opacity = '1';
              button.style.fontWeight = '600';
          } else {
              button.style.opacity = '0.3';
              button.style.fontWeight = '400';
          }
      });
      
      // Add Enter key functionality
      input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter' && this.value.trim() !== '') {
              addComment(this);
          }
      });
      
      button.addEventListener('click', function() {
          if (input.value.trim() !== '') {
              addComment(input);
          }
      });
      
      function addComment(inputElement) {
          const commentsSection = inputElement.closest('.post').querySelector('.post-comments');
          const newComment = document.createElement('div');
          newComment.className = 'comment';
          newComment.innerHTML = `<span class="comment-user">your_username</span><span>${inputElement.value}</span>`;
          
          // Add fade-in animation
          newComment.style.opacity = '0';
          newComment.style.transform = 'translateY(10px)';
          newComment.style.transition = 'all 0.3s ease';
          
          commentsSection.appendChild(newComment);
          
          // Trigger animation
          setTimeout(() => {
              newComment.style.opacity = '1';
              newComment.style.transform = 'translateY(0)';
          }, 10);
          
          inputElement.value = '';
          button.style.opacity = '0.3';
          button.style.fontWeight = '400';
      }
  });

  // Smooth follow button transition
  const followButtons = document.querySelectorAll('.suggested-user button');
  followButtons.forEach(button => {
      button.addEventListener('click', function() {
          if (this.textContent === 'Follow') {
              this.textContent = 'Following';
              this.style.color = '#262626';
              this.style.fontWeight = '600';
              this.style.backgroundColor = '#efefef';
              this.style.padding = '4px 8px';
              this.style.borderRadius = '4px';
          } else {
              this.textContent = 'Follow';
              this.style.color = '#0095f6';
              this.style.fontWeight = '600';
              this.style.backgroundColor = 'transparent';
              this.style.padding = '0';
          }
      });
  });

  // Mobile menu toggle (placeholder for future functionality)
  console.log('Enhanced SocialApp loaded successfully!');
});