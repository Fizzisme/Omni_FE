import Footer from '@/components/Footer/Footer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    );
}
