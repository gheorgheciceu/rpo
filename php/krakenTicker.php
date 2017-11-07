<?php
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$parity = $request->parity;
include('./httpful.phar');
// And you're ready to go!


$fields = array("pair" => 'XBTEUR');
$url = "https://api.kraken.com/0/public/Ticker";

$response1 = \Httpful\Request::post($url)->body(http_build_query($fields))->send();
echo $response1;

?>