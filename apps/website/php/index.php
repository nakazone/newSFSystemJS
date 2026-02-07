<?php
require __DIR__ . '/config.php';
$pageTitle = 'Professional Flooring Installation & Services';
$pageDescription = 'Expert flooring installation and services including hardwood, vinyl, tile, epoxy, and refinishing. Free estimates. Serving Denver and surrounding areas.';
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<!-- Hero -->
<section class="relative text-white min-h-screen flex items-center overflow-hidden">
  <div class="absolute inset-0 w-full h-full z-0">
    <video autoplay loop muted playsInline class="absolute top-0 left-0 w-full h-full object-cover" preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
      <source src="<?php echo asset_url('videos/bg_seniorFloors.mp4'); ?>" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/40 to-primary/50 z-10" style="background: linear-gradient(to bottom right, rgba(26,32,54,0.5), rgba(26,32,54,0.4), rgba(26,32,54,0.5));"></div>
  </div>
  <div class="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full flex items-center justify-center min-h-screen">
    <div class="max-w-3xl text-center w-full">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
        Professional Flooring Installation & Services
      </h1>
      <p class="text-xl sm:text-2xl mb-8 text-white/95 drop-shadow-md">
        Transform your space with expert flooring installation. Hardwood, vinyl, tile, epoxy, and more. 
        Free estimates available.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="<?php echo base_url('/free-estimate'); ?>" class="cta-button text-lg px-8 py-4">Get Free Estimate</a>
        <a href="tel:<?php echo PHONE_RAW; ?>" class="cta-button-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
          📞 Call <?php echo PHONE; ?>
        </a>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 text-sm">
        <div class="inline-block bg-white/15 border border-white/30 rounded-md px-4 py-2 backdrop-blur-sm" style="background-color: rgba(255,255,255,0.15); backdrop-filter: blur(4px);">
          <div class="text-secondary text-base font-semibold mb-1 text-center tracking-wider" style="color: #d6b598;">
            ★★★★★ Google Reviews
          </div>
          <div class="text-white/95 text-xs font-semibold text-center uppercase tracking-wide">
            Hardwood Flooring Specialists
          </div>
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <span class="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">Licensed & Insured</span>
          <span class="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">Premium Materials</span>
          <span class="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">Local Company</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About -->
<section id="about" class="py-16 lg:py-24 scroll-mt-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
      <div class="relative min-h-[280px] lg:min-h-0 rounded-xl overflow-hidden shadow-lg bg-white">
        <img src="<?php echo asset_url('assets/project1.jpg'); ?>" alt="Senior Floors team at work - Denver flooring contractor" class="w-full h-full object-cover" style="min-height: 280px;">
      </div>
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">About Us</h2>
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

<!-- Services -->
<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Flooring Services</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Expert installation and services for all your flooring needs</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php
      $serviceIcons = [
        'hardwood-refinishing' => '✨',
        'hardwood-installation' => '📐',
        'water-damage-services' => '💧',
        'extend-existing-hardwood' => '↔️',
        'screen-and-coat' => '🖌️',
        'self-leveling' => '📏',
        'stairs' => '📚',
      ];
      foreach ($menuServices as $item):
        $slug = str_replace('/services/', '', $item['href']);
        $icon = $serviceIcons[$slug] ?? '📐';
      ?>
        <a href="<?php echo base_url($item['href']); ?>" class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group">
          <div class="mb-4">
            <div class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary-100 transition-colors" style="background-color: #d6b598;">
              <span class="text-2xl"><?php echo $icon; ?></span>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-primary mb-2 group-hover:text-primary-600 transition-colors"><?php echo htmlspecialchars($item['name']); ?></h3>
          <p class="text-gray-600 text-sm"><?php echo htmlspecialchars($item['shortDescription']); ?></p>
          <span class="inline-block mt-4 text-primary font-medium group-hover:underline">Learn More →</span>
        </a>
      <?php endforeach; ?>
    </div>
    <div class="text-center mt-12">
      <a href="<?php echo base_url('/services'); ?>" class="cta-button">View All Services</a>
    </div>
  </div>
</section>

<!-- Why Choose Us -->
<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Why Choose Us?</h2>
      <p class="text-lg text-gray-600">Experience the difference of working with flooring professionals</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-md" style="background-color: #1a2036;">
          <span class="text-white text-2xl">🏆</span>
        </div>
        <h3 class="text-xl font-semibold text-primary mb-2">Expert Craftsmanship</h3>
        <p class="text-gray-600">Certified installers with years of experience and attention to detail</p>
      </div>
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-md" style="background-color: #1a2036;">
          <span class="text-white text-2xl">⏰</span>
        </div>
        <h3 class="text-xl font-semibold text-primary mb-2">On-Time Completion</h3>
        <p class="text-gray-600">We respect your schedule and complete projects on time, every time</p>
      </div>
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-md" style="background-color: #1a2036;">
          <span class="text-white text-2xl">🛡️</span>
        </div>
        <h3 class="text-xl font-semibold text-primary mb-2">Warranty Protected</h3>
        <p class="text-gray-600">All our work comes with comprehensive warranties for your peace of mind</p>
      </div>
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-md" style="background-color: #1a2036;">
          <span class="text-white text-2xl">✓</span>
        </div>
        <h3 class="text-xl font-semibold text-primary mb-2">Free Estimates</h3>
        <p class="text-gray-600">No obligation estimates - we make it easy to get started</p>
      </div>
    </div>
    <div class="text-center mt-12">
      <a href="<?php echo base_url('/contact'); ?>" class="cta-button">Talk to Our Experts</a>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="py-16 lg:py-24 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">What Our Customers Say</h2>
      <p class="text-lg text-gray-600 mb-4">Don't just take our word for it - see what our customers have to say</p>
      <a href="<?php echo base_url('/reviews'); ?>" class="inline-block bg-primary/5 border border-primary/20 rounded-md px-4 py-2 hover:bg-primary/10 hover:border-primary/30 transition-colors" style="background-color: rgba(26,32,54,0.05); border-color: rgba(26,32,54,0.2);">
        <div class="text-secondary text-base font-semibold mb-1 text-center tracking-wider" style="color: #d6b598;">
          ★★★★★ Google Reviews
        </div>
        <div class="text-primary text-xs font-semibold text-center uppercase tracking-wide">
          Hardwood Flooring Specialists
        </div>
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div class="flex items-center gap-1 mb-4">
          <span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span>
        </div>
        <p class="text-gray-800 mb-4 italic">"Amazing work! Our hardwood floors look brand new. The team was professional, clean, and completed the job on time. Highly recommend!"</p>
        <div>
          <div class="font-semibold text-gray-800">Sarah Johnson</div>
          <div class="text-sm text-gray-600">Denver, CO</div>
          <div class="text-sm text-primary mt-1">Hardwood Flooring</div>
        </div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div class="flex items-center gap-1 mb-4">
          <span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span>
        </div>
        <p class="text-gray-800 mb-4 italic">"Installed LVP throughout our entire home. The quality is outstanding and the installation was flawless. Couldn't be happier!"</p>
        <div>
          <div class="font-semibold text-gray-800">Michael Chen</div>
          <div class="text-sm text-gray-600">Aurora, CO</div>
          <div class="text-sm text-primary mt-1">Vinyl Flooring</div>
        </div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div class="flex items-center gap-1 mb-4">
          <span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span><span class="text-secondary text-xl">★</span>
        </div>
        <p class="text-gray-800 mb-4 italic">"Epoxy floor in our garage exceeded expectations. It's been a year and it still looks perfect. Great value for the money."</p>
        <div>
          <div class="font-semibold text-gray-800">Emily Rodriguez</div>
          <div class="text-sm text-gray-600">Lakewood, CO</div>
          <div class="text-sm text-primary mt-1">Epoxy Flooring</div>
        </div>
      </div>
    </div>
    <div class="text-center mt-12">
      <a href="<?php echo base_url('/reviews'); ?>" class="text-primary font-semibold hover:underline">Read More Reviews →</a>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Ready to Transform Your Denver Home's Floors?</h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">Get your free in-home estimate today. We'll visit your Denver area home to assess your flooring needs and provide a detailed, no-obligation quote within 24 hours.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      <div class="w-full min-h-[400px] lg:min-h-[500px]">
        <div class="w-full h-full flex flex-col rounded-xl bg-white shadow-lg overflow-hidden min-h-0">
          <h3 class="text-primary font-bold text-center py-4 px-4 text-lg sm:text-xl">Recent Work Gallery</h3>
          <div class="flex-1 flex flex-col min-h-0 px-4 pb-4">
            <div class="relative flex-1 min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden shadow-md">
              <img id="gallery-img" src="<?php echo asset_url('assets/project1.jpg'); ?>" alt="Recent work" class="w-full h-full object-cover">
              <div id="gallery-desc" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-4 text-center text-sm font-medium">
                Full hardwood refinishing – single-family home in Cherry Creek, Denver, CO
              </div>
              <button type="button" id="gallery-prev" class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 hover:bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-lg transition-all hover:scale-110" style="background-color: rgba(26,32,54,0.8);">‹</button>
              <button type="button" id="gallery-next" class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 hover:bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-lg transition-all hover:scale-110" style="background-color: rgba(26,32,54,0.8);">›</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex-1 flex flex-col">
          <h3 class="text-xl font-bold text-primary mb-2">Get Your Free Flooring Estimate</h3>
          <p class="text-sm text-gray-500 mb-6">Fill out the form below and we'll contact you within 24 hours</p>
          <form action="<?php echo base_url('api/estimate.php'); ?>" method="post" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="name" name="name" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="John Doe">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" name="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="john@example.com">
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" id="phone" name="phone" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="(720) 555-0123">
            </div>
            <div>
              <label for="service" class="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select id="service" name="service" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="">Select a service</option>
                <?php foreach ($menuServices as $s): ?>
                  <option value="<?php echo htmlspecialchars($s['href']); ?>"><?php echo htmlspecialchars($s['name']); ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            <button type="submit" class="cta-button w-full">Get Free Estimate</button>
          </form>
          <p class="text-xs text-gray-500 mt-4 text-center">✓ No obligation · ✓ Free in-home consultation · ✓ Same-day response · ✓ Serving all Denver metro areas</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Final -->
<section class="py-16 lg:py-24 text-white" style="background: linear-gradient(135deg, #1a2036, #252b47);">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-4">Ready to Transform Your Floors?</h2>
    <p class="text-xl mb-8 text-white/90">Get a free estimate today and see how we can help bring your vision to life.</p>
    <a href="<?php echo base_url('/free-estimate'); ?>" class="cta-button-secondary text-lg px-8 py-4">Get Free Estimate</a>
  </div>
</section>

<?php include __DIR__ . '/includes/gallery-script.php'; ?>
<?php include __DIR__ . '/includes/footer.php'; ?>
