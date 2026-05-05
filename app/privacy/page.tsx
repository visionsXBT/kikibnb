import { LegalPageHeader } from "../../components/legal-page-header";
import { PrivacyContent } from "../../components/privacy-content";
import { SiteFooter } from "../../components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="legal-doc-root">
      <LegalPageHeader />
      <PrivacyContent />
      <SiteFooter />
    </div>
  );
}
