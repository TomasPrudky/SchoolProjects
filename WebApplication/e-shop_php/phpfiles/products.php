<?php
require_once "./classes/Connection.php";
include "classes/Product.php";

$conn = Connection::getPdoInstance();
    $sql = $conn->prepare("SELECT * FROM product LIMIT 12");
    $sql->execute();
    $result = $sql->fetchAll();
    if($sql->rowCount() > 0){
        //print_r($result);
        echo '<div class="gallery">';
        foreach($result as $item){
            echo '
            <div>
                <div class="product">
                    <a href="#"><img src="./img/' . $item['imgLink'] . '"/></a>
                    <h3>'.$item['productName'].'</h3>
                    <h4>'.$item['price'].'.-Kč</h4>
                    <a href="pd.php?&id=' . $item['idProduct'] . '" class="buy-button">&#128722</a>
                </div>
            </div>';
            //print_r($item);

        }
        echo '</div>';
    }
?>
<head>
    <link rel="stylesheet" href="./css/products.css">
</head>
<?php
?>
