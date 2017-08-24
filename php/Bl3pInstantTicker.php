<?php

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$parity = $request->parity;
include('./httpful.phar');
// And you're ready to go!

$url = "https://api.bl3p.eu/1/BTCEUR/ticker";

$response = \Httpful\Request::get($url)->send();
echo $response;
?>