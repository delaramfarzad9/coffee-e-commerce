import Breadcrumb from "@/components/ui/Breadcrumb";
export default function ContentLayout({ children }) {
  return (
    <div className="z-50 max-w-6xl mx-auto px-4 pt-24 md:pt-28">
      <Breadcrumb />
      {children}
    </div>
  );
}
