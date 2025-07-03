console.log('hi');
let empTable = document.getElementById('employeeTable');
let handleSubmitBtn = document.getElementById('submitBtn');

handleSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let userName = document.getElementById('name').value;
    let userProf = document.getElementById('profession').value;
    let userAge = document.getElementById('age').value;
    var id = "id" + Math.random().toString(16).slice(2);
    let resultArr = [];

    // console.log(userName, userProf, userAge);

    if(userName.trim() === '' || userProf.trim() === ''  || userAge.trim() === '' ) {
        document.getElementById('notification').innerHTML = '<p style="color: red" >Error : Please make sure all the fields are filled before adding an employee!</p>'
        setTimeout(() => {
          document.getElementById('notification').innerHTML = '';
        }, 5000);
    } else {
        let localData = JSON.parse(localStorage.getItem("empData"));
        resultArr.push({ _id: id, name: userName, profession: userProf, age: userAge });

        if (localData) {
            localStorage.setItem("empData", JSON.stringify([...localData, ...resultArr]));
        } else {
            localStorage.setItem("empData", JSON.stringify([...resultArr]));
        }

          document.getElementById('notification').innerHTML = '<p style="color: green" > Success: Employee Added!</p>'
        setTimeout(() => {
          document.getElementById('notification').innerHTML = '';
        }, 5000);

    }

    createTable();

    document.getElementById('name').value = ''
    document.getElementById('profession').value = ''
    document.getElementById('age').value = ''

})

function handleDelete(id) {
  let resultData = JSON.parse(localStorage.getItem("empData"));

  let res = resultData.filter((val) => val._id !== id);
  localStorage.setItem("empData", JSON.stringify(res));
  createTable();
  
}

function createTable() {
  let resultData = JSON.parse(localStorage.getItem("empData")) || [];

  if (resultData.length > 0) {
    empTable.innerHTML = resultData.map((val, i) => {
      return `
            <div id="para">
            <p>${val.name}</p>
            <p>${val.profession}</p>
            <p>${val.age}</p>
            <button class="small-button" onclick="handleDelete('${val._id}')" >Delete</button>
            </div>
    `;
    });
  } else {
    empTable.innerHTML = `<div class="no_employees" >You have 0 employees</div>`;
  }
}

createTable();


