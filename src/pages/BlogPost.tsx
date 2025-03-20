
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, this would be fetched from an API
      const mockPost: BlogPost = {
        id: Number(id),
        title: "Building Real-time Multiplayer Games with Socket.io",
        content: `
          <p>In the world of online gaming, real-time interaction is essential for creating engaging and immersive experiences. Socket.io, combined with React and Node.js, offers a powerful toolkit for building real-time multiplayer games that can handle thousands of concurrent users.</p>
          
          <h2>Understanding WebSockets and Socket.io</h2>
          <p>WebSockets provide a persistent connection between a client and server, allowing for real-time, bi-directional communication. Socket.io is a library that enables real-time, event-based communication in web applications, building on the WebSocket protocol while providing fallbacks for older browsers.</p>
          
          <h2>Setting Up the Backend</h2>
          <p>The first step in creating a multiplayer game is setting up a robust backend that can handle real-time connections. Using Node.js with Express and Socket.io creates a solid foundation:</p>
          
          <pre><code>const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinGame', (gameId) => {
    socket.join(gameId);
    // Logic for joining a game room
  });
  
  socket.on('makeMove', (data) => {
    // Process the move
    // Broadcast to other players
    socket.to(data.gameId).emit('moveMade', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Handle player disconnection
  });
});

server.listen(3001, () => console.log('Server running on port 3001'));</code></pre>
          
          <h2>Building the React Frontend</h2>
          <p>On the client side, React provides a flexible framework for building interactive user interfaces. Integrating Socket.io with React allows for responsive gameplay:</p>
          
          <pre><code>import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function GameBoard({ gameId, playerId }) {
  const [gameState, setGameState] = useState(initialState);
  
  useEffect(() => {
    // Join the game room
    socket.emit('joinGame', gameId);
    
    // Listen for moves from other players
    socket.on('moveMade', (data) => {
      setGameState(prevState => updateGameState(prevState, data));
    });
    
    return () => {
      socket.off('moveMade');
    };
  }, [gameId]);
  
  const handleMove = (moveData) => {
    // Update local state
    setGameState(prevState => updateGameState(prevState, moveData));
    
    // Send move to server
    socket.emit('makeMove', {
      gameId,
      playerId,
      ...moveData
    });
  };
  
  return (
    <div className="game-board">
      {/* Render game components based on gameState */}
    </div>
  );
}</code></pre>
          
          <h2>Optimizing for Performance</h2>
          <p>Real-time multiplayer games require careful optimization to ensure smooth gameplay for all players. Some key techniques include:</p>
          
          <ul>
            <li>Implementing efficient data structures to minimize message size</li>
            <li>Using Redis for pub/sub messaging and caching game state</li>
            <li>Implementing room-based communication to limit broadcast scope</li>
            <li>Adding compression for WebSocket messages</li>
            <li>Using worker threads for CPU-intensive operations</li>
          </ul>
          
          <h2>Handling Latency and Synchronization</h2>
          <p>One of the biggest challenges in multiplayer games is dealing with network latency and keeping all players synchronized. Techniques like client-side prediction and server reconciliation can help create a smooth experience despite network delays.</p>
          
          <h2>Conclusion</h2>
          <p>Building real-time multiplayer games with Socket.io, React, and Node.js offers a powerful combination for creating engaging online experiences. By understanding the core principles of real-time communication and implementing robust synchronization strategies, developers can create compelling multiplayer games that resonate with players around the world.</p>
        `,
        date: "June 15, 2023",
        readTime: "8 min",
        category: "Web Development",
        author: "Ajay Gupta",
        image: "https://via.placeholder.com/1200x600",
      };
      
      setPost(mockPost);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : post ? (
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-16 max-w-4xl"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} read
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-10">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
