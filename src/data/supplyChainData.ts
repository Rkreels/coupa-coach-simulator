
export const supplyChainData = {
  totalCost: 107837135,
  totalFlowUnits: "38.13M",
  flowUnitsByProduct: [
    { product: "Product1", value: 15.8 },
    { product: "Product2", value: 10.2 },
    { product: "Product21", value: 15.8 },
    { product: "Product22", value: 10.1 },
    { product: "Product23", value: 7.8 },
    { product: "Product24", value: 8.4 },
    { product: "Product25", value: 8.0 },
    { product: "Product3", value: 8.5 },
    { product: "Product5", value: 15.5 }
  ],
  customerFlowDetails: [
    { 
      source: "DC_GA", 
      customer: "CZ_0145", 
      product: "Product1", 
      mode: "DC_CUST", 
      period: "SINGLEPERIOD",
      totalFlowUnits: 60900.00,
      totalCost: 64820.24,
      averageFlowCostPerUnit: 1.06
    },
    { 
      source: "DC_ME", 
      customer: "CZ_0146", 
      product: "Product1", 
      mode: "DC_CUST", 
      period: "SINGLEPERIOD",
      totalFlowUnits: 64200.00,
      totalCost: 175812.92,
      averageFlowCostPerUnit: 2.75 
    },
    { 
      source: "DC_WY", 
      customer: "CZ_0147", 
      product: "Product1", 
      mode: "DC_CUST", 
      period: "SINGLEPERIOD",
      totalFlowUnits: 52200.00,
      totalCost: 176464.21,
      averageFlowCostPerUnit: 3.38 
    }
  ],
  // Mock data for scatter plot
  flowUnitsByCost: [
    { source: "DC_GA", flowUnits: 7.5, cost: 20000000 },
    { source: "DC_WY", flowUnits: 8.8, cost: 30000000 },
    { source: "DC_NY", flowUnits: 9.2, cost: 40000000 },
    { source: "DC_ME", flowUnits: 12.1, cost: 50000000 }
  ],
  // Mock data for bar chart
  customerPerformance: Array.from({ length: 20 }, (_, i) => ({
    customer: `CZ_0${i + 40}`,
    flowUnits: Math.floor(Math.random() * 30000) + 30000,
    totalCost: Math.floor(Math.random() * 1000000) + 1000000
  }))
};

export const voiceScripts = {
  supplyChain: {
    pageLoad: "Welcome to the Supply Chain dashboard. Here you can monitor your supply chain performance, analyze flow costs, and identify optimization opportunities across your network.",
    costOverview: {
      what: "This is the total cost overview. It shows the current total cost across your entire supply chain.",
      how: "This metric is calculated by summing all transportation, inventory, and operational costs across your network.",
      decision: "If this number is trending higher than your benchmark of 100 million, consider reviewing high-cost flows in the details table below."
    },
    flowUnitsChart: {
      what: "This pie chart shows the distribution of flow units by product across your supply chain.",
      how: "Each segment represents a product's percentage of total flow. Click on a segment to filter the dashboard by that product.",
      decision: "Products with larger segments may be candidates for special logistics arrangements or volume discounts."
    },
    costBySource: {
      what: "This scatter plot visualizes the relationship between flow units and cost by source location.",
      how: "Each dot represents a source location. The x-axis shows flow units, and the y-axis shows cost.",
      decision: "Locations in the upper left quadrant have high costs but low flow units, suggesting potential inefficiencies to investigate."
    },
    customerFlow: {
      what: "This chart displays flow units and costs by customer.",
      how: "The bars represent flow units, and the line shows the corresponding costs. You can sort by clicking column headers.",
      decision: "Look for customers with high costs but low flow units, as these may benefit from order consolidation strategies."
    },
    flowDetails: {
      what: "This table provides detailed information about customer flows across your supply chain.",
      how: "You can filter and sort the table by clicking on column headers or using the search fields above each column.",
      decision: "Use this table to identify specific flows with unusually high cost-per-unit values, which may indicate routing inefficiencies."
    }
  }
};
