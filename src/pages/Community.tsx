
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, FileText, HelpCircle, Users, Plus, ThumbsUp, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);

  const discussionCategories = [
    { id: 'all', name: 'All Topics', count: 120 },
    { id: 'invoicing', name: 'Invoicing', count: 42 },
    { id: 'procurement', name: 'Procurement', count: 38 },
    { id: 'sourcing', name: 'Sourcing', count: 25 },
    { id: 'expenses', name: 'Expenses', count: 15 },
  ];
  
  // Sample discussion data
  const discussions = [
    {
      id: 1,
      title: 'How to configure approval workflows for complex organizations?',
      author: 'John Smith',
      authorAvatar: '1',
      replies: 12,
      views: 156,
      category: 'procurement',
      lastActive: '2 days ago',
      likes: 8,
      isSticky: true,
      participants: ['1', '2', '3']
    },
    {
      id: 2,
      title: 'Best practices for invoice exception handling',
      author: 'Sarah Johnson',
      authorAvatar: '2',
      replies: 8,
      views: 103,
      category: 'invoicing',
      lastActive: '5 hours ago',
      likes: 5,
      isSticky: false,
      participants: ['2', '4', '5']
    },
    {
      id: 3,
      title: 'Integration with SAP: common challenges and solutions',
      author: 'Michael Chen',
      authorAvatar: '3',
      replies: 15,
      views: 210,
      category: 'invoicing',
      lastActive: '1 day ago',
      likes: 12,
      isSticky: false,
      participants: ['3', '1', '5']
    },
    {
      id: 4,
      title: 'Setting up commodity codes for sourcing events',
      author: 'Lisa Wong',
      authorAvatar: '4',
      replies: 6,
      views: 98,
      category: 'sourcing',
      lastActive: '3 days ago',
      likes: 3,
      isSticky: false,
      participants: ['4', '2']
    },
    {
      id: 5,
      title: 'Mobile expense report submission troubleshooting',
      author: 'Robert Martinez',
      authorAvatar: '5',
      replies: 10,
      views: 145,
      category: 'expenses',
      lastActive: '12 hours ago',
      likes: 7,
      isSticky: false,
      participants: ['5', '1', '3', '4']
    },
  ];
  
  // Articles data
  const articles = [
    {
      id: 1,
      title: 'Getting Started with Invoice Management',
      description: 'Learn how to set up and optimize your invoice processing workflow.',
      category: 'Setup Guide',
      readTime: '5 min',
      views: 1245,
    },
    {
      id: 2,
      title: 'Advanced Approval Workflows',
      description: 'Configure multi-level approvals for different organizational structures.',
      category: 'Best Practice',
      readTime: '8 min',
      views: 980,
    },
    {
      id: 3,
      title: 'Supplier Onboarding Best Practices',
      description: 'Streamline your supplier onboarding process with these proven techniques.',
      category: 'Guide',
      readTime: '6 min',
      views: 876,
    },
  ];

  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === activeCategory);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <ApplicationLayout 
      pageTitle="Community"
      pageLoadScript="Welcome to the Coupa Community. Connect with other Coupa users, access knowledge base articles, and get support for your questions."
    >
      <div className="mb-6 flex justify-between items-center">
        <form onSubmit={handleSearch} className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search community resources..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
          onClick={() => setShowNewDiscussionForm(!showNewDiscussionForm)}
        >
          <Plus className="h-4 w-4" /> 
          New Discussion
        </Button>
      </div>
      
      {showNewDiscussionForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                placeholder="Enter a descriptive title for your discussion"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                {discussionCategories.filter(c => c.id !== 'all').map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                rows={5}
                placeholder="Describe your question or topic in detail"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowNewDiscussionForm(false)}
              >
                Cancel
              </Button>
              <Button className="bg-coupa-blue hover:bg-coupa-darkblue text-white">
                Post Discussion
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="discussions" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Discussions
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Support
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions">
          <div className="flex mb-6">
            <div className="w-56 pr-6">
              <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-1">
                {discussionCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className={`w-full justify-start ${activeCategory === category.id ? 'bg-gray-100 text-coupa-blue' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-auto">{category.count}</Badge>
                  </Button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Stats</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Topics:</span>
                    <span className="font-medium">120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts:</span>
                    <span className="font-medium">843</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="font-medium">38</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Discussions</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="text-sm border border-gray-300 rounded-md py-1 px-2">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Replies</option>
                  </select>
                </div>
              </div>

              <Card>
                <div className="divide-y">
                  {filteredDiscussions.map((discussion) => (
                    <div 
                      key={discussion.id} 
                      className={`p-4 hover:bg-gray-50 ${discussion.isSticky ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            {discussion.isSticky && (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pinned</Badge>
                            )}
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              {discussionCategories.find(c => c.id === discussion.category)?.name || discussion.category}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-coupa-blue">{discussion.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" /> {discussion.replies} replies
                            </span>
                            <span>•</span>
                            <span>{discussion.views} views</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" /> {discussion.likes}
                            </span>
                            <span>•</span>
                            <span>Last post {discussion.lastActive}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {discussion.participants.map((participant, index) => (
                              <Avatar key={index} className="w-8 h-8 border-2 border-white">
                                <div className="bg-gray-300 w-full h-full flex items-center justify-center text-xs text-gray-600">
                                  {participant}
                                </div>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>Showing {filteredDiscussions.length} of {discussions.length} discussions</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <span className="px-3 py-1 border rounded">1</span>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <VoiceElement
              whatScript="This section provides access to the community knowledge base."
              howScript="Browse articles and guides for using Coupa effectively."
            >
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                  <p className="text-gray-600 mb-4">New to Coupa? Start here with our comprehensive guides.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800">Setup</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Basics</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Tutorials</Badge>
                  </div>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This section provides access to advanced guides."
              howScript="Access technical documentation for advanced Coupa features."
            >
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <BarChart3 className="h-8 w-8 text-coupa-blue" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Best Practices</h3>
                  <p className="text-gray-600 mb-4">Learn optimal strategies for using Coupa in your organization.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800">Optimization</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Advanced</Badge>
                  </div>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This section provides access to integration documentation."
              howScript="Learn how to integrate Coupa with other systems."
            >
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">User Guides</h3>
                  <p className="text-gray-600 mb-4">Step-by-step guides for specific user roles and tasks.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800">Admin</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Buyer</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Approver</Badge>
                  </div>
                </div>
              </Card>
            </VoiceElement>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Popular Knowledge Articles</h2>
          <Card className="mb-6">
            <div className="divide-y">
              {articles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50">
                  <h3 className="font-medium text-coupa-blue">{article.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {article.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded mr-2">{article.category}</span>
                    <span className="text-gray-500">{article.readTime} read • {article.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="support">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-3">Contact Support</h3>
              <p className="text-gray-600 mb-4">
                Need help with a specific issue? Our support team is ready to assist you.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                    rows={4}
                    placeholder="Please provide details about your issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                    <option>Low - General Question</option>
                    <option>Medium - Issue affecting work</option>
                    <option>High - Critical Issue</option>
                  </select>
                </div>
                <Button className="bg-coupa-blue hover:bg-coupa-darkblue text-white">
                  Submit Ticket
                </Button>
              </div>
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-3">Support Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-coupa-blue hover:underline">
                      <FileText className="h-4 w-4 mr-2" /> Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-coupa-blue hover:underline">
                      <FileText className="h-4 w-4 mr-2" /> Troubleshooting Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-coupa-blue hover:underline">
                      <FileText className="h-4 w-4 mr-2" /> System Requirements
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-coupa-blue hover:underline">
                      <FileText className="h-4 w-4 mr-2" /> Release Notes
                    </a>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-3">Support Hours</h3>
                <p className="text-gray-600 mb-2">Our support team is available:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>Monday - Friday: 8:00 AM - 8:00 PM EST</li>
                  <li>Saturday: 9:00 AM - 5:00 PM EST</li>
                  <li>Sunday: Closed</li>
                </ul>
                <p className="mt-4 text-gray-600">
                  For urgent issues outside of these hours, please use our emergency support hotline.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </ApplicationLayout>
  );
};

export default Community;
