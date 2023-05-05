

const onLogin = () => {
    let payload = {
        email: document.querySelector("#login-email").value,
        pass: document.querySelector("#login-pass").value
    }
    // console.log(payload)
    if(payload.email == "" || payload.pass == ""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill all the details....',
          footer: '<a href="">Why do I have this issue?</a>'
        })
  
         return;
      }
  
    fetch("https://enthusiastic-attire-tuna.cyclic.app/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload),

    }).then(res => res.json())
        .then(res => {
            console.log(res)
            Swal.fire(
                'login successful🤩',
                'You clicked the button!',
                'success'
              )
              
            if(res.msg == "Login Successful"){
               setTimeout(() => {
                window.location.href = "lobby.html"
            }, 2000)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
                  
            }
           
        })
        .catch((err) => 
        console.log(err)
        )


}