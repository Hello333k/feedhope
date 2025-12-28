import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem, SlideIn, CountUp } from "@/components/animations";
import { 
  Trash2, 
  Leaf, 
  DollarSign, 
  Thermometer,
  ShoppingBag,
  Refrigerator,
  Utensils,
  Recycle,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import foodWasteBg from "@/assets/food-waste-bg.jpg";

const FoodWaste = () => {
  const impacts = [
    {
      icon: Thermometer,
      title: "Climate Change",
      stat: "8-10%",
      description: "of global greenhouse gas emissions come from wasted food"
    },
    {
      icon: DollarSign,
      title: "Economic Loss",
      stat: "$1 Trillion",
      description: "worth of food is wasted globally each year"
    },
    {
      icon: Leaf,
      title: "Resource Waste",
      stat: "25%",
      description: "of freshwater used in agriculture produces food that's never eaten"
    }
  ];

  const dosDonts = {
    dos: [
      "Plan meals before shopping to buy only what you need",
      "Store food properly to extend its freshness",
      "Use the 'first in, first out' method for perishables",
      "Freeze leftovers if you can't eat them soon",
      "Compost food scraps that can't be eaten",
      "Donate excess food to local food banks"
    ],
    donts: [
      "Don't buy in bulk unless you'll use it all",
      "Don't ignore expiration dates (but understand them!)",
      "Don't throw away 'ugly' produce that's still edible",
      "Don't serve oversized portions that lead to plate waste",
      "Don't let leftovers sit in the fridge too long",
      "Don't discard food just because it's past 'best by' date"
    ]
  };

  const preventionTips = [
    {
      icon: ShoppingBag,
      title: "Smart Shopping",
      tips: [
        "Make a shopping list and stick to it",
        "Buy 'ugly' fruits and vegetables",
        "Choose loose produce over pre-packaged",
        "Check what you already have at home"
      ]
    },
    {
      icon: Refrigerator,
      title: "Proper Storage",
      tips: [
        "Keep your fridge at the right temperature (below 40°F)",
        "Store fruits and vegetables separately",
        "Use airtight containers for leftovers",
        "Freeze bread, meat, and other perishables"
      ]
    },
    {
      icon: Utensils,
      title: "Cooking Wisely",
      tips: [
        "Cook smaller portions to reduce leftovers",
        "Get creative with leftover ingredients",
        "Use vegetable scraps for stocks and soups",
        "Learn to love leftovers!"
      ]
    },
    {
      icon: Recycle,
      title: "Responsible Disposal",
      tips: [
        "Compost food scraps for your garden",
        "Donate excess food before it expires",
        "Share surplus with neighbors",
        "Use apps to sell or give away extra food"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 text-secondary-foreground relative overflow-hidden"
        style={{
          backgroundImage: `url(${foodWasteBg})`,
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
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 bg-secondary-foreground/20 px-4 py-2 rounded-full mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-sm font-medium">Environmental Crisis</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              The Truth About Food Waste
            </h1>
            <p className="text-xl md:text-2xl text-secondary-foreground/90 max-w-3xl mx-auto">
              One-third of all food produced globally is wasted. That's 1.3 billion tonnes every year—while millions go hungry.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Food Waste Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Food waste isn't just about wasted food—it's an environmental, economic, and ethical crisis
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
            {impacts.map((impact, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border hover:border-primary/50 transition-colors duration-300"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                    <impact.icon className="w-8 h-8 text-destructive" />
                  </div>
                  <div className="font-display text-4xl font-bold text-primary mb-2">
                    {impact.stat}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {impact.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {impact.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Not Waste Food */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why You Should Never Waste Food
            </h2>
            
            <motion.div 
              className="bg-card rounded-3xl p-8 md:p-12 shadow-lg"
              whileHover={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <SlideIn direction="left">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                    The Human Cost
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While we throw away perfectly good food, <strong className="text-foreground">828 million people</strong> go to bed hungry every night. The food wasted in developed countries could feed all the world's hungry people several times over.
                  </p>
                </SlideIn>
                <SlideIn direction="right">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-secondary" />
                    Environmental Impact
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Wasted food in landfills produces <strong className="text-foreground">methane</strong>, a greenhouse gas 25 times more potent than CO2. Reducing food waste is one of the most effective ways to fight climate change.
                  </p>
                </SlideIn>
              </div>
              
              <FadeIn delay={0.3} className="mt-8 p-6 bg-destructive/10 rounded-2xl border border-destructive/20">
                <p className="text-center text-foreground font-medium">
                  If food waste were a country, it would be the <strong>third-largest emitter</strong> of greenhouse gases, after China and the USA.
                </p>
              </FadeIn>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Do's and Don'ts of Food Waste Prevention
            </h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Do's */}
            <SlideIn direction="left">
              <div className="bg-secondary/10 rounded-3xl p-8 border border-secondary/20 h-full">
                <h3 className="font-display text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                  <CheckCircle className="w-7 h-7" />
                  Do's
                </h3>
                <ul className="space-y-4">
                  {dosDonts.dos.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </SlideIn>
            
            {/* Don'ts */}
            <SlideIn direction="right">
              <div className="bg-destructive/10 rounded-3xl p-8 border border-destructive/20 h-full">
                <h3 className="font-display text-2xl font-bold text-destructive mb-6 flex items-center gap-2">
                  <XCircle className="w-7 h-7" />
                  Don'ts
                </h3>
                <ul className="space-y-4">
                  {dosDonts.donts.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Prevent Food Waste
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple changes in your daily habits can make a huge difference
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" staggerDelay={0.1}>
            {preventionTips.map((section, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <section.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Help Those Affected */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Turn Waste Into Hope
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instead of throwing away excess food, donate it to those in need. Your surplus can be someone else's lifeline.
            </p>
            
            <motion.div 
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid md:grid-cols-3 gap-8 text-center" staggerDelay={0.15}>
                <StaggerItem>
                  <div className="font-display text-4xl font-bold text-primary mb-2">
                    <CountUp end={40} suffix="%" />
                  </div>
                  <p className="text-muted-foreground">of food in America is wasted</p>
                </StaggerItem>
                <StaggerItem>
                  <div className="font-display text-4xl font-bold text-secondary mb-2">
                    <CountUp end={38} suffix="M" />
                  </div>
                  <p className="text-muted-foreground">Americans face food insecurity</p>
                </StaggerItem>
                <StaggerItem>
                  <div className="font-display text-4xl font-bold text-primary mb-2">You</div>
                  <p className="text-muted-foreground">can help bridge this gap</p>
                </StaggerItem>
              </StaggerContainer>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary text-secondary-foreground overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-secondary-foreground/90 max-w-2xl mx-auto mb-8">
              Join FeedHope today and help us redirect food from landfills to the tables of those who need it most.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate">
                <Button size="lg" variant="default" className="gap-2">
                  Donate Food Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/food-hunger">
                <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground/10">
                  Learn About Food Hunger
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

export default FoodWaste;
