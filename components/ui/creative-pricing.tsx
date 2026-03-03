import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Make Short Videos That Pop",
    description = "Edit, enhance, and go viral in minutes",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
            <div className="text-center space-y-6 mb-16">
                <div className="font-handwritten text-xl text-primary rotate-[-1deg]">
                    {tag}
                </div>
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-bold font-handwritten text-foreground rotate-[-1deg]">
                        {title}
                        <div className="absolute -right-12 top-0 text-secondary rotate-12">
                            ✨
                        </div>
                        <div className="absolute -left-8 bottom-0 text-primary -rotate-12">
                            ⭐️
                        </div>
                    </h2>
                    <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-primary/20 
                        rotate-[-1deg] rounded-full blur-sm"
                    />
                </div>
                <p className="font-handwritten text-xl text-muted-foreground rotate-[-1deg]">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            index === 0 && "rotate-[-1deg]",
                            index === 1 && "rotate-[1deg]",
                            index === 2 && "rotate-[-2deg]"
                        )}
                    >
                        {/* Background Card (Shadow) */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-white dark:bg-zinc-900",
                                "border-2 border-border",
                                "rounded-lg shadow-hard",
                                "transition-all duration-300",
                                "group-hover:translate-x-[-4px]",
                                "group-hover:translate-y-[-4px]",
                                "group-hover:shadow-[8px_8px_0px_0px_var(--border)]"
                            )}
                        />

                        <div className="relative p-6 bg-card rounded-lg border-2 border-border h-full flex flex-col">
                            {tier.popular && (
                                <div
                                    className="absolute -top-6 right-4 bg-secondary text-secondary-foreground 
                                    font-handwritten px-4 py-1 rounded-full rotate-12 text-sm border-2 border-border shadow-hard z-10"
                                >
                                    Popular!
                                </div>
                            )}

                            <div className="mb-6 flex-grow">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full mb-4",
                                        "flex items-center justify-center",
                                        "border-2 border-border bg-white dark:bg-zinc-800",
                                        "shadow-[2px_2px_0px_0px_var(--border)]"
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <h3 className="font-handwritten text-3xl text-foreground mb-2">
                                    {tier.name}
                                </h3>
                                <p className="font-handwritten text-lg text-muted-foreground">
                                    {tier.description}
                                </p>
                            </div>



                            <div className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-border 
                                            bg-primary/20 flex items-center justify-center shrink-0"
                                        >
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="font-handwritten text-lg text-foreground">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={cn(
                                    "w-full h-12 font-handwritten text-xl tracking-wide",
                                    tier.popular ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""
                                )}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-20 text-6xl rotate-12 opacity-10">
                    ✎
                </div>
                <div className="absolute bottom-40 right-20 text-6xl -rotate-12 opacity-10">
                    ✏️
                </div>
            </div>
        </div>
    );
}

export { CreativePricing, type PricingTier }
