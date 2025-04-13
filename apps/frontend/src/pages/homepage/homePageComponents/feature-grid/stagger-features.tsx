import { motion } from "motion/react";
import { Brain, Sparkles, Workflow, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "One-Stop Posting",
    description: "Manage, create and schedule your post",
    color: "text-blue-500",
  },
  {
    icon: Sparkles,
    title: "Upcoming Integrations",
    description: "Twitter support and scheduled posts, coming soon",
    color: "text-purple-500",
  },
  {
    icon: Workflow,
    title: "Contextual Relevance",
    description: "Upload sources to provide context for AI-generated posts",
    color: "text-green-500",
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
      className="relative bg-black rounded-xl p-3 backdrop-blur-sm border-2 "
    >
      <motion.div
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`${color} mb-4`}
      >
        <Icon size={16} />
      </motion.div>

      <h3 className="text-lg font-semibold ">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
};

const StaggerFeatures = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 px-5 pt-2 pb-5 w-full">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StaggerFeatures;
