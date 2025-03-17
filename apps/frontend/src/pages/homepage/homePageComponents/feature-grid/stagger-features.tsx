import { motion } from "motion/react";
import { Brain, Sparkles, Workflow, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Smart content analysis and recommendations",
    color: "text-blue-500",
  },
  {
    icon: Sparkles,
    title: "Auto Enhancement",
    description: "Intelligent content optimization",
    color: "text-purple-500",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Tailored to your content strategy",
    color: "text-green-500",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamless connection with your tools",
    color: "text-yellow-500",
  },
];

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border-2 border-dashed"
    >
      <motion.div
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`${color} mb-4`}
      >
        <Icon size={24} />
      </motion.div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
};

const StaggerFeatures = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2 px-5 pt-2 pb-5">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StaggerFeatures;
