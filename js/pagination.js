let currentPage = 1;
let records = [];
let recordsPerPage=5;

async function fetchData() {
    try {
        const response = await fetch('js/products.json'); // Load the JSON data
        records = await response.json(); // Parse the JSON data
        updatePage(currentPage); // Initialize page with first set of records
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function paginate(records, page, perPage) {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    console.log(records);
    return records.slice(start, end);
}

function updatePage(page){
    currentPage = page;
    const paginatedRecords = paginate(records, currentPage, recordsPerPage);
    renderRecords(paginatedRecords);
    renderPaginationControls(recordsPerPage);
}

function renderRecords(records) {
    const tableBody = document.getElementById('tablebody');
    tableBody.innerHTML = ''; // Clear existing rows

    records.forEach(record => {
        const row = `<tr>
            <td>${record.id}</td>
            <td>${record.p_name}</td>
            <td>${record.p_price}</td>
            <td><button type="button" class="btn btn-primary" onclick="fetchdataOnID() data-toggle="modal" data-target="#exampleModalCenter">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteproduct()">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function renderPaginationControls(recordsPerPage) {
    const totalPages = Math.ceil(records.length / recordsPerPage);
    const paginationControls = document.getElementById('pagination-controls');
    // const paginationControls = document.getElementsByClassName('pagination');
    paginationControls.innerHTML = '';
    // <li class="page-item"><a class="page-link" href="#">Previous</a></li>

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const atag = document.createElement('a');
        li.classList.add('page-item');
        atag.classList.add('page-link');
        atag.textContent = i;
        li.appendChild(atag);
        
        li.onclick = () => updatePage(i);
        if (i === currentPage) {
            li.disabled = true;
        }
        paginationControls.appendChild(li);
    }
}

// Initial fetch and render
fetchData();
