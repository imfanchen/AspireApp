import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Hammer,
  Mail,
  Instagram,
  Github,
  Linkedin,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export function UnderConstruction() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-primary/10 p-6 rounded-full">
                <Hammer className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>

          <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-balance text-primary">
            We're Building Something Great!
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our team is working hard to bring you an amazing experience. Stay
            tuned for updates and be the first to know when we launch.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Modern Design</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, responsive interface built with the latest
                technologies
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="bg-secondary/10 p-3 rounded-full w-fit mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized performance for the best user experience
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="bg-accent/10 p-3 rounded-full w-fit mx-auto">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Stay Connected</h3>
              <p className="text-sm text-muted-foreground">
                Get notified when we launch and receive exclusive updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Email Subscription */}
        <Card className="w-full max-w-md mb-8">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Get Notified</h2>
              <p className="text-muted-foreground">
                Be the first to know when we launch
              </p>

              {isSubscribed ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-lg">
                    <p className="font-medium">Thank you for subscribing!</p>
                    <p className="text-sm">
                      We'll keep you updated on our progress.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Notify Me When We Launch
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Follow us for updates</p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
            >
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-border w-full max-w-4xl">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>&copy; 2025 College Point Technology. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
