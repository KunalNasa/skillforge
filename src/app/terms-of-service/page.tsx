export const metadata = {
    title: "Terms of Service - SkillForge",
    description: "Read the terms of service for SkillForge.",
  };
  
  export default function TermsOfServicePage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">
          Effective Date : 30/12/25
          <br />
          Last Updated : 30/11/24
        </p>
        <p className="mb-4">
          Welcome to <strong>SkillForge</strong>. By accessing or using our website, you agree to be bound by the
          following terms and conditions.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Use of Services</h2>
        <p className="mb-4">
          You agree to use our services only for lawful purposes and in accordance with these Terms. You must not:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Engage in any behavior that violates applicable laws or regulations.</li>
          <li>Attempt to gain unauthorized access to our systems.</li>
          <li>Distribute harmful or malicious content through our services.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
        <p className="mb-4">
          All content on this website, including text, graphics, and logos, is the property of SkillForge and is
          protected by copyright laws. You may not reproduce or distribute this content without permission.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your access to our services if you violate these Terms or engage in
          behavior harmful to our platform or other users.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          SkillForge is not liable for any direct, indirect, incidental, or consequential damages resulting from your use
          of our services.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us at{" "}
          <a href="mailto:support@kunalnasa.xyz" className="text-blue-600">
            support@kunalnasa.xyz
          </a>
          .
        </p>
      </div>
    );
  }
  