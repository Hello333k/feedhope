import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem, SlideIn } from "@/components/animations";
import { 
  AlertTriangle, 
  Users, 
  TrendingDown, 
  Heart,
  Lightbulb,
  HandHeart,
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import foodHungerBg from "@/assets/food-hunger-bg.jpg";

const FoodHunger = () => {
  const causes = [
    {
      icon: TrendingDown,
      title: "Poverty",
      description: "Lack of income prevents access to sufficient, nutritious food for millions of families worldwide."
    },
    {
      icon: Globe,
      title: "Climate Change",
      description: "Extreme weather, droughts, and floods destroy crops and disrupt food production cycles."
    },
    {
      icon: AlertTriangle,
      title: "Conflict & War",
      description: "Armed conflicts displace populations and destroy agricultural infrastructure."
    },
    {
      icon: Users,
      title: "Inequality",
      description: "Unequal distribution of resources leaves vulnerable communities without food security."
    }
  ];

  const solutions = [
    "Support local food banks and community kitchens",
    "Donate to organizations fighting hunger globally",
    "Volunteer at soup kitchens and meal programs",
    "Advocate for policies that address food insecurity",
    "Reduce your own food waste to help redistribute resources",
    "Support sustainable farming practices"
  ];

  const helpWays = [
    {
      icon: Heart,
      title: "Direct Donations",
      description: "Contribute food or funds to local food banks and shelters that serve those in need."
    },
    {
      icon: HandHeart,
      title: "Volunteer Your Time",
      description: "Help sort and distribute food at local organizations serving hungry communities."
    },
    {
      icon: Lightbulb,
      title: "Spread Awareness",
      description: "Educate others about hunger issues to build a larger movement for change."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 text-primary-foreground relative overflow-hidden"
        style={{
          backgroundImage: `url(${foodHungerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Global Crisis</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Understanding Food Hunger
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Every day, 828 million people go to bed hungry. Together, we can change this devastating reality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What is Food Hunger */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              What is Food Hunger?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Food hunger, or food insecurity, refers to the lack of consistent access to enough food for an active, healthy life. It affects individuals and families who don't know where their next meal will come from.
              </p>
              <p className="text-lg leading-relaxed">
                Unlike occasional hunger, chronic food hunger leads to malnutrition, developmental problems in children, weakened immune systems, and reduced productivity. It creates a cycle of poverty that's difficult to escape.
              </p>
              <motion.div 
                className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 my-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl font-bold text-destructive mb-4">The Devastating Impact</h3>
                <ul className="space-y-3 text-foreground">
                  {[
                    "3.1 million children die from undernutrition each year",
                    "Hunger causes more deaths than AIDS, malaria, and tuberculosis combined",
                    "1 in 9 people worldwide don't have enough food to lead a healthy life"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <span className="text-destructive font-bold">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Causes */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Does Food Hunger Exist?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the root causes helps us develop effective solutions
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" staggerDelay={0.1}>
            {causes.map((cause, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <cause.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {cause.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Prevention & Solutions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideIn direction="left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  How Can We Prevent & Solve Food Hunger?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ending hunger requires a multi-faceted approach combining immediate relief with long-term systemic change.
                </p>
                <ul className="space-y-4">
                  {solutions.map((solution, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </SlideIn>
              <SlideIn direction="right">
                <motion.div 
                  className="gradient-secondary rounded-3xl p-8 text-secondary-foreground"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-2xl font-bold mb-6">
                    Global Goals
                  </h3>
                  <p className="text-secondary-foreground/90 mb-6">
                    The United Nations Sustainable Development Goal 2 aims to achieve "Zero Hunger" by 2030 through:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Ending all forms of hunger and malnutrition",
                      "Ensuring sustainable food production systems",
                      "Maintaining genetic diversity in food production"
                    ].map((goal, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                      >
                        <span className="w-8 h-8 rounded-full bg-secondary-foreground/20 flex items-center justify-center flex-shrink-0">{index + 1}</span>
                        <span>{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Can You Help People Affected by Hunger?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every action, no matter how small, makes a difference
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12" staggerDelay={0.15}>
            {helpWays.map((way, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-card rounded-2xl p-8 text-center shadow-md h-full"
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                    <way.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {way.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {way.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4} className="text-center">
            <Link to="/donate">
              <Button size="lg" className="gap-2">
                Start Donating Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Be Part of the Solution
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Join thousands of compassionate individuals working together to end hunger in our communities and around the world.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Join FeedHope
                </Button>
              </Link>
              <Link to="/food-waste">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Learn About Food Waste
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

export default FoodHunger;
