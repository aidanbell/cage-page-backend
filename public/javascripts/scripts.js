document.querySelectorAll('.box-title').forEach(function (box) {
  box.addEventListener('click', function (e) {
    e.currentTarget.nextElementSibling.classList.toggle('hidden');
    e.currentTarget.parentElement.classList.toggle('hoverable');
  });
})

hljs.highlightAll();