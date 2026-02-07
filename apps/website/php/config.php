<?php
/**
 * Configuração base – Senior Floors (versão PHP)
 * Para rodar em www.senior-floors.com/newsite ou localhost
 */

// Detectar localhost para usar base path vazio
$isLocalhost = !empty($_SERVER['HTTP_HOST']) && (
    $_SERVER['HTTP_HOST'] === 'localhost' ||
    $_SERVER['HTTP_HOST'] === '127.0.0.1' ||
    strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0 ||
    strpos($_SERVER['HTTP_HOST'], '127.0.0.1:') === 0
);

if ($isLocalhost) {
    define('BASE_PATH', '');
    define('SITE_URL', 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost:8000'));
} else {
    define('BASE_PATH', '/newsite');
    define('SITE_URL', 'https://www.senior-floors.com' . BASE_PATH);
}

// Telefone e email
define('PHONE', '(720) 751-9813');
define('PHONE_RAW', '+17207519813');
define('EMAIL', 'contact@senior-floors.com');

// Helpers
function base_url($path = '') {
    $path = ltrim($path, '/');
    return BASE_PATH . ($path ? '/' . $path : '');
}

function asset_url($path) {
    return base_url(ltrim($path, '/'));
}

// Menu Services (mesmo do Next.js)
$menuServices = [
    ['name' => 'Hardwood Refinishing', 'href' => '/services/hardwood-refinishing', 'shortDescription' => 'Restore and refresh your existing hardwood floors to like-new beauty.'],
    ['name' => 'Hardwood Installation', 'href' => '/services/hardwood-installation', 'shortDescription' => 'New hardwood flooring installed with precision and care.'],
    ['name' => 'Water Damage Services', 'href' => '/services/water-damage-services', 'shortDescription' => 'Repair and restore floors affected by water or moisture.'],
    ['name' => 'Extend Existing Hardwood', 'href' => '/services/extend-existing-hardwood', 'shortDescription' => 'Seamlessly extend your current hardwood into new areas.'],
    ['name' => 'Screen and Coat', 'href' => '/services/screen-and-coat', 'shortDescription' => 'Light refresh with screening and a new top coat for lasting shine.'],
    ['name' => 'Self Leveling', 'href' => '/services/self-leveling', 'shortDescription' => 'Level subfloors for a perfect base before your new flooring.'],
    ['name' => 'Stairs', 'href' => '/services/stairs', 'shortDescription' => 'Stair refinishing, installation, and custom stair work.'],
];

$flooringMenu = [
    ['name' => 'Site-Finished Wood', 'href' => '/flooring/site-finished-wood'],
    ['name' => 'Pre-Finished Wood', 'href' => '/flooring/pre-finished-wood'],
    ['name' => 'Luxury Vinyl', 'href' => '/flooring/luxury-vinyl'],
    ['name' => 'Engineered Wood', 'href' => '/flooring/engineered-wood'],
    ['name' => 'Laminate', 'href' => '/flooring/laminate'],
];

$aboutMenu = [
    ['name' => 'About Us', 'href' => '/about'],
    ['name' => 'Portfolio', 'href' => '/portfolio'],
    ['name' => 'Warranty', 'href' => '/warranty'],
    ['name' => 'Google Reviews', 'href' => '/reviews'],
    ['name' => 'Service Areas', 'href' => '/service-areas'],
];
