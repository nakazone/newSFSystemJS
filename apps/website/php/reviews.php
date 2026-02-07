<?php
require __DIR__ . '/config.php';
$pageTitle = 'Google Reviews';
$pageDescription = 'Read our Google reviews from real customers. See why homeowners choose Senior Floors for hardwood and flooring in Denver and the metro area.';
$canonicalUrl = SITE_URL . '/reviews';

$googleReviewsUrl = 'https://www.google.com/search?q=google+reviews+senior+floors#lrd=0x2dd47a74824e3cc9:0xbcd70de3b929964c,1,,,,';
$testimonials = [
  ['name' => 'Sarah Johnson', 'city' => 'Denver, CO', 'rating' => 5, 'text' => 'Amazing work! Our hardwood floors look brand new. The team was professional, clean, and completed the job on time. Highly recommend!', 'service' => 'Hardwood Flooring'],
  ['name' => 'Michael Chen', 'city' => 'Aurora, CO', 'rating' => 5, 'text' => 'Installed LVP throughout our entire home. The quality is outstanding and the installation was flawless. Couldn\'t be happier!', 'service' => 'Vinyl Flooring'],
  ['name' => 'Emily Rodriguez', 'city' => 'Lakewood, CO', 'rating' => 5, 'text' => 'Epoxy floor in our garage exceeded expectations. It\'s been a year and it still looks perfect. Great value for the money.', 'service' => 'Epoxy Flooring'],
];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Google Reviews</h1>
        <p class="text-xl text-gray-600 max-w-3xl">See what our customers say about us on Google. Real reviews from real homeowners.</p>
      </div>
      <div class="flex flex-col items-start gap-3">
        <a href="<?php echo $googleReviewsUrl; ?>" target="_blank" rel="noopener noreferrer" class="cta-button flex items-center gap-2">
          View All Reviews on Google
          <span>↗</span>
        </a>
        <div class="bg-primary/5 border border-primary/20 rounded-md px-4 py-2" style="background-color: rgba(26,32,54,0.05); border-color: rgba(26,32,54,0.2);">
          <div class="text-secondary text-base font-semibold mb-1 text-center tracking-wider" style="color: #d6b598;">
            ★★★★★ Google Reviews
          </div>
          <div class="text-primary text-xs font-semibold text-center uppercase tracking-wide">
            Hardwood Flooring Specialists
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center">What Our Customers Say</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <?php foreach ($testimonials as $t): ?>
        <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div class="flex items-center gap-1 mb-4">
            <?php for ($i = 0; $i < $t['rating']; $i++): ?>
              <span class="text-secondary text-xl">★</span>
            <?php endfor; ?>
          </div>
          <p class="text-gray-800 mb-4 italic">"<?php echo htmlspecialchars($t['text']); ?>"</p>
          <div>
            <div class="font-semibold text-gray-800"><?php echo htmlspecialchars($t['name']); ?></div>
            <div class="text-sm text-gray-600"><?php echo htmlspecialchars($t['city']); ?></div>
            <div class="text-sm text-primary mt-1"><?php echo htmlspecialchars($t['service']); ?></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
    <div class="text-center mt-12">
      <a href="<?php echo $googleReviewsUrl; ?>" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold hover:underline">Read More Reviews on Google →</a>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
