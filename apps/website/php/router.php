<?php
/**
 * Router para servidor PHP embutido (localhost)
 * Permite URLs limpas: /about, /services/hardwood-refinishing, etc.
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// Se for arquivo ou pasta real, deixar o servidor servir
if ($uri !== '' && file_exists(__DIR__ . '/' . $uri) && !is_dir(__DIR__ . '/' . $uri)) {
    return false; // Servir o arquivo
}
if ($uri !== '' && is_dir(__DIR__ . '/' . $uri)) {
    if (file_exists(__DIR__ . '/' . $uri . '/index.php')) {
        include __DIR__ . '/' . $uri . '/index.php';
        return true;
    }
    return false;
}

// Mapeamento: URL sem .php -> arquivo .php
$phpFile = null;

if ($uri === '' || $uri === 'index.php') {
    $phpFile = 'index.php';
} elseif (preg_match('#^([a-z0-9\-]+)$#', $uri)) {
    // Uma parte: about, contact, portfolio, reviews, warranty, free-estimate, service-areas
    $phpFile = $uri . '.php';
    if (!file_exists(__DIR__ . '/' . $phpFile)) {
        $phpFile = null;
    }
} elseif (preg_match('#^services/([a-z0-9\-]+)$#', $uri, $m)) {
    $phpFile = 'services/' . $m[1] . '.php';
    if (!file_exists(__DIR__ . '/' . $phpFile)) {
        $phpFile = null;
    }
} elseif (preg_match('#^flooring/([a-z0-9\-]+)$#', $uri, $m)) {
    $phpFile = 'flooring/' . $m[1] . '.php';
    if (!file_exists(__DIR__ . '/' . $phpFile)) {
        $phpFile = null;
    }
} elseif ($uri === 'services' || $uri === 'services/') {
    $phpFile = 'services/index.php';
} elseif ($uri === 'flooring' || $uri === 'flooring/') {
    $phpFile = 'flooring/index.php';
} elseif (preg_match('#^api/(.+)$#', $uri)) {
    return false; // Deixar servir api/ normalmente
}

if ($phpFile !== null && file_exists(__DIR__ . '/' . $phpFile)) {
    include __DIR__ . '/' . $phpFile;
    return true;
}

// 404
http_response_code(404);
echo '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>' . htmlspecialchars($uri) . '</p></body></html>';
return true;
