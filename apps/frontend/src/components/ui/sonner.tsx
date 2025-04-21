import { Check, CircleX, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        // Default classNames for all toasts
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-full",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:text-green-500 group-[.toaster]:bg-white group-[.toaster]:dark:bg-green-900 group-[.toaster]:border group-[.toaster]:border-green-300 rounded-full",
          error: "group-[.toast]:text-red-500 group-[.toaster]:bg-white group-[.toaster]:border-2 group-[.toaster]:dark:bg-red-900 group-[.toaster]:border-red-300 rounded-full",
        },
      }}
      icons={{
        success: (
          <div className="text-green-700 dark:text-green-100 bg-green-200 dark:bg-green-950 rounded-full p-1">
            <Check className="size-3" />
          </div>
        ),
        error: (
          <div className="text-red-700 dark:text-red-100 bg-red-200 dark:bg-red-950 rounded-full p-1">
            <X className="size-3" />
          </div>
        ),
      
      }}
      {...props}
    />
  );
};

export { Toaster };