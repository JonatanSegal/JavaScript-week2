//https://jsonplaceholder.typicode.com/users

document.getElementById("btn-get-all").onclick = getAllUsers

function getAllUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
            const rows = data.map(u=>`
            <tr>
                <td>${encode(u.name)} </td>
                <td>${encode(u.phone)} </td>
                <td>${encode(u.address.street)} </td>
                <td>${encode(u.address.city)} </td>
            </tr>
            `).join("\n")
            document.getElementById("tbl-body").innerHTML = rows;
        })
        .catch(err =>console.error("Ups"+err))
}
/**
 * The encoder method we have used when inserting untrusted data via the innerHTML property
 * Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * @param {str} str
 * @returns the encode string
 */
export function encode(str) {
    let encoded = "" + str
    encoded = encoded.replace(/&/g, "&amp;");
    encoded = encoded.replace(/>/g, "&gt;");
    encoded = encoded.replace(/</g, "&lt;");
    encoded = encoded.replace(/"/g, "&quot;");
    encoded = encoded.replace(/'/g, "&#039;");
    return encoded;
}


document.getElementById("Get-user").onclick = getUser

function getUser(){
    const inputID = document.getElementById("Single-user-input").value
    fetch("https://jsonplaceholder.typicode.com/users/"+inputID)
        .then(res => {
            if(!res.ok){
                return Promise.reject("Error: "+res.status + " Could not fetch user")
            }
            return res.json()
        })
        .then(data => {
            document.getElementById("id-name").innerText = data.name
            document.getElementById("id-phone").innerText = data.phone
            document.getElementById("id-street").innerText = data.address.street
            document.getElementById("id-city").innerText = data.address.city
        })
        .catch(err =>{
            document.getElementById("error").innerText = err
        })
        .finally(e => console.log("Finally done"))

}

/*
const options = {
    method : "POST",
    headers : {
        "Content-type" : "application/json",
        "Accept" : "application/json"
    },
    body : JSON.stringify({
        name: "Eric"
    })

}
fetch("https://jsonplaceholder.typicode.com/users",options)
    .then(res => {
        console.log(res.status)
        return res.json()
    })
    .then(data => console.log(data))
    .catch(err => console.log("UPPS:" + err))
    .finally(()=> console.log("Done"))

 */

/*
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        if(!res.ok){
            return Promise.reject("Error :"+res.status)
        }
    console.log(res.status)
    console.log(res.ok)
    return res.json()
})
    .then(data => console.log(data))
    .catch(err =>console.error("Ups"+err))
    .finally(e => console.log("Finally done"))

 */
