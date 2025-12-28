import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, MapPin, Globe, Search, ExternalLink, Phone, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/animations";
import storesHeroBg from "@/assets/stores-hero-bg.jpg";
import storeUsa from "@/assets/store-usa.jpg";
import storeUk from "@/assets/store-uk.jpg";
import storeIndia from "@/assets/store-india.jpg";
import storeAustralia from "@/assets/store-australia.jpg";
import storeBrazil from "@/assets/store-brazil.jpg";
import storeSouthafrica from "@/assets/store-southafrica.jpg";
import storeJapan from "@/assets/store-japan.jpg";
import storeGermany from "@/assets/store-germany.jpg";

const stores = [
  {
    id: 1,
    name: "Lumbini Fresh Mart",
    location: "Lumbini, Nepal",
    country: "Nepal",
    region: "Lumbini",
    donationsCollected: 15,
    image: storeUsa,
    hours: "8 AM - 10 PM",
    phone: "+977 9801234567",
  },
  {
    id: 2,
    name: "Ghorahi Grocery Hub",
    location: "Ghorahi, Dang",
    country: "Nepal",
    region: "Lumbini",
    donationsCollected: 12,
    image: storeUk,
    hours: "7 AM - 9 PM",
    phone: "+977 9812345678",
  },
  {
    id: 3,
    name: "Pokhara Nature Store",
    location: "Pokhara, Kaski",
    country: "Nepal",
    region: "Gandaki",
    donationsCollected: 18,
    image: storeIndia,
    hours: "9 AM - 11 PM",
    phone: "+977 9823456789",
  },
  {
    id: 4,
    name: "Butwal Food Center",
    location: "Butwal, Rupandehi",
    country: "Nepal",
    region: "Lumbini",
    donationsCollected: 9,
    image: storeAustralia,
    hours: "6 AM - 10 PM",
    phone: "+977 9834567890",
  },
  {
    id: 5,
    name: "Chitwan Fresh Market",
    location: "Bharatpur, Chitwan",
    country: "Nepal",
    region: "Bagmati",
    donationsCollected: 1,
    image: storeBrazil,
    hours: "8 AM - 9 PM",
    phone: "+977 9845678901",
  },
  {
    id: 6,
    name: "Biratnagar Grocery",
    location: "Biratnagar, Morang",
    country: "Nepal",
    region: "Province 1",
    donationsCollected: 8,
    image: storeSouthafrica,
    hours: "7 AM - 8 PM",
    phone: "+977 9856789012",
  },
  {
    id: 7,
    name: "Janakpur Food Store",
    location: "Janakpur, Dhanusha",
    country: "Nepal",
    region: "Madhesh",
    donationsCollected: 1,
    image: storeJapan,
    hours: "6 AM - 10 PM",
    phone: "+977 9867890123",
  },
  {
    id: 8,
    name: "Nepalgunj Fresh Mart",
    location: "Nepalgunj, Banke",
    country: "Nepal",
    region: "Lumbini",
    donationsCollected: 1,
    image: storeGermany,
    hours: "7 AM - 10 PM",
    phone: "+977 9878901234",
  },
];

const regions = ["All Regions", "Lumbini", "Gandaki", "Bagmati", "Province 1", "Madhesh"];

const Stores = () => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filteredStores = stores.filter((store) => {
    const matchesSearch = 
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.location.toLowerCase().includes(search.toLowerCase()) ||
      store.country.toLowerCase().includes(search.toLowerCase());
    
    const matchesRegion = selectedRegion === "All Regions" || store.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  const totalDonations = stores.reduce((acc, store) => acc + store.donationsCollected, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section 
        className="pt-24 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(${storesHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn className="max-w-2xl mx-auto">
            <motion.div 
              className="w-16 h-16 rounded-full bg-secondary-foreground/20 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <Store className="w-8 h-8 text-secondary-foreground" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              Partner Stores
            </h1>
            <p className="text-secondary-foreground/80 text-lg">
              Our global network of partner stores helps collect and distribute food to those in need. Find a partner near you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" staggerDelay={0.1}>
            <StaggerItem>
              <div className="font-display text-3xl font-bold text-primary">
                <CountUp end={stores.length} />
              </div>
              <p className="text-muted-foreground text-sm">Partner Stores</p>
            </StaggerItem>
            <StaggerItem>
              <div className="font-display text-3xl font-bold text-secondary">
                <CountUp end={regions.length - 1} />
              </div>
              <p className="text-muted-foreground text-sm">Regions Covered</p>
            </StaggerItem>
            <StaggerItem>
              <div className="font-display text-3xl font-bold text-foreground">
                <CountUp end={totalDonations} suffix="+" />
              </div>
              <p className="text-muted-foreground text-sm">Donations Collected</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search stores, cities, countries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                className="bg-card rounded-2xl overflow-hidden shadow-lg card-elevated group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                layout
              >
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {store.donationsCollected.toLocaleString()} donations
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {store.name}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {store.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      {store.region}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {store.hours}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      {store.phone}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group">
                    View Details
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredStores.length === 0 && (
            <FadeIn className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Store className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                No stores found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Want to Become a Partner?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join our network of partner stores and help us fight hunger in your community.
            </p>
            <Button variant="hero" size="lg">
              Partner With Us
            </Button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stores;
