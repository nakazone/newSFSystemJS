<?php
require __DIR__ . '/config.php';
$pageTitle = 'Service Areas';
$pageDescription = 'We provide professional flooring installation services throughout Denver and surrounding areas. Find your location and get a free estimate.';
$canonicalUrl = SITE_URL . '/service-areas';

// Cities (simplified - você pode expandir depois)
$cities = [
  ['name' => 'Denver', 'slug' => 'denver', 'state' => 'CO'],
  ['name' => 'Aurora', 'slug' => 'aurora', 'state' => 'CO'],
  ['name' => 'Lakewood', 'slug' => 'lakewood', 'state' => 'CO'],
  ['name' => 'Greenwood Village', 'slug' => 'greenwood-village', 'state' => 'CO'],
  ['name' => 'Cherry Hills', 'slug' => 'cherry-hills', 'state' => 'CO'],
  ['name' => 'Morrison', 'slug' => 'morrison', 'state' => 'CO'],
  ['name' => 'Littleton', 'slug' => 'littleton', 'state' => 'CO'],
  ['name' => 'Boulder', 'slug' => 'boulder', 'state' => 'CO'],
  ['name' => 'Arvada', 'slug' => 'arvada', 'state' => 'CO'],
  ['name' => 'Westminster', 'slug' => 'westminster', 'state' => 'CO'],
  ['name' => 'Thornton', 'slug' => 'thornton', 'state' => 'CO'],
  ['name' => 'Highlands Ranch', 'slug' => 'highlands-ranch', 'state' => 'CO'],
];

function groupCitiesByLetter($cities) {
  $groups = [];
  foreach ($cities as $city) {
    $letter = strtoupper(substr($city['name'], 0, 1));
    if (!isset($groups[$letter])) $groups[$letter] = [];
    $groups[$letter][] = $city;
  }
  ksort($groups);
  return $groups;
}

$byLetter = groupCitiesByLetter($cities);

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Service Areas</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">We provide professional flooring installation services throughout Denver and surrounding areas. Find your location and get a free estimate.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($byLetter as $letter => $letterCities): ?>
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4"><?php echo $letter; ?></h2>
          <ul class="space-y-2">
            <?php foreach ($letterCities as $city): ?>
              <li>
                <a href="<?php echo base_url('/service-areas/' . $city['slug']); ?>" class="text-gray-600 hover:text-primary hover:underline">
                  <?php echo htmlspecialchars($city['name']); ?>, <?php echo $city['state']; ?>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      <?php endforeach; ?>
    </div>
    
    <div class="mt-12 text-center">
      <p class="text-lg text-gray-600 mb-4">Don't see your city? We may still serve your area!</p>
      <a href="<?php echo base_url('/contact'); ?>" class="cta-button">Contact Us to Check</a>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
