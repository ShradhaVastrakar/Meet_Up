
const onSignUp = () => {
    // e.preventDefault();
    const payload = {
        name: document.querySelector("#signup-name").value,
        email: document.querySelector("#signup-email").value,
        pass: document.querySelector("#signup-pass").value
    }
// console.log(payload)
    fetch("http://localhost:6120/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            alert(res.msg)
        })
        .catch((err) => console.log(err))

}