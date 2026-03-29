'use client'
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {useState} from "react";
import Link from "next/link";

interface ICategories{
    _id: string;
    name: string;
    slug: string;
}
export default function Nav ({categories}:{categories: ICategories[]}) {
    const [activeNav, setActiveNav] = useState('SHOP');
  return (
      <nav className="bg-[#ffe7db]">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-center py-1">
              <NavigationMenu>
                  <NavigationMenuList className="gap-6">
                      {/* HOME */}
                      <NavigationMenuItem>
                          <NavigationMenuLink
                              href="/"
                              className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                                  activeNav === 'HOME'
                                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                                      : 'text-[#664c3f] hover:text-[#e45001]'
                              }`}
                              onClick={() => setActiveNav('HOME')}
                          >
                              HOME
                          </NavigationMenuLink>
                      </NavigationMenuItem>

                      {/* ABOUT US */}
                      <NavigationMenuItem>
                          <NavigationMenuLink
                              href="/about"
                              className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                                  activeNav === 'ABOUT US'
                                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                                      : 'text-[#664c3f] hover:text-[#e45001]'
                              }`}
                              onClick={() => setActiveNav('ABOUT US')}
                          >
                              ABOUT US
                          </NavigationMenuLink>
                      </NavigationMenuItem>

                      {/* SHOP — có dropdown */}
                      <NavigationMenuItem>
                          <NavigationMenuTrigger
                              className={` text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-[#ffd0b8] focus:bg-transparent data-[state=open]:bg-transparent
      `}
                              onClick={() => setActiveNav('SHOP')}
                          >
                              <Link href="/shop">SHOP</Link>
                          </NavigationMenuTrigger>

                          <NavigationMenuContent className="bg- border border-[#f0e0d6] shadow-lg rounded-md relative">
                              <ul className="w-48 p-2">
                                  {categories.map((cat) => (
                                      <li key={cat.slug}>
                                          <NavigationMenuLink
                                              href={`/shop/${cat.slug}`}
                                              className="block px-3 py-2 text-sm text-[#ff5c2b] rounded hover:bg-[#fff1eb] hover:text-[#e45001] transition-colors"
                                          >
                                              {cat.name}
                                          </NavigationMenuLink>
                                      </li>
                                  ))}
                              </ul>
                          </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* SUPPORT */}
                      <NavigationMenuItem>
                          <NavigationMenuLink
                              href="/support"
                              className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                                  activeNav === 'SUPPORT'
                                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                                      : 'text-[#664c3f] hover:text-[#e45001]'
                              }`}
                              onClick={() => setActiveNav('SUPPORT')}
                          >
                              SUPPORT
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                  </NavigationMenuList>
              </NavigationMenu>
          </div>
      </nav>
  );
};