import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import Navbar from "~/components/landing/nav-bar";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10"></div>
          <div className="relative text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your study needs. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <Card className="relative bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white">Free</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-400">
                  Perfect for trying out TurboStudy
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">5 uploads per month</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Basic note generation</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">50 AI questions per month</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Basic flashcards</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-blue-500 border-2 shadow-2xl shadow-blue-500/20 bg-gray-800/80">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$12</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-400">
                  For serious students who want more
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Unlimited uploads</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Advanced AI note generation</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Unlimited AI questions</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Smart flashcards with spaced repetition</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Progress tracking & analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Team Plan */}
            <Card className="relative bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white">Team</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$8</span>
                  <span className="text-gray-400">/user/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-400">
                  For study groups and classmates
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Shared note libraries</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Real-time collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Team analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Admin controls</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-300">
                Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until your current billing period ends.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What file formats do you support?
              </h3>
              <p className="text-gray-300">
                We support PDF, PowerPoint (PPT/PPTX), images (JPG, PNG), and many other common formats used in academic settings.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is there a student discount?
              </h3>
              <p className="text-gray-300">
                Yes! Students with valid .edu email addresses get 50% off Pro plans. Contact us to verify your student status.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How does the AI chatbot work?
              </h3>
              <p className="text-gray-300">
                Our AI analyzes your uploaded materials and creates a knowledge base. You can then ask questions about any content from your notes and get instant, contextual answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try TurboStudy free for 7 days. No credit card required.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-4 font-semibold border-0 shadow-lg shadow-blue-500/25"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                TurboStudy
              </h3>
              <p className="text-gray-400">
                AI-powered study tools for students
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="/#features" className="hover:text-blue-400 transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 TurboStudy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
