<?php
$languageId = $_POST ['languageId'];
$json = $_POST ['json'];
echo file_put_contents ( '../../files/language/' . $languageId . '.json', $json );

?>