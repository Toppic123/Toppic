
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Settings, 
  Users, 
  Award, 
  Image, 
  Calendar,
  Trophy, 
  Info,
  Building,
  FileText,
  Camera,
  Save,
  Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";

const contestFormSchema = z.object({
  // Organizer Information
  organizerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  organizerEmail: z.string().email({ message: "Please enter a valid email address." }),
  organizerPhone: z.string().optional(),
  
  // Company Information
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  companyWebsite: z.string().url({ message: "Please enter a valid URL." }).optional(),
  
  // Event Information
  eventTitle: z.string().min(5, { message: "Title must be at least 5 characters." }),
  eventDescription: z.string().min(20, { message: "Description must be at least 20 characters." }),
  eventLocation: z.string().min(2, { message: "Location must be at least 2 characters." }),
  eventType: z.string(),
  
  // Dates
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  votingEndDate: z.date({ required_error: "Voting end date is required." }),
  
  // Prizes
  hasPrizes: z.boolean().default(false),
  firstPlacePrize: z.string().optional(),
  secondPlacePrize: z.string().optional(),
  thirdPlacePrize: z.string().optional(),
  
  // Voter Rewards
  hasVoterRewards: z.boolean().default(false),
  voterRewardDescription: z.string().optional(),
  
  // Terms
  acceptTerms: z.boolean().default(false),
});

type ContestFormValues = z.infer<typeof contestFormSchema>;

const defaultValues: Partial<ContestFormValues> = {
  organizerName: "",
  organizerEmail: "",
  organizerPhone: "",
  companyName: "",
  companyWebsite: "",
  eventTitle: "",
  eventDescription: "",
  eventLocation: "",
  eventType: "general",
  hasPrizes: false,
  firstPlacePrize: "",
  secondPlacePrize: "",
  thirdPlacePrize: "",
  hasVoterRewards: false,
  voterRewardDescription: "",
  acceptTerms: false,
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  const form = useForm<ContestFormValues>({
    resolver: zodResolver(contestFormSchema),
    defaultValues,
  });
  
  const onSubmit = (data: ContestFormValues) => {
    toast({
      title: "Contest settings updated",
      description: "Your changes have been saved successfully.",
    });
    console.log(data);
  };
  
  const hasPrizes = form.watch("hasPrizes");
  const hasVoterRewards = form.watch("hasVoterRewards");
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your contests and organization settings
          </p>
        </div>
        
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </Button>
      </div>
      
      <Tabs defaultValue="contests" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="contests">
            <Award className="w-4 h-4 mr-2" />
            <span>Contests</span>
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Users className="w-4 h-4 mr-2" />
            <span>Participants</span>
          </TabsTrigger>
          <TabsTrigger value="photos">
            <Image className="w-4 h-4 mr-2" />
            <span>Photos</span>
          </TabsTrigger>
          <TabsTrigger value="stats">
            <Trophy className="w-4 h-4 mr-2" />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contests" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Contests</CardTitle>
                <CardDescription>
                  Currently running photo contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
                <CardDescription>
                  Scheduled future contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
                <CardDescription>
                  Past contests with results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Contest Settings</CardTitle>
              <CardDescription>
                Configure your contest details and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
                  <TabsTrigger value="general">
                    <Info className="w-4 h-4 mr-2" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger value="company">
                    <Building className="w-4 h-4 mr-2" />
                    <span>Company</span>
                  </TabsTrigger>
                  <TabsTrigger value="event">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Event</span>
                  </TabsTrigger>
                  <TabsTrigger value="dates">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Dates</span>
                  </TabsTrigger>
                  <TabsTrigger value="prizes">
                    <Gift className="w-4 h-4 mr-2" />
                    <span>Prizes</span>
                  </TabsTrigger>
                </TabsList>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <TabsContent value="general" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Organizer Information</h3>
                        <FormField
                          control={form.control}
                          name="organizerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="organizerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="organizerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 234 567 890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="company" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Company Information</h3>
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="companyWebsite"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="event" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Event Information</h3>
                        <FormField
                          control={form.control}
                          name="eventTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Title of your photo contest" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="eventDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your contest"
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="eventLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Where will the contest take place" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Photo Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a photo category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General</SelectItem>
                                  <SelectItem value="landscape">Landscape</SelectItem>
                                  <SelectItem value="portrait">Portrait</SelectItem>
                                  <SelectItem value="action">Action / Sports</SelectItem>
                                  <SelectItem value="street">Street Photography</SelectItem>
                                  <SelectItem value="nature">Nature</SelectItem>
                                  <SelectItem value="architecture">Architecture</SelectItem>
                                  <SelectItem value="nightlife">Nightlife</SelectItem>
                                  <SelectItem value="food">Food & Gastronomy</SelectItem>
                                  <SelectItem value="cultural">Cultural</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select the main category for contest photos
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dates" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Contest Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                  />
                                </FormControl>
                                <FormDescription>
                                  When participants can start uploading photos
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                  />
                                </FormControl>
                                <FormDescription>
                                  When photo submissions close
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="votingEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Voting End Date</FormLabel>
                                <FormControl>
                                  <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                  />
                                </FormControl>
                                <FormDescription>
                                  When voting closes
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="prizes" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Prizes & Rewards</h3>
                        
                        <FormField
                          control={form.control}
                          name="hasPrizes"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Winner Prizes
                                </FormLabel>
                                <FormDescription>
                                  Enable prizes for the contest winners
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        {hasPrizes && (
                          <div className="space-y-4 p-4 border rounded-lg">
                            <FormField
                              control={form.control}
                              name="firstPlacePrize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Place Prize</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. $500 cash prize" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="secondPlacePrize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Second Place Prize</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. $250 cash prize" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="thirdPlacePrize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Third Place Prize</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. $100 cash prize" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="hasVoterRewards"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Voter Rewards
                                </FormLabel>
                                <FormDescription>
                                  Offer a random prize to one of the voters
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        {hasVoterRewards && (
                          <div className="space-y-4 p-4 border rounded-lg">
                            <FormField
                              control={form.control}
                              name="voterRewardDescription"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Voter Reward Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Describe the reward for voters"
                                      className="min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Explain what prize a random voter will win
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="acceptTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I accept the terms and conditions
                                </FormLabel>
                                <FormDescription>
                                  I confirm that I have the right to offer these prizes and will fulfill all obligations to winners.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        <span>Save Contest Settings</span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Participants Management</CardTitle>
              <CardDescription>
                View and manage contest participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Participants section content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Photo Management</CardTitle>
              <CardDescription>
                Review, approve, or reject submitted photos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Photo management content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Contest Results</CardTitle>
              <CardDescription>
                View voting statistics and winners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Contest results and statistics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
