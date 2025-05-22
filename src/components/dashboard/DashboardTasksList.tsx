
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const DashboardTasksList = () => {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: '1',
      title: 'Review Q2 budget proposal',
      dueDate: 'Today',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Approve supplier invoices',
      dueDate: 'Tomorrow',
      completed: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Update procurement policy',
      dueDate: 'May 25',
      completed: false,
      priority: 'low'
    },
    {
      id: '4',
      title: 'Complete supplier evaluation form',
      dueDate: 'May 28',
      completed: false,
      priority: 'medium'
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 ${
            task.completed ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label 
              htmlFor={`task-${task.id}`}
              className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </label>
          </div>
          <div className="flex items-center gap-2">
            {getPriorityBadge(task.priority)}
            <span className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {task.dueDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
