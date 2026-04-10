<?php
$caminho_final = dirname(__DIR__) . '/data/Dados.json';
$caminho_da_vida = dirname(__DIR__) . '/data/vivos.json';
$json_recebido = file_get_contents('php://input');
$lote = json_decode($json_recebido, true);

if (!empty($lote)) {
    // Pegamos o primeiro item do lote para ver se é um RESET ou ADIÇÃO
    $primeiro_item = $lote[0];

    if (isset($primeiro_item['reset']) && $primeiro_item['reset'] === true) {
        // MODO APAGAR: O JS mandou o mundo inteiro novo
        $mundo = ["mundo" => ["animais"=>[], "arvores"=>[], "humanos"=>[], "chao" => $primeiro_item['mundo_completo']]];
    } else {
        // MODO ADICIONAR: Lógica antiga de somar blocos
        $arquivo_atual = file_exists($caminho_final) ? file_get_contents($caminho_final) : null;
        $mundo = json_decode($arquivo_atual, true);
        if (!$mundo) { $mundo = ["mundo" => ["animais"=>[], "arvores"=>[], "humanos"=>[], "chao"=>[]]]; }

        foreach ($lote as $bloco) {
            $mundo['mundo']['chao'][] = $bloco;
        }
    }

    file_put_contents($caminho_final, json_encode($mundo, JSON_PRETTY_PRINT));
    echo "ZA WARUDO! Sincronizado.";
}
?>
