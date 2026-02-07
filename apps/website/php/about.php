<?php
require __DIR__ . '/config.php';
$pageTitle = 'About Us';
$pageDescription = 'Since 2018, Senior Floors has been dedicated to transforming homes with craftsmanship and integrity. Denver hardwood flooring experts.';
$canonicalUrl = SITE_URL . '/about';
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
      <div class="relative min-h-[280px] lg:min-h-0 rounded-xl overflow-hidden shadow-lg bg-white">
        <img src="<?php echo asset_url('assets/project1.jpg'); ?>" alt="Senior Floors team at work - Denver flooring contractor" class="w-full h-full object-cover" style="min-height: 280px;">
      </div>
      <div class="space-y-8">
        <div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">About Us</h1>
          <p class="text-lg text-gray-600 mb-6">
            Since 2018, Senior Floors has been dedicated to transforming homes with craftsmanship, passion, and integrity. What began as a small dream on the East Coast has grown into a company trusted by families and designers who seek elegance, precision, and a truly personalized experience.
          </p>
          <p class="text-gray-600 mb-6">
            Born in New Jersey, our work has brought life to high-end residences across NJ, NY, PA, and CO — from the iconic streets of Manhattan to the serene luxury of the Hamptons, Rumson, and Colts Neck. In 2022, we brought this legacy of excellence to Denver, Colorado, making it our new home and the heart of our operations.
          </p>
          <p class="text-gray-600 mb-6">
            At Senior Floors, we believe that a floor is more than a surface — it is the foundation of every memory created inside a home. That is why our team takes the time to understand each project with care, honesty, and technical expertise. Every detail matters, and every client's vision becomes our mission.
          </p>
          <p class="text-gray-600">
            Our promise is simple: deliver exceptional quality, clear communication, and an experience centered on trust. Because for us, your home isn't just a project — it's a place where life happens.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4 sm:gap-6">
          <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center" style="background-color: #d6b598;">
                <span class="text-primary text-xl">🏆</span>
              </div>
              <span class="text-2xl font-bold text-primary">10+</span>
            </div>
            <p class="text-sm font-medium text-gray-600">Years of Experience</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center" style="background-color: #d6b598;">
                <span class="text-primary text-xl">📍</span>
              </div>
              <span class="text-2xl font-bold text-primary">Denver Metro</span>
            </div>
            <p class="text-sm font-medium text-gray-600">Service Area</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center" style="background-color: #d6b598;">
                <span class="text-primary text-xl">👥</span>
              </div>
              <span class="text-2xl font-bold text-primary">500+</span>
            </div>
            <p class="text-sm font-medium text-gray-600">Happy Customers</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center" style="background-color: #d6b598;">
                <span class="text-primary text-xl">❤️</span>
              </div>
              <span class="text-2xl font-bold text-primary">5-Star</span>
            </div>
            <p class="text-sm font-medium text-gray-600">Rated on Google</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
