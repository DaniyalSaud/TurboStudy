import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import Navbar from "~/components/landing/nav-bar";
import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
          <div className="relative text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About TurboStudy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize how students learn by making AI-powered study tools 
              accessible, intelligent, and incredibly easy to use.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every student deserves access to personalized, intelligent study tools that adapt to their learning style. 
                We believe that technology should make learning more efficient, not more complicated.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                TurboStudy was born from the frustration of spending hours creating study notes from lecture slides. 
                We knew there had to be a better way, and AI was the answer.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Today, we're helping thousands of students worldwide transform their study materials into comprehensive, 
                interactive learning experiences that actually help them succeed.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-8 shadow-lg dark:shadow-xl">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">100K+</div>
                <div className="text-gray-600 dark:text-gray-300 mb-6">Students helped</div>
                
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">1M+</div>
                <div className="text-gray-600 dark:text-gray-300 mb-6">Notes generated</div>
                
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">500K+</div>
                <div className="text-gray-600 dark:text-gray-300">AI questions answered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-2xl dark:hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-gray-900 dark:text-white mb-4">Speed & Efficiency</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  We believe your time is valuable. Our tools help you study faster and more effectively, 
                  so you can focus on what matters most.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-2xl dark:hover:shadow-2xl hover:shadow-green-500/10 dark:hover:shadow-green-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 border border-green-500/20 dark:border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-gray-900 dark:text-white mb-4">Innovation</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  We're constantly pushing the boundaries of what's possible with AI and machine learning 
                  to create better study experiences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-2xl dark:hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-500/20 dark:border-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-gray-900 dark:text-white mb-4">Accessibility</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Quality education tools should be accessible to everyone. We offer free plans and student discounts 
                  to make learning affordable.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're a passionate team of educators, engineers, and students working to transform education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-xl dark:hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 border border-blue-500/30 dark:border-blue-500/50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">AS</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Alex Smith</CardTitle>
                <CardDescription className="mb-4 text-blue-600 dark:text-blue-400">Co-Founder & CEO</CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Former Stanford CS student who struggled with note-taking and decided to build a solution
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-xl dark:hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30 border border-purple-500/30 dark:border-purple-500/50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">MJ</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Maria Johnson</CardTitle>
                <CardDescription className="mb-4 text-purple-600 dark:text-purple-400">Co-Founder & CTO</CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI researcher with a PhD from MIT, passionate about making AI accessible to students
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-center hover:shadow-xl dark:hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-500/10 transition-all duration-300">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30 border border-green-500/30 dark:border-green-500/50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-300">DL</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white">David Lee</CardTitle>
                <CardDescription className="mb-4 text-green-600 dark:text-green-400">Head of Product</CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Former education technology consultant who understands what students really need
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              TurboStudy started in a Stanford dorm room in 2023. Our founder, Alex, was spending hours every week 
              manually converting lecture slides into study notes. As a computer science student, he knew there had to be 
              a better way to leverage technology for learning.
            </p>

            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              After partnering with Maria, an AI researcher, they built the first version of TurboStudy in just 3 months. 
              The initial prototype could take a PDF of lecture slides and generate basic notes using early AI models.
            </p>

            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Word spread quickly around campus. Within a semester, hundreds of Stanford students were using TurboStudy. 
              The feedback was overwhelmingly positive, but students wanted more – they wanted to ask questions about 
              their notes, create flashcards, and track their progress.
            </p>

            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Today, TurboStudy has grown into a comprehensive AI-powered study platform used by students at universities 
              worldwide. We've processed millions of lecture slides, generated countless study materials, and helped 
              students save thousands of hours of study time.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              But we're just getting started. Our vision is to create a future where every student has access to 
              personalized, AI-powered education tools that adapt to their unique learning style and help them achieve 
              their academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
              Help us transform education for students worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-gray-200 text-lg px-8 py-4 font-semibold border-0 shadow-lg shadow-blue-500/25"
                >
                  Start Using TurboStudy
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 dark:border-white/40 dark:text-white dark:hover:bg-white/20 text-lg px-8 py-4 font-semibold"
              >
                We're Hiring
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                TurboStudy
              </h3>
              <p className="text-gray-300 dark:text-gray-400">
                AI-powered study tools for students
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-300 dark:text-gray-400">
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><a href="/#features" className="hover:text-blue-400 transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-300 dark:text-gray-400">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-300 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 TurboStudy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
