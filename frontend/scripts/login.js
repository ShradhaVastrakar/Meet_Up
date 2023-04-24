

const onLogin = () => {
    let payload = {
        email: document.querySelector("#login-email").value,
        pass: document.querySelector("#login-pass").value
    }
    // console.log(payload)
  
    fetch("http://localhost:6120/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload),

    }).then(res => res.json())
        .then(res => {
            console.log(res)
            alert(res.msg)
            if(res.msg == "Login Successful"){
               setTimeout(() => {
                window.location.href = "lobby.html"
            }, 2000)
            }
           
        })
        .catch((err) => 
        console.log(err)
        )


}