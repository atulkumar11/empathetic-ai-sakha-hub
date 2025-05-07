
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-sakha-dark-blue text-white" id="video-pitch">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">See Sakha AI in Action</h2>
          <p className="text-lg opacity-80">
            Watch how Sakha AI transforms learning, work productivity, and personal growth through its 
            empathetic and personalized approach.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-sakha-blue to-sakha-purple p-1 rounded-xl">
            <div 
              className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden"
              onClick={() => setIsOpen(true)}
            >
              {/* Placeholder for video thumbnail */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-white hover:bg-white/30 z-10"
              >
                <Play size={36} className="text-white ml-1" fill="white" />
              </Button>
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-xl font-medium">Introducing Sakha AI</h3>
                <p className="opacity-70">3:42 • The future of AI companionship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video
              title="Sakha AI Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoSection;
