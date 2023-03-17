//ongoing
const modalog = document.getElementById("ongoing-modal");

document.getElementById("ongoing-btn").onclick = function () {
    modalog.style.display = "block";
}

document.getElementsByClassName("close1")[0].onclick = function () {
    modalog.style.display = "none";
    ogmodal_clear();
}


//complete

const modalcp = document.getElementById("complete-modal");

document.getElementById("complete-btn").onclick = function () {
    modalcp.style.display = "block";
}

document.getElementsByClassName("close2")[0].onclick = function () {
    modalcp.style.display = "none";
    cpmodal_clear();
}


//add

const modaladd = document.getElementById("add-modal");

document.getElementById("addbook").onclick = function () {
    modaladd.style.display = "block";
}

document.getElementById("modal-cancel").onclick = function () {
    modaladd.style.display = "none";
}

//edit

const modaledit = document.getElementById("edit-modal");

// document.getElementById("addbook").onclick = function () {
//     modaladd.style.display = "block";
// }

document.getElementById("modal-cancel-edit").onclick = function () {
    modaledit.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modalcp) {
        modalcp.style.display = "none";
        cpmodal_clear();
    } else if (event.target == modalog) {
        modalog.style.display = "none";
        ogmodal_clear();
    } else if (event.target == modaladd) {
        modaladd.style.display = "none";
    } else if (event.target == modaledit) {
        modaledit.style.display = "none";
    }
}

function checksearch() {
    const input = document.getElementById("searchx");

    if (input.value == "") {
        input.style.width = "80px";

    } else {
        input.style.width = "350px";
    }
}

function checksearch2() {
    const input = document.getElementById("searchx");
    input.style.width = "350px";
}

function onmouse1() {
    const input = document.getElementById("searchx");
    input.style.width = "350px";
}
function onmouse2() {
    const input = document.getElementById("searchx");

    if (input.value == "") {
        input.style.width = "80px";

    } else {
        input.style.width = "350px";
    }
}


//inputer book
const bookname = document.getElementById("book-name");
const writer = document.getElementById("writer");
const year = document.getElementById("year");

const iscomp = document.getElementById("isComplete");

const ogitems = document.getElementById("ogitems");
const oggrid = document.getElementById("grid-og");

const cpitems = document.getElementById("cpitems");
const cpgrid = document.getElementById("grid-cp");

const RENDER_EVENT = 'render-book';
const SEARCH_EVENT = 'search-book';




document.addEventListener('DOMContentLoaded', function () {
    if (isStorageExist()) {
        loadDataFromStorage();
    }
    console.log("Project Dicoding 'Belajar Membuat Front-End Web untuk Pemula' |  Rayhan Febriyan Saputra  | Bookshelf Apps");
});


document.getElementById('searchx').addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // Trigger the button element with a click
        search();
    }

});


let maindata = [];
let searchdata = [];
const localkey = "books";
let editindex;
function addbook() {
    let read = false;
    if ((bookname.value != "") || (writer.value != "") || (year.value != "")) {

        if (iscomp.checked == true) {
            read = true;
        } else {
            read = false;
        }
        if (localStorage.getItem(localkey) == null) {
            let DataObj = generateObject(+new Date(), bookname.value, writer.value, year.value, read);
            maindata.push(DataObj);
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
            addmodal_clear();

        } else {
            let DataObj = generateObject(+new Date(), bookname.value, writer.value, year.value, read);
            maindata.push(DataObj);
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
            addmodal_clear();
        }
    } else {
        alert("Your Browser Not Support Storage")
    }
}

function generateObject(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete
    }
}

function saveData() {
    const parse = JSON.stringify(maindata);
    localStorage.setItem(localkey, parse);
    // document.dispatchEvent(new Event(SAVED_EVENT));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(localkey);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const todo of data) {
            maindata.push(todo);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, () => {
    ogitems.innerHTML = '';
    oggrid.innerHTML = '';
    cpgrid.innerHTML = '';
    cpitems.innerHTML = '';

    elbuilder(maindata);


});
document.addEventListener(SEARCH_EVENT, () => {
    ogitems.innerHTML = '';
    oggrid.innerHTML = '';
    cpgrid.innerHTML = '';
    cpitems.innerHTML = '';

    elbuilder(searchdata);


});

function elbuilder(thedata) {
    let og = 0;
    let cp = 0;
    thedata.forEach(data => {
        if (data.isComplete == false) {
            if (og < 10) {

                ogitems.innerHTML += `
                <div class="item"  onmouseover='showdetailitem(${data.id}, this)'>
                            <div class="item-blurr">
                            <div class="item-blur-top">
    
                            <div class="check-box box-ctrl" title="Complete" onclick='adToComplete(${data.id})'>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div class="delete-box box-ctrl" title="Delete">
                                <i class="fa-solid fa-trash" title="Delete"></i>
                            </div>
                            </div>
                            <div class="item-blur-mid">
                            <div class="edit-box box-ctrl" title="Edit" onclick="editbook(${data.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            </div>
                            </div>
                            <img src="Assets/thebook.jpg" alt="">
                            <div class="img-caption s-caption">
                                <h3>${data.title}</h3>
                            </div>
                        </div>
                `;
            }
            oggrid.innerHTML += `
            <div class="grid-item">
                            <div class="items">
                                <div class="item item-bymodal" onmouseover="showdetailitemmodalog(${data.id}, this)">
                                    <div class="item-blurr">
                                    <div class="item-blur-top">
    
                                    <div class="check-box box-ctrl" title="Complete" onclick='adToComplete(${data.id})'>
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    <div class="delete-box box-ctrl" title="Delete">
                                        <i class="fa-solid fa-trash" title="Delete"></i>
                                    </div>
                                    </div>
                                    <div class="item-blur-mid">
                            <div class="edit-box box-ctrl" title="Edit" onclick="editbook(${data.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            </div>
                                    </div>
                                    <img src="Assets/thebook.jpg" alt="">
                                    <div class="img-caption s-caption">
                                        <h3>${data.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
            og++;
        } else {
            if (cp < 10) {
                cpitems.innerHTML += `
                <div class="item" onmouseover='showdetailitem(${data.id}, this)'>
                <div class="item-blurr">
                <div class="item-blur-top">
                <div class="restore-box box-ctrl" title="Restore" onclick='restoredata(${data.id})'>
                <i class="fa-solid fa-arrow-rotate-left"></i>
                    </div>
                    <div class="delete-box box-ctrl">
                        <i class="fa-solid fa-trash" title="Delete"></i>
                    </div>
                    </div>
                    <div class="item-blur-mid">
                    <div class="edit-box box-ctrl" title="Edit" onclick="editbook(${data.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    </div>
                </div>
                <img src="Assets/thebook.jpg" alt="">
                <div class="img-caption s-caption">
                    <h3>${data.title}</h3>
                </div>
                </div>
                `;
            }

            cpgrid.innerHTML += `
            <div class="grid-item">
                            <div class="items">
                                <div class="item item-bymodal" onmouseover="showdetailitemmodalcp(${data.id}, this)">
                                    <div class="item-blurr">
                                    <div class="item-blur-top">
                                    <div class="restore-box box-ctrl" title="Restore" onclick='restoredata(${data.id})'>
                                    <i class="fa-solid fa-arrow-rotate-left"></i>
                                        </div>
                                        <div class="delete-box box-ctrl">
                                            <i class="fa-solid fa-trash" title="Delete"></i>
                                        </div>
                                        </div>
                                        <div class="item-blur-mid">
                    <div class="edit-box box-ctrl" title="Edit" onclick="editbook(${data.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    </div>
                                    </div>
                                    <img src="Assets/thebook.jpg" alt="">
                                    <div class="img-caption s-caption">
                                        <h3>${data.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
            cp++;

        }
    })
}

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Your Browser Not Supported Storage');
        return false;
    }
    return true;
}


function editbook(id) {
    let target = finddataIndex(id);
    editindex = target
    modaledit.style.display = "block";
    document.getElementById("book-name-edit").value = maindata[target].title;
    document.getElementById("writer-edit").value = maindata[target].author;
    document.getElementById("year-edit").value = maindata[target].year;
    document.getElementById("isComplete-edit").checked = maindata[target].isComplete;

}


function editbookvalue() {
    let read = false;
    let booknamex = document.getElementById("book-name-edit");
    let authorx = document.getElementById("writer-edit");
    let yearx = document.getElementById("year-edit");
    let iscompx = document.getElementById("isComplete-edit");

    if (iscompx.checked == true) {
        read = true;
    } else {
        read = false;
    }

    maindata[editindex] = generateObject(maindata[editindex].id, booknamex.value, authorx.value, yearx.value, read);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    clearr();
}


function showdetailitem(id, el) {
    let children = el.children[0].children[0].children[1];

    isoverk(false, el, children, id);
    // boo = true;

    children.onmouseover = () => {
        isoverk(true, el, children, id);
        children.onmouseout = () => {
            isoverk(false, el, children, id);
        }
    }
}

function showdetailitemmodalcp(id, el) {
    let children = el.children[0].children[0].children[1];

    isoverkmodalcp(false, el, children, id);
    // boo = true;

    children.onmouseover = () => {
        isoverkmodalcp(true, el, children, id);
        children.onmouseout = () => {
            isoverkmodalcp(false, el, children, id);
        }
    }
}

function isoverkmodalcp(bool, el, children, id) {
    if (bool == true) {
        children.onclick = () => {
            el.onclick = null;
            deleteData(id);
        }
    } else {
        el.onclick = () => {
            let target = finddataIndex(id);
            if (target == null) {
                return;
            } else {

                document.getElementById("cpmodal-title").innerHTML = maindata[target].title;
                document.getElementById("cpmodal-author").innerHTML = maindata[target].author;
                document.getElementById("cpmodal-year").innerHTML = maindata[target].year;
            }
        }
    }
}

function showdetailitemmodalog(id, el) {
    let children = el.children[0].children[0].children[1];

    isoverkmodalog(false, el, children, id);
    // boo = true;

    children.onmouseover = () => {
        isoverkmodalog(true, el, children, id);
        children.onmouseout = () => {
            isoverkmodalog(false, el, children, id);
        }
    }
}

function isoverkmodalog(bool, el, children, id) {
    if (bool == true) {
        children.onclick = () => {
            el.onclick = null;
            deleteData(id);
        }
    } else {
        el.onclick = () => {
            let target = finddataIndex(id);
            if (target == null) {
                return;
            } else {

                document.getElementById("ogmodal-title").innerHTML = maindata[target].title;
                document.getElementById("ogmodal-author").innerHTML = maindata[target].author;
                document.getElementById("ogmodal-year").innerHTML = maindata[target].year;
            }
        }
    }
}

function isoverk(bool, el, children, id) {
    if (bool == true) {
        children.onclick = () => {
            el.onclick = null;
            deleteData(id);
        }
    } else {
        el.onclick = () => {
            let target = finddataIndex(id);
            if (target == null) {
                return;
            } else {

                document.getElementById("titlep").innerHTML = maindata[target].title;
                document.getElementById("writep").innerHTML = maindata[target].author;
                document.getElementById("yearp").innerHTML = maindata[target].year;
                if (maindata[target].isComplete == true) {
                    document.getElementById("statusp").innerHTML = "Completed";
                } else {
                    document.getElementById("statusp").innerHTML = "Ongoing";
                }
            }
        }
    }
}

function adToComplete(id) {
    let target = finddataIndex(id);
    if (target == null) {
        return;
    }

    maindata[target].isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function restoredata(id) {
    let target = finddataIndex(id);
    if (target == null) {
        return;
    }

    maindata[target].isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteData(id) {
    let text = "Are tou Sure to Delete?";
    if (confirm(text) == true) {
        let target = finddataIndex(id);
        if (target == null) {
            return;
        }

        maindata.splice(target, 1);
        clearr();
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }


}

function finddataIndex(id) {
    for (const index in maindata) {
        if (maindata[index].id === id) {
            return index;
        }
    }

    return -1;
}

function clearr() {
    document.getElementById("titlep").innerHTML = "Title";
    document.getElementById("writep").innerHTML = "Author";
    document.getElementById("yearp").innerHTML = "Year";
    document.getElementById("statusp").innerHTML = "Status";
}

function ogmodal_clear() {
    document.getElementById("ogmodal-title").innerHTML = "Title";
    document.getElementById("ogmodal-author").innerHTML = "Author";
    document.getElementById("ogmodal-year").innerHTML = "Year";
}

function cpmodal_clear() {
    document.getElementById("cpmodal-title").innerHTML = "Title";
    document.getElementById("cpmodal-author").innerHTML = "Author";
    document.getElementById("cpmodal-year").innerHTML = "Year";

}

function addmodal_clear() {
    bookname.value = "";
    writer.value = "";
    year.value = "";
    iscomp.checked = false;

}

function search() {
    let searchvalx = document.getElementById("searchx").value;
    for (let i = 0; i < maindata.length; i++) {
        if ((maindata[i].title).includes(searchvalx)) {
            searchdata.push(maindata[i]);
        }
        if ((maindata[i].author).includes(searchvalx)) {
            searchdata.push(maindata[i]);
        }
        if ((maindata[i].year).includes(searchvalx)) {
            searchdata.push(maindata[i]);
        }
    }
    document.dispatchEvent(new Event(SEARCH_EVENT));

}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

document.getElementById("modal-sub").onclick = () => {
    addbook();
    modaladd.style.display = "none";
}

document.getElementById("modal-sub-edit").onclick = () => {
    editbookvalue();
    modaledit.style.display = "none";
}

document.getElementById("reset-id").onclick = () => {
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.getElementById("searchx").value = "";
}








