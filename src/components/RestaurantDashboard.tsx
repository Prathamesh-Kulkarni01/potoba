
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Utensils, 
  ShoppingCart, 
  ArrowUpRight,
  TrendingUp,
  Star,
  ChefHat,
  Coffee
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AiAnalytics from './AiAnalytics';

// Sample data - in a real application, this would come from an API
const generateDashboardData = (restaurantId: string) => {
  // This is a dummy function that would normally fetch data from an API
  // For now, we'll return mock data with slight variations based on restaurant ID
  const randomVariation = parseInt(restaurantId.split('-')[1]?.[0] || '1') / 10;
  
  return {
    tables: {
      total: Math.floor(15 + 10 * randomVariation),
      available: Math.floor(5 + 5 * randomVariation),
      occupied: Math.floor(7 + 4 * randomVariation),
      reserved: Math.floor(3 + 1 * randomVariation)
    },
    orders: {
      total: Math.floor(35 + 15 * randomVariation),
      pending: Math.floor(5 + 3 * randomVariation),
      completed: Math.floor(30 + 12 * randomVariation)
    },
    revenue: {
      today: Math.floor(1000 + 500 * randomVariation),
      week: Math.floor(7000 + 3000 * randomVariation),
      month: Math.floor(28000 + 10000 * randomVariation)
    },
    popular: [
      { name: "Classic Burger", count: Math.floor(20 + 8 * randomVariation) },
      { name: "Caesar Salad", count: Math.floor(15 + 6 * randomVariation) },
      { name: "Margherita Pizza", count: Math.floor(12 + 8 * randomVariation) },
      { name: "Chocolate Cake", count: Math.floor(10 + 5 * randomVariation) }
    ]
  };
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      duration: 0.5 
    }
  }
};

const RestaurantDashboard = () => {
  const { getCurrentRestaurant } = useAuth();
  const currentRestaurant = getCurrentRestaurant();
  
  // If we don't have a current restaurant, show a message
  if (!currentRestaurant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">No Restaurant Selected</h2>
        <p className="mt-2 text-gray-600">Please select or create a restaurant to view the dashboard.</p>
        <Button asChild className="mt-4">
          <Link to="/onboarding">Add Restaurant</Link>
        </Button>
      </div>
    );
  }
  
  // Generate dummy data based on restaurant ID
  const dashboardData = generateDashboardData(currentRestaurant.id);

  return (
    <div className="space-y-6">
      <h1 className="page-title mb-6 flex items-center">
        <img src={currentRestaurant.logo || "/images/potoba-logo.svg"} alt={currentRestaurant.name} className="h-10 mr-2" />
        <span>{currentRestaurant.name} Dashboard</span>
      </h1>

      {/* AI Analytics Section - NEW */}
      <AiAnalytics />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tables Card */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card overflow-hidden border-t-4 border-t-restaurant-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2 text-restaurant-primary" />
                Table Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.tables.total} Tables</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold text-restaurant-available">
                    {dashboardData.tables.available}
                  </div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold text-restaurant-occupied">
                    {dashboardData.tables.occupied}
                  </div>
                  <div className="text-xs text-muted-foreground">Occupied</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold text-restaurant-reserved">
                    {dashboardData.tables.reserved}
                  </div>
                  <div className="text-xs text-muted-foreground">Reserved</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                to="/dashboard/tables"
                className="text-xs text-restaurant-primary flex items-center hover:underline"
              >
                View tables <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Orders Card */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card overflow-hidden border-t-4 border-t-restaurant-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2 text-restaurant-secondary" />
                Orders Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.orders.total} Orders</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold text-restaurant-accent">
                    {dashboardData.orders.pending}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold text-restaurant-available">
                    {dashboardData.orders.completed}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                to="/dashboard/orders"
                className="text-xs text-restaurant-primary flex items-center hover:underline"
              >
                View orders <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Revenue Card */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card overflow-hidden border-t-4 border-t-restaurant-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-restaurant-accent" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.revenue.today}</div>
              <div className="text-xs text-muted-foreground">Today</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <div className="text-sm font-medium">${dashboardData.revenue.week}</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium">${dashboardData.revenue.month}</div>
                  <div className="text-xs text-muted-foreground">This Month</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">Updated just now</span>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Popular Items Card */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card overflow-hidden border-t-4 border-t-restaurant-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Star className="h-4 w-4 mr-2 text-restaurant-primary" />
                Popular Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dashboardData.popular.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {item.count} orders
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link 
                to="/dashboard/menu"
                className="text-xs text-restaurant-primary flex items-center hover:underline"
              >
                Manage menu <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="section-title flex items-center">
                <ChefHat className="h-5 w-5 mr-2 text-restaurant-primary" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Table</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Items</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm">Table 5</td>
                      <td className="px-4 py-3 text-sm">3 items</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-restaurant-secondary/20 text-restaurant-secondary">
                          Preparing
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">Just now</td>
                      <td className="px-4 py-3 text-sm font-medium">$42.50</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm">Table 12</td>
                      <td className="px-4 py-3 text-sm">2 items</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-restaurant-accent/20 text-restaurant-accent">
                          Served
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">15 min ago</td>
                      <td className="px-4 py-3 text-sm font-medium">$28.75</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm">Table 8</td>
                      <td className="px-4 py-3 text-sm">5 items</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-restaurant-available/20 text-restaurant-available">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">25 min ago</td>
                      <td className="px-4 py-3 text-sm font-medium">$64.20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="section-title flex items-center">
                <Coffee className="h-5 w-5 mr-2 text-restaurant-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/dashboard/tables/add">
                <Button className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <Users className="mr-2 h-4 w-4" />
                  Add Table
                </Button>
              </Link>
              <Link to="/dashboard/menu/add">
                <Button className="w-full bg-restaurant-secondary hover:bg-restaurant-secondary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <Utensils className="mr-2 h-4 w-4" />
                  Add Menu Item
                </Button>
              </Link>
              <Link to="/dashboard/tables/reserve">
                <Button className="w-full bg-restaurant-accent hover:bg-restaurant-accent/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reserve Table
                </Button>
              </Link>
              <Link to="/dashboard/orders">
                <Button variant="outline" className="w-full hover:bg-muted/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RestaurantDashboard;
