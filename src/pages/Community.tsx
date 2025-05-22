
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, MessageSquare, Users, ThumbsUp, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

// Define types
interface CommunityPost {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  datePosted: string;
  likes: number;
  replies: number;
  tags: string[];
}

interface NewPostData {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

// Initial post data
const initialPosts: CommunityPost[] = [
  {
    id: "POST-001",
    title: "Best practices for invoice approval workflows",
    author: "Sarah Johnson",
    category: "Invoicing",
    content: "I've been working on optimizing our invoice approval workflow and wanted to share some best practices we've implemented...",
    datePosted: "2023-05-15",
    likes: 24,
    replies: 8,
    tags: ["invoicing", "approvals", "best-practices"]
  },
  {
    id: "POST-002",
    title: "How to set up multi-tier supplier catalogs",
    author: "Mike Chen",
    category: "Suppliers",
    content: "We're implementing a multi-tier supplier catalog system and I've found some efficient approaches to categorization...",
    datePosted: "2023-05-10",
    likes: 16,
    replies: 12,
    tags: ["suppliers", "catalogs", "setup"]
  },
  {
    id: "POST-003",
    title: "Supply chain risk mitigation strategies",
    author: "Emily Davis",
    category: "Supply Chain",
    content: "With recent global events affecting supply chains, we've developed several risk mitigation strategies that have proven effective...",
    datePosted: "2023-05-05",
    likes: 42,
    replies: 15,
    tags: ["risk", "supply-chain", "strategy"]
  }
];

// Available categories
const categories = [
  "General Discussion",
  "Invoicing",
  "Payments",
  "Suppliers",
  "Supply Chain",
  "Requisitions",
  "Best Practices",
  "Feature Requests",
  "Troubleshooting"
];

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Form state for creating new posts
  const [newPostData, setNewPostData] = useState<NewPostData>({
    title: '',
    category: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Handle creating a new post
  const handleCreatePost = () => {
    const newPost: CommunityPost = {
      id: `POST-${posts.length + 1}`.padStart(7, '0'),
      title: newPostData.title,
      author: "Current User", // In a real app, would come from auth state
      category: newPostData.category,
      content: newPostData.content,
      datePosted: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: 0,
      tags: newPostData.tags
    };

    // Add the new post to the posts list
    setPosts([newPost, ...posts]);
    
    // Reset form and close dialog
    setNewPostData({
      title: '',
      category: '',
      content: '',
      tags: []
    });
    setTagInput('');
    setIsCreateDialogOpen(false);

    // Show success toast
    toast({
      title: "Post Created",
      description: `Your post "${newPost.title}" has been published.`,
    });
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (!tagInput || newPostData.tags.includes(tagInput)) return;
    
    setNewPostData({
      ...newPostData,
      tags: [...newPostData.tags, tagInput]
    });
    setTagInput('');
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setNewPostData({
      ...newPostData,
      tags: newPostData.tags.filter(t => t !== tag)
    });
  };

  // Handle viewing a post
  const handleViewPost = (post: CommunityPost) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
  };

  // Handle liking a post
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));

    toast({
      title: "Post Liked",
      description: "You liked this post.",
    });
  };

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <ApplicationLayout 
      pageTitle="Community"
      pageLoadScript="Welcome to the Community section. Connect with other Coupa users, share best practices, ask questions, and collaborate on solutions to common challenges."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Category:</span>
            <select 
              className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Discussion
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows total community engagement."
          howScript="Use this to track overall community activity."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Community Members</p>
                <h3 className="text-3xl font-bold text-coupa-blue">1,245</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">+25</span> this month
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows the number of active discussions."
          howScript="Monitor to see what topics are currently being discussed."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Discussions</p>
                <h3 className="text-3xl font-bold text-purple-600">{posts.length}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">12</span> new this week
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows your participation statistics."
          howScript="Use this to track your engagement in the community."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Your Contributions</p>
                <h3 className="text-3xl font-bold text-green-600">17</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ThumbsUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">5</span> posts, <span className="font-medium">12</span> replies
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Replies</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {post.datePosted}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                    {post.replies}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-gray-400 mr-1" />
                    {post.likes}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewPost(post)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleLikePost(post.id)}
                    >
                      Like
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredPosts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No posts found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing {filteredPosts.length} of {posts.length} discussions</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Start New Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newPostData.title}
                onChange={(e) => setNewPostData({...newPostData, title: e.target.value})}
                placeholder="Enter a clear, specific title for your discussion"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newPostData.category}
                onChange={(e) => setNewPostData({...newPostData, category: e.target.value})}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                className="min-h-[150px] w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newPostData.content}
                onChange={(e) => setNewPostData({...newPostData, content: e.target.value})}
                placeholder="Share your question, idea, or experience in detail"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add relevant tags"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newPostData.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                    {tag}
                    <button 
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreatePost}
              disabled={!newPostData.title || !newPostData.category || !newPostData.content}
            >
              Post Discussion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Post Dialog */}
      {selectedPost && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedPost.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {selectedPost.author[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{selectedPost.author}</p>
                    <p className="text-xs text-gray-500">Posted on {selectedPost.datePosted}</p>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {selectedPost.category}
                </span>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <p className="text-gray-800 whitespace-pre-line">{selectedPost.content}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleLikePost(selectedPost.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Like ({selectedPost.likes})
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Reply
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Replies ({selectedPost.replies})</h3>
                
                {selectedPost.replies > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                          J
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">John Smith</p>
                          <p className="text-xs text-gray-500">Posted 2 days ago</p>
                        </div>
                      </div>
                      <p className="text-gray-800">This is really insightful! We've been struggling with a similar issue and your approach could help us.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                          M
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Mary Johnson</p>
                          <p className="text-xs text-gray-500">Posted yesterday</p>
                        </div>
                      </div>
                      <p className="text-gray-800">Have you considered integrating this with our current workflow? I'd be interested to hear more about implementation details.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No replies yet. Be the first to respond!
                  </div>
                )}
                
                <div className="mt-6">
                  <Textarea
                    className="min-h-[100px] w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="Write your reply..."
                  />
                  <div className="mt-3 flex justify-end">
                    <Button>Post Reply</Button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ApplicationLayout>
  );
};

export default Community;
