var trash = document.getElementsByClassName("bi-trash"); // Select the Trash Icon.
var thumbUp = document.getElementsByClassName("bi-check-circle"); // Select the check icon

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        let title = this.parentNode.parentNode.childNodes[1].innerText

        fetch('deleteAttraction', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'Title': title
          })
        }).then(function (response) {
          if (response.ok) return response.json()


          // window.location.reload()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
          })
      });
});

Array.from(thumbUp).forEach(function(element) {
    element.addEventListener('click', function(){
      let title = this.parentNode.parentNode.childNodes[1].innerText

      fetch('updateComplete', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'Title': title,
          'true': "true"
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
    });
});
