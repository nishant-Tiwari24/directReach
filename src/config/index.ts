import { Metadata } from "next";

export const SITE_CONFIG: Metadata = {
    title: {
        default: "DirectReach - 10X Your Outreach",
        template: `%s | DR`
    },
    description: "Astra is an AI powered website builder that helps you create a website in minutes. No coding skills required. Get started for free!",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico",
            }
        ]
    },
    openGraph: {
        title: "DirectReach - 10X Your Outreach",
        description: "Astra is an AI powered website builder that helps you create a website in minutes. No coding skills required. Get started for free!",
        images: [
            {
                url: "/assets/og-image.png",
            }
        ]
    }
};
