import { Link } from "@tanstack/react-router";

interface BannerProps {
    heading?: string;
    subheading?: string;
    buttonLabel?: string;
    href?: string
}

const Banner = ({
    heading = "Ready to share your latest update?",
    subheading = "Create a new post and engage with your network.",
    buttonLabel = "Create Post",
    href = "/dashboard",
}: BannerProps) => {
    return (
        <div className="rounded-lg border bg-card shadow-sm relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 border-none text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAwLDMwMCBMMzAwLDEwMCBBMjAwLDIwMCAwIDEsMSAxMDAsMzAwIEEyMDAsMjAwIDAgMSwxIDMwMCwxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjQwIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utd2lkdGgiIGJlZ2luPSIwcyIgZHVyPSIxLjVzIiB2YWx1ZXM9IjQwOzIwOzQwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvcGF0aD48L3N2Zz4=')]"></div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold">{heading}</h2>
                    <p className="text-blue-100">{subheading}</p>
                </div>

                <Link
                    to={href}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 bg-white hover:bg-blue-50 text-pilot-blue-700 text-black"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-plus mr-2 h-4 w-4"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                        <path d="M12 8v8"></path>
                    </svg>
                    {buttonLabel}
                </Link>
            </div>
        </div>
    );
};

export default Banner;
