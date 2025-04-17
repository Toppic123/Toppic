
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Camera, 
  Building, 
  Mail, 
  Phone, 
  User,
  FileText,
  Check,
  Tag,
  Info,
  Gift,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LocationCombobox from "@/components/admin/dashboard/contests/LocationCombobox";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  eventDescription: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  photoType: z.string({
    required_error: "Please select the type of photography.",
  }),
  location: z.string().min(2, {
    message: "Please enter a valid location.",
  }),
  eventStartDate: z.string({
    required_error: "Please select a start date.",
  }),
  eventEndDate: z.string({
    required_error: "Please select an end date.",
  }),
  votingEndDate: z.string({
    required_error: "Please select a voting end date.",
  }),
  planType: z.string({
    required_error: "Please select a plan.",
  }),
  maxDistance: z.string({
    required_error: "Please select a maximum distance.",
  }),
  rewardVoters: z.boolean().default(false),
});

const Organizers = () => {
  const [selectedTab, setSelectedTab] = useState("info");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Removed the useEffect that checks for user and redirects
  // This allows non-logged in users to view the page
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      eventDescription: "",
      photoType: "",
      location: "",
      eventStartDate: "",
      eventEndDate: "",
      votingEndDate: "",
      planType: "",
      maxDistance: "5",
      rewardVoters: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    if (!user) {
      // If not logged in, prompt user to log in before submitting
      toast({
        title: "Login required",
        description: "Please log in to submit your request.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Request submitted",
      description: "We have received your request and will contact you soon.",
    });
    
    form.reset();
  }
  
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "29€",
      description: "Ideal for small and local events",
      features: [
        "Up to 300 participants",
        "1 photo contest",
        "Basic advertising in the app",
        "Rights to 1 winning photo"
      ]
    },
    {
      id: "pro",
      name: "Professional",
      price: "79€",
      description: "Perfect for medium events and companies",
      features: [
        "Up to 1000 participants",
        "3 photo contests",
        "Featured advertising in the app",
        "Rights to 3 winning photos from each contest",
        "Promotional banner in the app"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "149€",
      description: "For large events and recognized brands",
      features: [
        "Unlimited participants",
        "5 photo contests",
        "Premium advertising throughout the app",
        "Rights to the 9 best photos",
        "Featured banner on main page",
        "Custom push notifications"
      ]
    }
  ];
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    form.setValue("planType", planId);
    setSelectedTab("form");
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Organizers
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Boost your event or company through our photo contests. Connect with your audience in a unique and visual way.
          </motion.p>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="info">Plans & Benefits</TabsTrigger>
            <TabsTrigger value="form">Event Request</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.id} className={`border-2 hover:shadow-lg transition-all ${selectedPlan === plan.id ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <p className="mt-2">{plan.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Why organize with us?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">User-generated content</h4>
                  <p className="text-muted-foreground text-sm">Receive hundreds of unique and authentic photos of your event or location.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Brand visibility</h4>
                  <p className="text-muted-foreground text-sm">Promote your company or event to thousands of users interested in your sector.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">User engagement</h4>
                  <p className="text-muted-foreground text-sm">Create an emotional connection with your customers through active participation.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Marketing content</h4>
                  <p className="text-muted-foreground text-sm">Obtain rights to the best photos to use in your future campaigns.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="form" className="mt-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Event creation request</CardTitle>
                  <CardDescription>
                    Complete the form to request a photo contest for your event or business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <User className="mr-2 h-5 w-5" />
                          Personal information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                  <Input placeholder="your@email.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+34 600 000 000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Building className="mr-2 h-5 w-5" />
                          Company information
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/organization name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <FileText className="mr-2 h-5 w-5" />
                          Event details
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="eventDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your event or what you want to promote..." 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Ubicación
                                <span className="text-xs font-normal text-muted-foreground">(requerido)</span>
                              </FormLabel>
                              <FormControl>
                                <LocationCombobox 
                                  value={field.value} 
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormDescription>
                                Especifica la ubicación exacta del evento o la zona para las fotografías
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="photoType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected photo type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select the photo type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="location">Places/Monuments</SelectItem>
                                  <SelectItem value="people">People/Events</SelectItem>
                                  <SelectItem value="product">Products/Services</SelectItem>
                                  <SelectItem value="activity">Activities/Performances</SelectItem>
                                  <SelectItem value="nature">Nature/Landscapes</SelectItem>
                                  <SelectItem value="other">Other type</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="maxDistance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum distance for photo uploads</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select maximum distance" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 km</SelectItem>
                                  <SelectItem value="5">5 km</SelectItem>
                                  <SelectItem value="10">10 km</SelectItem>
                                  <SelectItem value="25">25 km</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Users can only upload photos within this distance from the event location
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="eventStartDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="eventEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="votingEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Voting end date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Can be during or after the event
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Gift className="mr-2 h-5 w-5" />
                          Prizes configuration
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="rewardVoters"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Reward voters</FormLabel>
                                <FormDescription>
                                  In addition to rewarding the best photo, a random voter who participated in the contest will be rewarded.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Tag className="mr-2 h-5 w-5" />
                          Selected plan
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="planType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plan</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || selectedPlan || ""}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="basic">Basic - 29€</SelectItem>
                                  <SelectItem value="pro">Professional - 79€</SelectItem>
                                  <SelectItem value="premium">Premium - 149€</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Submit request</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Organizers;
