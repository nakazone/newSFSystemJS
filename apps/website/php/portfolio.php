<?php
require __DIR__ . '/config.php';
$pageTitle = 'Portfolio';
$pageDescription = 'Explore our portfolio of flooring projects. Hardwood, vinyl, tile, epoxy installations across Denver and beyond.';
$canonicalUrl = SITE_URL . '/portfolio';

// Portfolio projects (simplified - same data as Next.js)
$portfolioProjects = [
  ['id' => '1', 'title' => 'Full Hardwood Refinishing – Cherry Creek', 'description' => 'Complete refinishing of existing oak floors in a single-family home.', 'image' => 'project1.jpg', 'city' => 'Denver', 'serviceType' => 'Hardwood Refinishing', 'flooringType' => 'Site-Finished Wood', 'material' => 'Red Oak'],
  ['id' => '2', 'title' => 'New White Oak Installation – DTC', 'description' => 'Open concept living room with white oak flooring.', 'image' => 'project2.jpg', 'city' => 'Greenwood Village', 'serviceType' => 'Hardwood Installation', 'flooringType' => 'Pre-Finished Wood', 'material' => 'White Oak'],
  ['id' => '3', 'title' => 'Chevron Pattern Installation', 'description' => 'Luxury home near Morrison with chevron pattern hardwood.', 'image' => 'project3.jpg', 'city' => 'Morrison', 'serviceType' => 'Hardwood Installation', 'flooringType' => 'Site-Finished Wood', 'material' => 'Hickory'],
  ['id' => '4', 'title' => 'Stair Refinishing – Lakewood', 'description' => 'Stair refinishing and handrail update for a Lakewood home.', 'image' => 'project4.jpg', 'city' => 'Lakewood', 'serviceType' => 'Stairs', 'flooringType' => 'Pre-Finished Wood', 'material' => 'Red Oak'],
];

$cities = ['All Cities', 'Denver', 'Greenwood Village', 'Morrison', 'Lakewood'];
$services = ['All Services', 'Hardwood Refinishing', 'Hardwood Installation', 'Stairs'];
$flooringTypes = ['All Types', 'Site-Finished Wood', 'Pre-Finished Wood'];

$selectedCity = $_GET['city'] ?? 'all';
$selectedService = $_GET['service'] ?? 'all';
$selectedFlooring = $_GET['flooring'] ?? 'all';

$filteredProjects = $portfolioProjects;
if ($selectedCity !== 'all') {
  $filteredProjects = array_filter($filteredProjects, fn($p) => $p['city'] === $selectedCity);
}
if ($selectedService !== 'all') {
  $filteredProjects = array_filter($filteredProjects, fn($p) => $p['serviceType'] === $selectedService);
}
if ($selectedFlooring !== 'all') {
  $filteredProjects = array_filter($filteredProjects, fn($p) => $p['flooringType'] === $selectedFlooring);
}

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Our Portfolio</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-8">Explore our completed flooring projects across Denver and beyond.</p>
    
    <div class="mb-8 flex flex-wrap gap-4">
      <select id="filter-city" class="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary">
        <option value="all">All Cities</option>
        <?php foreach (array_unique(array_column($portfolioProjects, 'city')) as $city): ?>
          <option value="<?php echo htmlspecialchars($city); ?>" <?php echo $selectedCity === $city ? 'selected' : ''; ?>><?php echo htmlspecialchars($city); ?></option>
        <?php endforeach; ?>
      </select>
      <select id="filter-service" class="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary">
        <option value="all">All Services</option>
        <?php foreach (array_unique(array_column($portfolioProjects, 'serviceType')) as $service): ?>
          <option value="<?php echo htmlspecialchars($service); ?>" <?php echo $selectedService === $service ? 'selected' : ''; ?>><?php echo htmlspecialchars($service); ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($filteredProjects as $project): ?>
        <div class="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all">
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img src="<?php echo asset_url('assets/' . $project['image']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?>" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-primary line-clamp-2"><?php echo htmlspecialchars($project['title']); ?></h3>
            <p class="text-sm text-gray-600 mt-1"><?php echo htmlspecialchars($project['city']); ?></p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span class="text-xs bg-gray-100 px-2 py-1 rounded"><?php echo htmlspecialchars($project['serviceType']); ?></span>
              <?php if (!empty($project['material'])): ?>
                <span class="text-xs bg-gray-100 px-2 py-1 rounded"><?php echo htmlspecialchars($project['material']); ?></span>
              <?php endif; ?>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
    
    <?php if (empty($filteredProjects)): ?>
      <p class="text-center text-gray-600 mt-8">No projects found with the selected filters.</p>
    <?php endif; ?>
  </div>
</section>

<script>
document.getElementById('filter-city')?.addEventListener('change', function() {
  const city = this.value;
  const service = document.getElementById('filter-service')?.value || 'all';
  window.location.href = '<?php echo base_url("/portfolio"); ?>?city=' + (city === 'all' ? '' : city) + '&service=' + (service === 'all' ? '' : service);
});
document.getElementById('filter-service')?.addEventListener('change', function() {
  const service = this.value;
  const city = document.getElementById('filter-city')?.value || 'all';
  window.location.href = '<?php echo base_url("/portfolio"); ?>?city=' + (city === 'all' ? '' : city) + '&service=' + (service === 'all' ? '' : service);
});
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
