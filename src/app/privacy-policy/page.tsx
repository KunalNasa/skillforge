export const metadata = {
    title: "Privacy Policy - SkillForge",
    description: "Read the privacy policy for SkillForge.",
  };
  
  export default function PrivacyPolicyPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Effective Date: 30/12/25
          <br />
          Last Updated: 30/11/24
        </p>
        <p className="mb-4">
          Welcome to <strong>SkillForge</strong>! Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our services.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Personal Information</strong>: When you sign in using Google OAuth, we collect your name, email
            address, and profile picture.
          </li>
          <li>
            <strong>Usage Data</strong>: Information about how you interact with our website, such as IP address, browser
            type, and usage patterns.
          </li>
          <li>
            <strong>Cookies</strong>: We use cookies to improve your experience on our platform.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and maintain our services.</li>
          <li>To improve the user experience and analyze usage trends.</li>
          <li>To communicate with you about updates or issues with the app.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell, trade, or share your information with third parties without your consent, except to comply with
          legal obligations or protect our rights.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Security</h2>
        <p className="mb-4">
          We use industry-standard measures to protect your data. However, no method of transmission over the Internet is
          100% secure.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:kunalnasa.dev@gmail.com" className="text-blue-600">
            support@kunalnasa.xyz
          </a>
          .
        </p>
      </div>
    );
  }
  