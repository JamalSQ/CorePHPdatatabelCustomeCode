
let sortOrder = {
    pname: 'asc',
    pprice: 'asc',
    id:'asc'
};

 function sorting(variable){
    const products = paginate(records, currentPage, recordsPerPage);
       
        if (sortOrder[variable] === 'asc') {
            // Ascending order sorting
            if (variable === "pname") {
                products.sort((a, b) => a.p_name.toLowerCase().localeCompare(b.p_name.toLowerCase()));
            } else if (variable === "pprice") {
                products.sort((a, b) => parseFloat(a.p_price) - parseFloat(b.p_price));
            }
            else if (variable === "id") {
                products.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
            }
            // Toggle the sort order to descending for the next click
            sortOrder[variable] = 'desc';
        } else {

            // Descending order sorting
            if (variable === "pname") {
                products.sort((a, b) => b.p_name.toLowerCase().localeCompare(a.p_name.toLowerCase()));
            } else if (variable === "pprice") {
                products.sort((a, b) => parseFloat(b.p_price) - parseFloat(a.p_price));
            }
            else if (variable === "id") {
                products.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
            }
            // Toggle the sort order to ascending for the next click
            sortOrder[variable] = 'asc';
        }
        disply_search_result(products);
}

function disply_search_result(results){
      // Display the search results
      const resultsContainer = document.getElementById('tablebody');
      resultsContainer.innerHTML = '';

      if (results.length > 0) {
          results.forEach(product => {
            const tr = document.createElement('tr');

            // Create and set the first cell (ID)
            const td1 = document.createElement('td');
            td1.textContent = product.id;
            tr.appendChild(td1); // Append the cell to the row

            // Create and set the second cell (Name)
            const td2 = document.createElement('td');
            td2.textContent = product.p_name;
            tr.appendChild(td2); // Append the cell to the row

            // Create and set the third cell (Price)
            const td3 = document.createElement('td');
            td3.textContent = product.p_price;
            tr.appendChild(td3); // Append the cell to the row

            // Create the Edit button
            const edtButton = document.createElement('button');
            edtButton.textContent = "Edit";
            edtButton.classList.add('btn', 'btn-primary','mx-3','my-2');
            edtButton.setAttribute('data-toggle', 'modal');
            edtButton.setAttribute('data-target', '#exampleModalCenter'); // Optional: Add Bootstrap classes
            edtButton.addEventListener('click', () => {
                    // Use template literals correctly to pass product ID
                    fetchdataOnID(product.id);
                });
                tr.appendChild(edtButton);

                // Create the Delete button (if needed)
                const delButton = document.createElement('button');
                delButton.textContent = "Delete";
                delButton.classList.add('btn', 'btn-danger');
                delButton.addEventListener('click', () => {
                        // Use template literals correctly to pass product ID
                        deleteproduct(product.id);
                    });
                tr.appendChild(delButton);
            // Append the row to the table body
            resultsContainer.appendChild(tr);
          });
      } else {
          resultsContainer.textContent = 'No products found.';
      }
}
       // Function to load and search data from the file
async function searchProducts(query) {
    // Fetch the JSON file containing the data
    const response = await fetch('js/products.json');
    const products = await response.json();

    if(query==""){
        const results=paginate(records, currentPage, recordsPerPage);
        disply_search_result(results);
    }else{
        // Filter the products based on the search query
        const results = products.filter(product => 
            product.p_name.toLowerCase().includes(query.toLowerCase()) ||
            product.p_price.toString().includes(query)
        );
        disply_search_result(results);
    }   
}

    // Add event listener to the search input field
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });


