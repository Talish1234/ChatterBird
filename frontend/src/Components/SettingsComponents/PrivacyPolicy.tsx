export default function PrivacyPolicy({
  privacyPolicyOpen,
}: {
  privacyPolicyOpen: boolean;
}) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        privacyPolicyOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <p>
            We respect your privacy. This policy explains how we handle your
            information when you use our app.
          </p>

          <p>
            <strong>Data We Collect:</strong> Basic account info (like name,
            email) and usage data.
          </p>

          <p>
            <strong>How We Use It:</strong> To provide chat features, improve
            our services, and keep your account secure.
          </p>

          <p>
            <strong>Security:</strong> We use safeguards to protect your data,
            but no method is 100% secure.
          </p>

          <p>
            <strong>Contact:</strong> For questions, email{" "}
            <a
              href="mailto:talishtarik1234@gmail.com"
              className="inline font-medium text-blue-600 dark:text-blue-400 underline"
            >
              talishtarik1234@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
