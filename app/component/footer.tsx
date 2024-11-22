import { InstagramLogoIcon, TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Icons } from "./icons";

export default function Footer() {
  const parks = [
    {
      name: "About Us",
      Icon: InstagramLogoIcon,
      Description: "Learn more about our mission and vision."
    },
    {
      name: "Features",
      Icon: TwitterLogoIcon,
      Description: "Explore the features that make us unique."
    },
    {
      name: "Customers",
      Icon: LinkedInLogoIcon,
      Description: "Join our growing list of satisfied customers."
    },
    {
      name: "Pricing",
      Icon: GitHubLogoIcon,
      Description: "Check out our competitive pricing for all plans."
    },
  ];

  return (
    <footer className="bg-black text-[#bcbcbc] text-sm py-10 text-center">
        <div className="container mx-auto">
            <div className="inline-flex">
            <Link href="/">
                                    <Icons.logo className="h-10 w-10" />
                                </Link>
            </div>
            <nav className="flex flex-col md:flex-row justify-center gap-6 mt-6">
                <Link href={"#about"}>About</Link>
                <Link href={"#feature"}>Features</Link>
                <Link href={"#customers"}>Customers</Link>
                <Link href={"#pricing"}>Pricing</Link>
                <Link href={"#help"}>Help</Link>
                <Link href={"#career"}>Careers</Link>
            </nav>
            <div className="flex justify-center gap-6 mt-6">
                <InstagramLogoIcon className="cursor-pointer"/>
                <TwitterLogoIcon className="cursor-pointer"/>
                <LinkedInLogoIcon className="cursor-pointer"/>
                <GitHubLogoIcon className="cursor-pointer"/>
            </div>
            <p className="mt-6">&copy; 2024, All right reserved.</p>
        </div>
    </footer>
  )
}
