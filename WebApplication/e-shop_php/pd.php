<?php
require_once "./classes/Connection.php";
include 'phpfiles/header.php';
?>
<head>
    <link rel="stylesheet" href="css/productDetail.css">
</head>
<body>
<?php
$conn = Connection::getPdoInstance();
$sql = $conn->prepare("SELECT * FROM product WHERE idProduct = :id");
$sql->bindParam(':id', $_GET['id']);
$sql->execute();
$item = $sql->fetch(PDO::FETCH_ASSOC);

echo '<div class="gallery">
        <div class="product"> 
            <a href="./img/' . $item['imgLink'] . '"><img src="./img/' . $item['imgLink'] . '"/></a>
            <h3>'.$item['productName'].'</h3>
            <h4>'.$item['price'].'.-Kč</h4>
            <p>'.$item['productDescription'].'</p>
            <div class="buy-button">&#128722</div>
        </div>
      </div>
';
?>


<?php
include 'phpfiles/footer.php';
?>
</body>
