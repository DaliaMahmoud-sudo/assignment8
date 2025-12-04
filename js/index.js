var contactName = document.getElementById("contactName");
var contactNo = document.getElementById("contactNo");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactEmergency = document.getElementById("contactEmergency");
var contactFavorite = document.getElementById("contactFavorite");
var contactNotes = document.getElementById("contactNotes");
var contactImage = document.getElementById("contactImage");

var saveBtn = document.getElementById("saveBtn");
var updateBtn = document.getElementById("updateBtn");
var rowData = document.getElementById("rowData");
var favouriteData = document.getElementById("favouriteData");
var emergencyData = document.getElementById("emergencyData");
var form = document.getElementById("modalOverlay");
var total = document.getElementById("total");
var rawEmergency = document.getElementById("rawEmergency");
var fav = document.getElementById("fav");
var aboveSearch = document.getElementById("aboveSearch");
var contactDelete = document.getElementById("modelDelete");

var contactList = JSON.parse(localStorage.getItem("contact")) || [];
displayAll();

function openModal() {
  form.classList.remove("d-none");
}
function closeModal() {
  form.classList.add("d-none");
}
var contactIndex;
function openDelete(index) {
  contactIndex = index;
  contactDelete.classList.remove("d-none");
}
function closeDelete() {
  contactDelete.classList.add("d-none");
}

function addContact() {
  if(validateAll(contactName)&& validateAll(contactNo) && validateAll(contactEmail)){
    var newContact = {
      nameContact: contactName.value,
      number: contactNo.value,
      email: contactEmail.value,
      address: contactAddress.value,
      group: contactGroup.value,
      notes: contactNotes.value,
      image:contactImage.files[0].name
    ? `images/${contactImage.files[0].name}`
    :  null ,
    };

    newContact.emergency = contactEmergency.checked;
    newContact.favorite = contactFavorite.checked;

    contactList.push(newContact);

    localStorage.setItem("contact", JSON.stringify(contactList));

    clear();
    closeModal();
    Swal.fire({
      title: "Added!",
      text: "You added this contact successfully!",
      icon: "success",
    });
  }
}

function clear() {
  contactName.value = "";
  contactNo.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactEmergency.value = "";
  contactFavorite.value = "";
  contactNotes.value = "";

  contactName.classList.remove("is-valid");
  contactNo.classList.remove("is-valid");
  contactEmail.classList.remove("is-valid");

}

function displayAll(element) {
  var text = element ? element.value : "";
  var box = "";
  var favouriteBox = "";
  var emergencyBox = "";
  var favouriteCounter = 0;
  var emergencyCounter = 0;

  total.innerHTML = contactList.length;
  aboveSearch.innerHTML = `Manage and organize your ${contactList.length} contacts`;

  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].nameContact.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].email.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].number.includes(text)
    ) {
      box += `<div class="col-md-6">
                                <div class="inner   rounded-4 p-4 pb-1 card ">
                                    <div class="d-flex align-items-center justify-content-start gap-4 mb-2">
                                        <div class="position-relative  ">
                                        ${contactList[i].image==null?
                                            `<p
                                                class=" bg-indigo text-white p-2 fs-4 pe-auto rounded-3 litter text-center ">
                                                ${contactList[i].nameContact[0]}
                                            </p>` : `<p
                                                class=" p-2  pe-auto rounded-3 " style="width:80px;" >
                                                <img  src=${contactList[i].image} class="card-img-top w-100 rounded-3" alt="...">
                                            </p>`}
                                       ${
                                         contactList[i].emergency
                                           ? `
                                            <span
                                                class="text-white bg-danger p-1 rounded-circle position-absolute bottom-0 end-0 litter-icon fa-xs">
                                                <i class="fa-solid fa-heart-pulse "></i></span>`
                                           : ""
                                       }
                                       ${
                                         contactList[i].favorite
                                           ? `     
                                            <span
                                                class="text-white bg-warning p-1 rounded-circle position-absolute top-0 end-0 litter-icon fa-xs">
                                                <i class="fa-solid fa-star "></i></span>`
                                           : ""
                                       }
                                        </div>

                                        <div class="info ">
                                            <div class="h6">${
                                              contactList[i].nameContact
                                            }</div>
                                            <p class="basic-color small-font"><span
                                                    class="text-primary bg-info-subtle text-bg-light p-1 rounded-2"><i
                                                        class="fa-solid fa-phone "></i></span>${
                                                          contactList[i].number
                                                        }</p>
                                        </div>
                                    </div>
                                    <p class="basic-color"><span
                                            class="main-color bg-info-subtle p-1 rounded-2 small-font"><i
                                                class="fa-solid fa-envelope"></i></span> ${
                                                  contactList[i].email
                                                }</p>
                                    <p class="basic-color"><span
                                            class="text-success bg-info-subtle p-1 rounded-2 .small-font"><i
                                                class="fa-solid fa-location-dot"></i></span> ${
                                                  contactList[i].address
                                                }</p>
                                    <div class="d-flex gap-2">
                                         <p class="text-success bg-success-subtle px-2 rounded-pill emergency small-font">
                                        ${contactList[i].group}
                                    </p> ${
                                      contactList[i].emergency
                                        ? `
                                    <p class="text-danger bg-danger-subtle px-2 rounded-pill emergency small-font">
                                        <span><i class="fa-solid fa-heart-pulse "></i></span> Emergency
                                    </p>`
                                        : ""
                                    }
                                    ${
                                      contactList[i].favorite
                                        ? `
                                    <p class="text-warning bg-warning-subtle px-2 rounded-pill emergency small-font">
                                        <span><i class="fa-solid fa-star "></i></span> favourite
                                    </p>`
                                        : ""
                                    }
                                    </div>
                                    <!-- <hr class="mt-5 "> -->
                                    <div
                                        class="card-footer d-flex justify-content-between align-items-center mt-3 bg-white">

                                        <div class="left-footer mt-2">

                                            <a
                                                class="text-success bg-info-subtle text-bg-light p-1 rounded-2 me-1" href="tel:${
                                                  contactList[i].number
                                                }"><i
                                                    class="fa-solid fa-phone "></i></a>
                                            <a class="main-color bg-info-subtle p-1 rounded-2" href="mailto:${
                                              contactList[i].email
                                            }" ><i
                                                    class="fa-solid fa-envelope"></i></a>
                                        </div>
                                        <div class="right-footer basic-color  mt-2">
                                        ${
                                          contactList[i].favorite
                                            ? `
                                            <span class="basic-color text-warning bg-warning-subtle rounded-2 p-1"  onclick="changeFavourite(${i})"><i class="fa-solid fa-star"></i></span>`
                                            : `<span class="basic-color" onclick="changeFavourite(${i})"><i class="fa-regular fa-star" ></i></span>`
                                        }
                                        ${
                                          contactList[i].emergency
                                            ? `<span class="text-danger bg-danger-subtle rounded-2 p-1 mx-3" onclick="changeEmergency(${i})"><i
                                                    class="fa-solid fa-heart-pulse "></i></span>`
                                            : `<span class="basic-color rounded-2 p-1 mx-3" onclick="changeEmergency(${i})"><i
                                                    class="fa-solid fa-heart-pulse "></i></span>`
                                        }
                                            <span><i class="fa-solid fa-pen me-3 " onclick="updateContact(${i})"></i></span>
                                            <span><i class="fa-solid fa-trash" onclick="openDelete(${i})"></i></span>

                                        </div>
                                    </div>
                                </div>
                            </div>`;
    
    if (contactList[i].favorite) {
      favouriteCounter++;
      favouriteBox += ` <div class="d-flex align-items-center justify-content-between p-3 pb-0 bg-white rounded-bottom-3 " >
                                    <div class="d-flex align-items-center">
                                    ${contactList[i].image==null?`
                                        <span class="text-white bg-indigo me-2 rounded-3 p-2 mb-3">${contactList[i].nameContact[0]}</span>`:
                                      `<span class=" me-2 rounded-3 p-2 mb-3 w-25"><img  src=${contactList[i].image} class="card-img-top w-100 rounded-3" alt="..."></span>`}
                                        <div>
                                            <p class="mb-0">
                                                ${contactList[i].nameContact} </p>
                                            <p class="basic-color small-font"> ${contactList[i].number}</p>
                                        </div>
                                    </div>
                                    <span
                                        class="text-success bg-info-subtle text-bg-light p-2 fs-5 rounded-2 me-1 mb-3"><i
                                            class="fa-solid fa-phone "></i></span>

                                </div>`;
    }

    if (contactList[i].emergency) {
      emergencyCounter++;
      emergencyBox += `                   <div
                                    class="d-flex align-items-center justify-content-between p-3 pb-0 bg-white rounded-bottom-3 ">
                                    <div class="d-flex align-items-center">
                                    ${contactList[i].image==null?`
                                        <span class="text-white bg-indigo me-2 rounded-3 p-2 mb-3">${contactList[i].nameContact[0]}</span>`:
                                      `<span class=" me-2 rounded-3 p-2 mb-3 w-25"><img  src=${contactList[i].image} class="card-img-top w-100 rounded-3" alt="..."></span>`}
                                        <div>
                                            <p class="mb-0">
                                                  ${contactList[i].nameContact} </p>
                                            <p class="basic-color small-font">${contactList[i].number}</p>
                                        </div>
                                    </div>
                                    <span class="text-danger bg-danger-subtle  p-2 fs-5 rounded-2 me-1 mb-3"><i
                                            class="fa-solid fa-phone "></i></span>

                                </div>`}
    }
  }  

  fav.innerHTML = favouriteCounter;
  rawEmergency.innerHTML = emergencyCounter;
  rowData.innerHTML = box;
  favouriteData.innerHTML = favouriteBox;
  emergencyData.innerHTML = emergencyBox;
}

function deleteContact() {
  contactList.splice(contactIndex, 1);
  localStorage.setItem("contact", JSON.stringify(contactList));
  displayAll();
  closeDelete();
  Swal.fire({
    title: "Deleted!",
    text: "You deleted this contact successfully!",
    icon: "success",
  });
}

function updateContact(index) {
  contactIndex = index;
  contactName.value = contactList[index].nameContact;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  contactGroup.value = contactList[index].group;
  contactNotes.value = contactList[index].notes;
  contactNo.value = contactList[index].number;
  contactEmergency.value = contactList[index].emergency;
  contactFavorite.value = contactList[index].favorite;

  openModal();
  saveBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateThisContact() {
  contactList[contactIndex].nameContact = contactName.value;
  contactList[contactIndex].number = contactNo.value;
  contactList[contactIndex].email = contactEmail.value;
  contactList[contactIndex].address = contactAddress.value;
  contactList[contactIndex].group = contactGroup.value;
  contactList[contactIndex].notes = contactNotes.value;
  contactList[contactIndex].emergency = contactEmergency.value;
  contactList[contactIndex].favorite = contactFavorite.value;

  contactList.splice(contactIndex, 0);
  localStorage.setItem("contact", JSON.stringify(contactList));
  displayAll();
  clear();
  closeModal();
  saveBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function changeFavourite(index) {
  contactList[index].favorite = !contactList[index].favorite;
  contactList.splice(index, 0);
  localStorage.setItem("contact", JSON.stringify(contactList));
  displayAll();
}

function changeEmergency(index) {
  contactList[index].emergency = !contactList[index].emergency;
  contactList.splice(index, 0);
  localStorage.setItem("contact", JSON.stringify(contactList));
  displayAll();
}
function validateAll(element) {
  var text = element.value;
  var regex = {
    contactName: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
    contactNo: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    contactEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    // contactGroup: /^Family|Friends|Work|School|Other$/i,
    // contactImage: /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
