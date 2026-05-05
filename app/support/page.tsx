import { LegalPageHeader } from "../../components/legal-page-header";
import { SupportForm } from "../../components/support-form";
import { SiteFooter } from "../../components/site-footer";

export default function SupportPage() {
  return (
    <div className="legal-doc-root">
      <LegalPageHeader />
      <SupportForm />
      <SiteFooter />
    </div>
  );
}
