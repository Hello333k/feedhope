import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Package, Calendar, MapPin, CheckCircle, Clock, Truck, Users, TrendingUp, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import trackHeroBg from "@/assets/track-hero-bg.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/animations";

interface DonationItem {
  name: string;
  quantity: string;
  category: string;
}

interface Donation {
  id: string;
  created_at: string;
  items: DonationItem[];
  pickup_address: string;
  pickup_date: string;
  notes: string | null;
  status: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Delivered
        </span>
      );
    case "picked_up":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
          <Truck className="w-4 h-4" />
          In Transit
        </span>
      );
    case "confirmed":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Confirmed
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
          <Clock className="w-4 h-4" />
          Pending Pickup
        </span>
      );
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const Track = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching donations:', error);
          return;
        }

        // Parse the items JSONB field properly
        const parsedDonations = (data || []).map(donation => ({
          ...donation,
          items: (donation.items as unknown as DonationItem[]) || []
        }));

        setDonations(parsedDonations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchDonations();
    }
  }, [user, authLoading]);

  const totalItems = donations.reduce((acc, d) => acc + d.items.length, 0);
  const deliveredCount = donations.filter(d => d.status === "delivered").length;
  const inTransitCount = donations.filter(d => d.status === "picked_up").length;
  const pendingCount = donations.filter(d => d.status === "pending" || d.status === "confirmed").length;

  // Show login prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Sign In to Track
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Please log in to view and track your donations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section 
        className="pt-24 pb-16 relative"
        style={{
          backgroundImage: `url(${trackHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Your Impact Dashboard</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Track Your Impact
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              See where your donations go and track their progress. Every contribution makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-4xl font-bold text-primary">{donations.length}</div>
              <p className="text-muted-foreground text-sm mt-1">Total Donations</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-display text-4xl font-bold text-secondary">{totalItems}</div>
              <p className="text-muted-foreground text-sm mt-1">Items Donated</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-display text-4xl font-bold text-green-600">{deliveredCount}</div>
              <p className="text-muted-foreground text-sm mt-1">Delivered</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="font-display text-4xl font-bold text-amber-600">{pendingCount + inTransitCount}</div>
              <p className="text-muted-foreground text-sm mt-1">In Progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Message */}
      {donations.length > 0 && (
        <section className="py-8 bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  You've donated {totalItems} items across {donations.length} donations!
                </h3>
                <p className="text-muted-foreground">
                  Your generosity is making a real difference in communities.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Donations List */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Your Donations
                </h2>
                <p className="text-muted-foreground mt-1">Track the journey of each donation</p>
              </div>
              <Link to="/donate">
                <Button className="gap-2">
                  <Package className="w-4 h-4" />
                  New Donation
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : donations.length > 0 ? (
              <div className="space-y-6">
                {donations.map((donation, index) => (
                  <div
                    key={donation.id}
                    className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm bg-muted px-2 py-1 rounded text-muted-foreground">
                            {donation.id.slice(0, 8).toUpperCase()}
                          </span>
                          {getStatusBadge(donation.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(donation.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-xl border border-secondary/20">
                        <Package className="w-5 h-5 text-secondary" />
                        <span className="font-semibold text-secondary">
                          {donation.items.length} item{donation.items.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          Items Donated
                        </h4>
                        <ul className="space-y-2">
                          {donation.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {item.name} ({item.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Pickup Details
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">{donation.pickup_address}</p>
                        <p className="text-muted-foreground text-sm">
                          <span className="font-medium">Pickup Date:</span> {formatDate(donation.pickup_date)}
                        </p>
                        
                        {donation.status === "picked_up" && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <Truck className="w-4 h-4 animate-pulse" />
                              <span>Currently on the way...</span>
                            </div>
                            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full w-2/3 bg-primary rounded-full animate-pulse" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {donation.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {donation.notes}
                        </p>
                      </div>
                    )}

                    {donation.status === "delivered" && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-secondary flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Successfully delivered and distributed
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  No donations yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start your journey of giving today!
                </p>
                <Link to="/donate">
                  <Button variant="hero">Make Your First Donation</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Ready to Make More Impact?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Every donation counts. Continue your journey of helping those in need.
          </p>
          <Link to="/donate">
            <Button size="lg" variant="secondary" className="gap-2">
              Donate More Food
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Track;
