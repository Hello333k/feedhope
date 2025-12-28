import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, SlideIn, CountUp } from "@/components/animations";
import StatCard from "@/components/StatCard";
import { Heart, Users, Store, TrendingUp, ArrowRight, Utensils, Globe, HandHeart } from "lucide-react";
import heroImage from "@/assets/hero-food-donation.jpg";
import volunteersImage from "@/assets/volunteers-sorting.jpg";

const Index = () => {
  // Homepage - lots of animations here, might be overkill lol
  // Performance seems okay on my laptop but should test on slower devices
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.span 
              className="inline-block px-5 py-2.5 rounded-full glass text-primary-foreground text-sm font-medium mb-6 pulse-ring border-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🇳🇵 Fighting Hunger in Nepal
            </motion.span>
            <motion.h1 
              className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Every Meal Shared is a
              <motion.span 
                className="block text-shimmer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              > Life Changed</motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Join our global movement to end food hunger. Donate surplus food, track your impact, and connect with partner stores worldwide.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/donate">
                <Button variant="hero" size="xl">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/stores">
                <Button variant="heroOutline" size="xl">
                  Explore Partners
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { duration: 0.6, delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
            <motion.div 
              className="w-1 h-3 bg-primary-foreground/60 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
            <StaggerItem>
              <StatCard
                icon={<Utensils className="w-8 h-8 text-primary-foreground" />}
                value={<CountUp end={25} suffix="+" />}
                label="Meals Distributed"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={<Users className="w-8 h-8 text-primary-foreground" />}
                value={<CountUp end={15} suffix="+" />}
                label="Lives Impacted"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={<Store className="w-8 h-8 text-primary-foreground" />}
                value={<CountUp end={5} suffix="+" />}
                label="Partner Stores"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={<Globe className="w-8 h-8 text-primary-foreground" />}
                value={<CountUp end={8} suffix="+" />}
                label="Countries Reached"
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              How FeedHope Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Making a difference has never been easier. Follow these simple steps to start your journey of impact.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
            {[
              {
                step: "01",
                title: "Register & Donate",
                description: "Create your account and list the food items you wish to donate. Our platform makes it simple.",
                icon: HandHeart,
              },
              {
                step: "02",
                title: "We Collect & Distribute",
                description: "Our partner stores and volunteers collect your donations and distribute them to those in need.",
                icon: Store,
              },
              {
                step: "03",
                title: "Track Your Impact",
                description: "Monitor your contributions in real-time. See exactly how many lives you've touched.",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="relative glass-card rounded-2xl p-8 hover-lift group h-full border-gradient nepal-pattern"
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <span className="absolute -top-4 -left-4 w-12 h-12 rounded-full nepal-gradient flex items-center justify-center text-primary-foreground font-bold text-lg glow">
                    {item.step}
                  </span>
                  <div className="pt-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left" className="relative">
              <motion.img 
                src={volunteersImage}
                alt="Volunteers sorting food donations"
                className="rounded-2xl shadow-2xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
              <ScaleIn delay={0.3} className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-secondary flex items-center justify-center">
                    <Users className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-foreground">
                      <CountUp end={5} suffix="K+" />
                    </div>
                    <p className="text-muted-foreground text-sm">Active Volunteers</p>
                  </div>
                </div>
              </ScaleIn>
            </SlideIn>

            <SlideIn direction="right">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Ending Hunger, One Meal at a Time
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Every day, millions of tons of perfectly good food goes to waste while 800 million people go hungry. FeedHope bridges this gap by connecting donors with those in need through our global network of partner stores and volunteers.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our innovative tracking system ensures complete transparency, so you can see exactly where your donations go and the lives they touch.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/register">
                  <Button variant="default" size="lg">
                    Join the Movement
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/track">
                  <Button variant="outline" size="lg">
                    See Our Impact
                  </Button>
                </Link>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 nepal-gradient overflow-hidden relative">
        {/* Animated background elements - Mountain silhouette inspired */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl floating"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              सहयोग गर्नुहोस् - Ready to Help?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-primary-foreground/90 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of Nepali donors and volunteers who are already changing lives across Nepal. Every contribution brings hope to families in need.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button 
                  variant="heroOutline" 
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90 morphic-button glow"
                >
                  <Heart className="w-5 h-5" />
                  Start Donating
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="heroOutline" size="xl" className="morphic-button">
                  Create Account
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
