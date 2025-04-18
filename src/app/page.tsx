"use client"; // Need client component for state and event handlers

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

// Define a type for our todo items
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (!newTodoText.trim()) return; // Don't add empty todos

    const newTodo: Todo = {
      id: Date.now(), // Simple unique ID using timestamp
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Clear the input field
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12 md:p-24">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>My Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new todo..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Add</Button>
          </form>
          <div className="space-y-3">
            {todos.length === 0 && (
              <p className="text-muted-foreground text-center">No todos yet!</p>
            )}
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 p-2 border rounded-md">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodoCompletion(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-grow text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {todo.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-destructive hover:bg-destructive/10"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete todo"
                >
                  {/* You might want to add an actual icon here later, e.g., from lucide-react */}
                  X
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          You have {todos.filter(t => !t.completed).length} pending task(s).
        </CardFooter>
      </Card>
    </main>
  );
}
