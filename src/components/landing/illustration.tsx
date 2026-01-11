'use client';

import { ShieldCheck, FileText, Rocket, Search } from 'lucide-react';

export default function Illustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto" data-ai-hint="supplier profile">
      <div className="aspect-[4/3] w-full rounded-2xl bg-secondary/50 border border-border/60 p-4 shadow-lg">
        <div className="w-full h-full rounded-lg bg-background flex flex-col p-6 relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="w-32 h-4 bg-muted-foreground/30 rounded-full" />
              <div className="w-20 h-3 bg-muted-foreground/20 rounded-full mt-2" />
            </div>
          </div>
          {/* Body */}
          <div className="space-y-3 flex-grow">
            <div className="w-full h-3 bg-muted-foreground/20 rounded-full" />
            <div className="w-full h-3 bg-muted-foreground/20 rounded-full" />
            <div className="w-3/4 h-3 bg-muted-foreground/20 rounded-full" />
          </div>
          {/* Footer */}
          <div className="flex justify-between items-end">
            <div className="space-y-2">
                <div className="w-24 h-3 bg-muted-foreground/20 rounded-full" />
                <div className="w-16 h-3 bg-muted-foreground/30 rounded-full" />
            </div>
            <div className="w-20 h-8 bg-primary rounded-lg" />
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -left-8 bg-card border border-border p-3 rounded-full shadow-xl animate-float-delay-1">
             <Search className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-card border border-border p-4 rounded-full shadow-xl animate-float">
             <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute -bottom-6 -left-12 bg-card border border-border p-3 rounded-full shadow-xl animate-float-delay-2">
             <FileText className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay-1 {
            animation: float 4.5s ease-in-out infinite;
        }
        .animate-float-delay-2 {
            animation: float 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
