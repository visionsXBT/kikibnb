import { LegalPageHeader } from "../../components/legal-page-header";
import { TermsContent } from "../../components/terms-content";
import { SiteFooter } from "../../components/site-footer";

export default function TermsPage() {
  return (
    <div className="legal-doc-root">
      <LegalPageHeader />
      <TermsContent />
      <SiteFooter />
    </div>
  );
}
