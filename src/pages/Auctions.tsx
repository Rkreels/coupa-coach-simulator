
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, Gavel, Clock, Users, Star } from 'lucide-react';
import { auctions, voiceScripts } from '../data/mockData';

// Import recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const AuctionsPage = () => {
  const [selectedAuction, setSelectedAuction] = useState(auctions[0]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format bid data for the chart
  const bidChartData = selectedAuction.bids.map(bid => ({
    timestamp: new Date(bid.timestamp).toLocaleTimeString(),
    amount: bid.amount,
    supplier: bid.supplierName,
  })).sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <ApplicationLayout 
      pageTitle="Auctions" 
      pageLoadScript={voiceScripts.auctions.pageLoad}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search auctions..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Auction
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Auctions List */}
        <div className="col-span-1">
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Active Auctions</h3>
            </div>
            <div className="divide-y">
              {auctions.map((auction) => (
                <div 
                  key={auction.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedAuction.id === auction.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedAuction(auction)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gavel className="h-4 w-4 text-coupa-blue mr-2" />
                      <span className="font-medium">{auction.title}</span>
                    </div>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        auction.status === 'live' 
                          ? 'bg-green-100 text-green-800 animate-pulse-soft' 
                          : auction.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : auction.status === 'completed' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <div className="flex justify-between mt-1">
                      <span>Current price:</span>
                      <span className="font-medium text-gray-700">{formatCurrency(auction.currentPrice)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Participants:</span>
                      <span className="font-medium text-gray-700">{auction.participants}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>End date:</span>
                      <span className="font-medium text-gray-700">{new Date(auction.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Auction Detail */}
        <div className="col-span-2">
          <Card className="mb-6">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{selectedAuction.title}</h2>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedAuction.status === 'live' 
                      ? 'bg-green-100 text-green-800 animate-pulse-soft' 
                      : selectedAuction.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800' 
                        : selectedAuction.status === 'completed' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedAuction.status.charAt(0).toUpperCase() + selectedAuction.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-500 mt-1">{selectedAuction.description}</p>
            </div>
            
            <div className="p-4 border-b">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Price</p>
                  <p className="font-medium">{formatCurrency(selectedAuction.startingPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="font-medium text-green-600">{formatCurrency(selectedAuction.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Savings</p>
                  <p className="font-medium text-coupa-blue">
                    {formatCurrency(selectedAuction.startingPrice - selectedAuction.currentPrice)}
                    {' '}
                    ({Math.round(((selectedAuction.startingPrice - selectedAuction.currentPrice) / selectedAuction.startingPrice) * 100)}%)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    {selectedAuction.participants}
                  </p>
                </div>
              </div>
            </div>
            
            <VoiceElement
              whatScript={voiceScripts.auctions.bidHistory.what}
              howScript={voiceScripts.auctions.bidHistory.how}
              decisionScript={voiceScripts.auctions.bidHistory.decision}
              className="p-4 border-b"
            >
              <div>
                <h3 className="font-medium mb-4">Bid History</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bidChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis domain={['dataMin', 'dataMax']} />
                      <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="stepAfter" 
                        dataKey="amount" 
                        stroke="#1976d2" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Bid Amount"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </VoiceElement>
            
            <div className="p-4">
              <h3 className="font-medium mb-3">Recent Bids</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedAuction.bids.map((bid) => (
                    <TableRow key={bid.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{bid.supplierName}</TableCell>
                      <TableCell>{formatCurrency(bid.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <VoiceElement
                        whatScript={voiceScripts.auctions.supplierRating.what}
                        howScript={voiceScripts.auctions.supplierRating.how}
                        decisionScript={voiceScripts.auctions.supplierRating.decision}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {suppliers.find(s => s.id === bid.supplierId)?.rating || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                      </VoiceElement>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <Clock className="h-4 w-4" />
              Extend Auction (2h)
            </Button>
            {selectedAuction.status === 'live' && (
              <Button 
                className="bg-coupa-green hover:bg-green-700 text-white"
              >
                Award to Current Leader
              </Button>
            )}
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default AuctionsPage;

// This is a compiler error workaround - in a real app you'd import suppliers properly
const suppliers = [
  {
    id: "SUP-1001",
    rating: 4.2,
  },
  {
    id: "SUP-1002",
    rating: 4.8,
  },
  {
    id: "SUP-1003",
    rating: 3.9,
  },
  {
    id: "SUP-1004",
    rating: 4.4,
  },
  {
    id: "SUP-1005",
    rating: 4.6,
  }
];
