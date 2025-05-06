import React, { useState, useEffect } from "react";
import { useAllProductsQuery } from "../redux/api/ProductApiSlice.js";
import { useGetAllSuppliersQuery } from "../redux/api/SupplierApiSlice.js";
import { useSendLowStockAlertsMutation } from "../redux/api/EmailApiSlice.js";
import { FaBox, FaIndustry, FaExclamationTriangle, FaChevronRight, FaEnvelope } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "./Navigation.jsx";

const Dashboard = () => {
  const { data: productsData, isLoading: productsLoading, isError: productsError, error: productsErrorDetails } = useAllProductsQuery();
  const { data: suppliersData, isLoading: suppliersLoading, isError: suppliersError, error: suppliersErrorDetails } = useGetAllSuppliersQuery();
  const [sendLowStockAlerts, { isLoading: isSendingEmail }] = useSendLowStockAlertsMutation();
  
  const products = productsData || [];
  const suppliers = suppliersData || [];

  // Debug logging
  useEffect(() => {
    console.log('Products data:', products);
    console.log('Products loading:', productsLoading);
    console.log('Products error:', productsError);
    console.log('Products error details:', productsErrorDetails);
    console.log('Suppliers data:', suppliers);
    console.log('Suppliers loading:', suppliersLoading);
    console.log('Suppliers error:', suppliersError);
    console.log('Suppliers error details:', suppliersErrorDetails);
  }, [products, productsLoading, productsError, productsErrorDetails, suppliers, suppliersLoading, suppliersError, suppliersErrorDetails]);
  
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    activeSuppliers: 0,
    lowStockItems: 0
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);
  
  // Chart options
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: ['#6366F1', '#10B981', '#F43F5E'],
    labels: ['Total Products', 'Normal Stock', 'Low Stock'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Inter, sans-serif',
              color: '#333',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '26px',
              fontFamily: 'Inter, sans-serif',
              color: '#333',
              offsetY: 16,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              color: '#666',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  });
  
  const [chartSeries, setChartSeries] = useState([0, 0, 0]);

  useEffect(() => {
    // Only update metrics when both products and suppliers are loaded
    if (products?.length > 0 && suppliers) {
      console.log('Products loaded:', products.length);
      console.log('Suppliers loaded:', suppliers.length);
      
      // Count low stock items (less than 10 in stock)
      const lowStockThreshold = 10;
      const lowStockItems = products.filter(product => {
        // Check both quantity and stock fields
        const stock = product.quantity || product.stock || 0;
        console.log('Product:', product);
        console.log('Product stock:', stock);
        console.log('Is low stock?', stock < lowStockThreshold);
        return stock < lowStockThreshold;
      });
      
      console.log('Low stock items:', lowStockItems);
      console.log('Low stock items count:', lowStockItems.length);
      
      setLowStockProducts(lowStockItems);
      
      // Update metrics
      const newMetrics = {
        totalProducts: products.length,
        activeSuppliers: suppliers.length,
        lowStockItems: lowStockItems.length
      };
      console.log('Updating metrics:', newMetrics);
      setMetrics(newMetrics);
      
      // Update chart data
      const newChartSeries = [
        products.length,
        products.length - lowStockItems.length,
        lowStockItems.length
      ];
      console.log('Updating chart series:', newChartSeries);
      setChartSeries(newChartSeries);
    } else {
      console.log('Products or suppliers not loaded yet:', {
        productsLength: products?.length,
        suppliers: suppliers
      });
    }
  }, [products, suppliers]);

  // Add debug logging for metrics state
  useEffect(() => {
    console.log('Current metrics state:', metrics);
    console.log('Should show email button?', metrics.lowStockItems > 0);
  }, [metrics]);

  // Function to handle sending email alerts for low stock items
  const handleSendEmailAlert = async () => {
    try {
      // Call the backend API to send real emails
      const response = await sendLowStockAlerts({ threshold: 10 }).unwrap();
      
      if (response.success) {
        if (response.emailsSent > 0) {
          toast.success(
            `Successfully sent ${response.emailsSent} email alerts to suppliers` + 
            (response.failedEmails > 0 ? ` (${response.failedEmails} failed)` : ""),
            { autoClose: 5000 }
          );
          
          // Show which suppliers received emails
          response.details.sent.forEach(item => {
            toast.info(`Sent alert to ${item.supplier} about ${item.productCount} products`, 
              { autoClose: 3000 });
          });
        } else {
          // If no emails were sent despite API success
          toast.warning(
            "No emails were sent because no suppliers matched with low stock items. Check supplier details.",
            { autoClose: 5000 }
          );
          
          if (response.details.unassignedProducts?.length > 0) {
            toast.info(
              `Unmatched products: ${response.details.unassignedProducts.join(', ')}`,
              { autoClose: 5000 }
            );
          }
        }
      } else {
        toast.error("Failed to send email alerts. Please try again.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error(error?.data?.message || "Failed to send email alerts. Please try again.");
    }
  };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

  const handleGeneratePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      setPdfProgress(0);
      console.log('Starting PDF generation...');

      const response = await fetch('/api/pdf/inventory', {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (contentType && contentType.includes('application/pdf')) {
        setPdfProgress(50);
        const blob = await response.blob();
        setPdfProgress(75);
        console.log('Blob size:', blob.size);
        console.log('Blob type:', blob.type);
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory-report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setPdfProgress(100);
        toast.success('PDF report generated successfully');
      } else {
        const text = await response.text();
        console.error('Unexpected response type:', text);
        throw new Error('Server did not return a PDF file');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(error.message || 'Failed to generate PDF report');
    } finally {
      setIsGeneratingPDF(false);
      setPdfProgress(0);
    }
  };

  if (productsError || suppliersError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading dashboard data</h2>
          <p className="text-gray-600 mb-4">Please try refreshing the page</p>
          <p className="text-sm text-gray-500">
            Error details: {productsErrorDetails?.message || suppliersErrorDetails?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (productsLoading || suppliersLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</span>
      </div>
    </div>
  );

  return (
    <>
    <Navigation/>
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Clear Vision</h1>
            <p className="text-gray-500">Inventory Management System</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Report...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Generate Inventory Report</span>
                </>
              )}
            </button>
            {isGeneratingPDF && (
              <div className="w-48">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${pdfProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </header>
        
        {/* Metrics Cards with modern styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Products Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="rounded-full bg-indigo-50 p-3.5 flex items-center justify-center">
                <FaBox className="text-indigo-600 text-xl" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <div className="flex items-end mt-1">
                  <h2 className="text-3xl font-bold text-gray-900">{metrics.totalProducts}</h2>
                  <Link to="/allProductList" className="ml-2 text-indigo-600 text-xs flex items-center hover:text-indigo-800 transition-colors">
                    View All <FaChevronRight size={10} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Suppliers Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="rounded-full bg-emerald-50 p-3.5 flex items-center justify-center">
                <FaIndustry className="text-emerald-600 text-xl" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Active Suppliers</p>
                <div className="flex items-end mt-1">
                  <h2 className="text-3xl font-bold text-gray-900">{metrics.activeSuppliers}</h2>
                  <Link to="/suppliers" className="ml-2 text-emerald-600 text-xs flex items-center hover:text-emerald-800 transition-colors">
                    View All <FaChevronRight size={10} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Low Stock Items Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="rounded-full bg-rose-50 p-3.5 flex items-center justify-center">
                  <FaExclamationTriangle className="text-rose-600 text-xl" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                  <div className="flex items-end mt-1">
                    <h2 className="text-3xl font-bold text-gray-900">{metrics.lowStockItems}</h2>
                    {metrics.lowStockItems > 0 && (
                      <span className="ml-2 text-rose-600 text-xs bg-rose-50 px-2 py-0.5 rounded-full">
                        Needs attention
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Email Alert Button - Always visible when there are low stock items */}
              {metrics.lowStockItems > 0 && (
                <div className="flex items-center">
                  <button
                    onClick={handleSendEmailAlert}
                    disabled={isSendingEmail}
                    className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <FaEnvelope className="text-lg" />
                    <span>{isSendingEmail ? 'Sending...' : 'Send Email Alert'}</span>
                  </button>
                </div>
              )}
            </div>
            
            {metrics.lowStockItems > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                <Link to="/allProductList" className="text-rose-600 hover:text-rose-800 underline text-sm">
                  View low stock items
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Chart and Recent Products Section with modern styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Inventory Status</h3>
              <p className="text-sm text-gray-500 mb-6">Distribution of products by stock level</p>
              <div className="h-80">
                <ReactApexChart 
                  options={chartOptions} 
                  series={chartSeries} 
                  type="donut" 
                  height="100%" 
                />
              </div>
            </div>
          </div>
          
          {/* Recent Products List */}
          <div className="bg-white rounded-xl shadow-sm border border-black-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Products</h3>
                  <p className="text-sm text-gray-500">Latest additions to your inventory</p>
                </div>
                <Link 
                  to="/allProductList" 
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                >
                  View all
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products && products.slice(0, 5).map(product => (
                      <tr 
                        key={product._id} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3.5 whitespace-nowrap font-medium text-gray-800">
                          <Link to={`/product/update/${product._id}`} className="hover:text-indigo-600 transition-colors">
                            {product.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{product.brand}</td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">
                          <span className="font-medium">${product.price}</span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.quantity < 10 
                                ? 'bg-rose-100 text-rose-800' 
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                    
                    {/* If no products, show empty state */}
                    {(!products || products.length === 0) && (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No products found. Add some products to your inventory.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </> 
  );
};

export default Dashboard;
