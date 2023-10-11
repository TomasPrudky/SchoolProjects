<?php
require_once "./classes/Connection.php";
/*
function show_menu(){
    $conn = Connection::getPdoInstance();

    $menus = '';

    $menus .= generate_multilevel_menus();

    return $menus;
}

function generate_multilevel_menus($parent_id = NULL){
    $menu = '';
    $conn = Connection::getPdoInstance();
    $sql = '';
    if(is_null($parent_id)){
        $sql = $conn->prepare("SELECT * FROM category WHERE Category_idCategory IS NULL");
    }else{
        $sql = $conn->prepare("SELECT * FROM category WHERE Category_idCategory = $parent_id");
    }
    $sql->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    $row = $sql->fetch();

 //

    foreach($result as $row){
        if($row['categoryName']){
            $menu .= '<li><a href="#">'.$row['categoryName'].'</a></li>';
            echo $row['categoryName'];

        }else{
            $menu .= '<li><a href="#">'.$row['categoryName'].'</a></li>';
        }
        $menu .= '<ul>'.generate_multilevel_menus($row['idCategory']).'</ul>';
        $menu .= '</li>';
    }
    return $menu;
}*/
?>

<head>
    <link rel="stylesheet" href="./css/header.css">
</head>


<div class="menu">
    <div id="logoNav">LOGO</div>
    <nav class="nav-categories">
        <ul class="ul-category">
            <li>
                <a href="#">Nike</a>
                <ul class="dropdown">
                    <li><a href="#">Merucirial</a></li>
                    <li><a href="#">Tiempo</a></li>
                    <li><a href="#">Hypervenom</a></li>
                    <li><a href="#">Superfly</a>
                        <ul class="dropdown">
                            <li><a href="#">Merucirial</a></li>
                            <li><a href="#">Tiempo</a></li>
                            <li><a href="#">Hypervenom</a></li>
                            <li><a href="#">Superfly</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Adidas</a>
                <ul class="dropdown">
                    <li><a href="#">F50</a></li>
                    <li><a href="#">F10</a></li>
                    <li><a href="#">Kaiser</a></li>
                    <li><a href="#">Origin</a></li>
                </ul>
            </li>
            <li><a href="#">Puma</a>
                <ul class="dropdown">
                    <li><a href="#">Pro</a></li>
                    <li><a href="#">Speed</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="nav-account-cart">
        <a href="#">&#128100</a>
        <a href="#">&#128722;</a>
    </div>
</div>

