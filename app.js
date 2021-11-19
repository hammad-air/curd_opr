// User Creation
function userCreate() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let address = document.getElementById("address").value
    axios.post('https://todo-appcs.herokuapp.com/user', {
        name, email, address
    })
        .then(function (response) {
            console.log(response);

            document.getElementById("name").value = ""

            getAllUser()

            document.getElementById("alert").innerHTML =
                `<br> <div class="alert alert-secondary" role="alert">
                    User Created Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })

        document.getElementById("name").value = ""
     document.getElementById("email").value = ""
       document.getElementById("address").value = ""

}

// GET ALL USER 
function getAllUser() {

    axios.get('https://todo-appcs.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            users = response.data;

            document.getElementById("tableBody").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("tableBody").innerHTML +=
                    `<tr id="${eachUser._id}">
                        <th scope="row">${eachUser._id}</th>
                        <td>${eachUser.name}</td>
                        <td>${eachUser.email}</td>
                        <td>${eachUser.address}</td>
                        <td>
                        <button id="btone" type="button" onclick="editUser('${eachUser._id}', ${index})" class="btn btn-primary"><i>Edit</i></button>
                        <button id="bttwo" type="button" onclick="deleteUser('${eachUser._id}')" class="btn btn-danger"><i>Delete</i></button>
                        </td>
                        </tr>`
            })
        })

}

// EDIT USER 

function editUser(_id, index) {
    console.log(_id, index);

    const userObject = users[index]

    console.log("userObject: ", userObject);

    document.getElementById(_id).innerHTML = `
    <tr id="${_id}"> 
        
            <th scope="row">${_id}</th>
            <td><input type="text" id="${_id}-name" value="${userObject.name}" /></td>
            <td><input type="text" id="${_id}-email" value="${userObject.email}" /></td>
            <td><input type="text" id="${_id}-address" value="${userObject.address}" /></td>
            <td>
                <button type="button" onclick="updateUser('${_id}')" class="btn btn-success">Update</button>
            </td>
        </tr>`;
}

// DELETE USER 
function deleteUser(_id) {
    

    axios.delete(`https://todo-appcs.herokuapp.com/user/${_id}`)
        .then(function (response) {
            console.log(response);

            getAllUser();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-danger" role="alert">
                    User Deleted Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })
}
getAllUser();
// UPDATE USER 
function updateUser(_id) {

    const name = document.getElementById(`${_id}-name`).value
    const email = document.getElementById(`${_id}-email`).value
    const address = document.getElementById(`${_id}-address`).value

    axios.put(`https://todo-appcs.herokuapp.com/user/${_id}`, { name, email, address })
        .then(function (response) {
            console.log(response);

            getAllUser();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-success" role="alert">
                    User Updated Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })
}

getAllUser();