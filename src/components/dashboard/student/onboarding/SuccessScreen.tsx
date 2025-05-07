
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function SuccessScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="shadow-xl overflow-hidden border-0">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-center text-white">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Smart Plan is Ready!</h2>
            <p>We've created a personalized study plan just for you</p>
          </div>
          <CardContent className="p-6 text-center">
            <div className="space-y-4 mb-6">
              <div className="animate-pulse flex justify-center">
                <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1"></div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1 animation-delay-200"></div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1 animation-delay-400"></div>
              </div>
              <p className="text-gray-600">Taking you to your dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
