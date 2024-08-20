<?php

$conn=mysqli_connect("localhost","root","","ajaxcodignitor");

$sql="SELECT * from products";
$result=mysqli_query($conn,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="//cdn.datatables.net/2.1.4/css/dataTables.dataTables.min.css"> -->
</head>
<body>
    <div class="container mt-5">
    <table class="table table-info">
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
        <input type="search" name="search" autocomplete="off" id="searchInput" placeholder="Search..."><br><br>
        <div id="searchResults"></div>
          <?php
            while($row=mysqli_fetch_assoc($result)){
          ?>
          <tr>
            <td><?= $row['id'];?></td>
            <td><?= $row['p_name'];?></td>
            <td><?= $row['p_price'];?></td>
          </tr>
            <?php } ?>
        </tbody>
      </table>
    </div>
    <!-- <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
    <script src="//cdn.datatables.net/2.1.4/js/dataTables.min.js"></script>
    <script>
        $(document).ready(function(){
            let table = new DataTable('.table');
        })
    </script> -->

    <script src="./livedataCustom.php"></script>
    
</body>
</html>