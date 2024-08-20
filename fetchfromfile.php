<?php
// Database connection
$connection = new mysqli('localhost', 'root', '', 'ajaxcodignitor');

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Fetch data from database
$query = "SELECT id, p_name, p_price FROM products";
$result = $connection->query($query);

// Open a file in write mode
$file = fopen('js/products.json', 'w');

// Initialize an array to hold the data
$data = [];

if ($result->num_rows > 0) {
    // Loop through the database results and add them to the array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
// Write data to the file in JSON format
fwrite($file, json_encode($data));
// Close the file
fclose($file);
// Close the database connection
$connection->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Search Products</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body>

<div class="container">
    <h1>Search Products</h1>

    <input type="text" id="searchInput" class="form-control" placeholder="Search for products...">
    <div id="searchResults"></div>

    <nav aria-label="Page navigation example">
  <ul class="pagination m-4" id="pagination-controls">
 
  </ul>
</nav>

    <table class="table table-bordered mt-4" id="myTable">
        <thead>
            <tr>
                <th scope="col" class="columName" onclick="sorting('id')">ID</th>
                <th scope="col" class="columName" onclick="sorting('pname')">Name</th>
                <th scope="col" class="columName" onclick="sorting('pprice')">Price</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody id="tablebody">
        </tbody>
    </table>
</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
    <script src="js/livedataCustom.js"></script>
    <script src="js/pagination.js"></script>
</body>
</html>