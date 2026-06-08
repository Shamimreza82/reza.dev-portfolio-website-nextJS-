// app/privacy-policy/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <Card className="mb-6">
        <CardContent>
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>
          <p className="mt-2">
            At <strong>Rezahub.com</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or use our website.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>1. Information We Collect</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal details (name, email, phone) when you contact us or fill forms</li>
            <li>Usage data such as IP address, browser type, and pages visited</li>
            <li>Cookies and similar technologies to improve your experience</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>2. How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and improve our services</li>
            <li>Personalize your browsing experience</li>
            <li>Respond to inquiries and support requests</li>
            <li>Show relevant ads (including Google AdSense ads)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>3. Google AdSense & Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our website uses Google AdSense for displaying ads. Google may use cookies (like the DoubleClick DART cookie) to serve ads based on your previous visits to our site and other websites. You can opt out of personalized ads by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 underline">Google Ads Settings</a>.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>4. Sharing of Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We do not sell or trade your personal information.</p>
          <p className="mt-2">We may share limited data with:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Trusted service providers (e.g., hosting, analytics)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>5. Data Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>6. Your Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of cookies through your browser settings</li>
            <li>Contact us for any privacy-related concerns</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>7. Third-Party Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>8. Updates to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We may update this Privacy Policy from time to time. The updated version will be posted here with a revised “Effective Date.”</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Email: <a href="mailto:support@rezahub.com" className="text-blue-600 underline">support@rezahub.com</a></li>
            <li>Website: <a href="https://www.rezahub.com" className="text-blue-600 underline">https://www.rezahub.com</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
