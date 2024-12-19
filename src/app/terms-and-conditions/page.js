import Link from "next/link";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-lg text-gray-700">
          <p>
            <strong>Last updated:</strong> December 2024
          </p>
          <p>
            By accessing and using <strong>NoteStream</strong> (the
            &apos;Service&apos;), you agree to comply with and be bound by
            these Terms and Conditions. If you do not agree to these terms,
            please do not use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. Service Overview</h2>
          <p>
            <strong>NoteStream</strong> is an educational project designed for
            creating delivery notes for enterprises. The service collects basic
            user information such as <strong>name</strong>,{" "}
            <strong>last name</strong>, <strong>email</strong>, and{" "}
            <strong>password</strong>. This service is provided for learning and
            demonstration purposes only and is not intended for use in a live or
            production environment.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. User Information</h2>
          <p>
            <strong>What we collect:</strong> When you sign up for{" "}
            <strong>NoteStream</strong>, you will be asked to provide your{" "}
            <strong>name</strong>, <strong>last name</strong>,{" "}
            <strong>email</strong>, and <strong>password</strong>. This
            information is used solely for the purpose of managing your account
            and accessing the service.
          </p>
          <p>
            <strong>Data storage:</strong> The data you provide is stored in a
            database managed by a third-party service. As the creator of this
            project, I do not own or control the database or its security.
            Please understand that your data may be subject to third-party terms
            and conditions or privacy policies.
          </p>
          <p>
            <strong>Security:</strong> While we take basic security measures to
            protect the data, please note that <strong>NoteStream</strong> is a
            school project and is not designed to provide high-level security
            for sensitive data. We strongly recommend that you do not use real
            or sensitive information on this platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            3. Usage and Limitations
          </h2>
          <p>
            <strong>Educational Purpose:</strong> <strong>NoteStream</strong> is
            intended for educational use only. It is part of a school project
            and should not be considered a fully functional or secure service.
          </p>
          <p>
            <strong>No Warranty:</strong> The service is provided &apos;as
            is&apos; without any warranty of any kind. We do not guarantee that
            the Service will be error-free or uninterrupted.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            4. Privacy and Data Handling
          </h2>
          <p>
            Since the data is stored by a third-party service, we recommend
            reviewing their privacy policy. By using{" "}
            <strong> NoteStream </strong>, you acknowledge and accept the terms
            of the third-party service that handles the data.
          </p>
          <p>
            <strong>Email:</strong> We may send you email notifications related
            to your registration, including verification codes or
            account-related updates. You can choose to unsubscribe at any time.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            5. Limitation of Liability
          </h2>
          <p>
            By using <strong>NoteStream</strong>, you agree that the creator is
            not liable for any damages, losses, or issues that arise from your
            use of the service. This includes, but is not limited to, data loss,
            unauthorized access, or issues resulting from third-party services.
          </p>

          <h2 className="text-2xl font-semibold mt-6">6. Termination</h2>
          <p>
            You may terminate your account at any time by contacting the support
            email provided on the platform. <strong>NoteStream</strong> reserves
            the right to suspend or terminate accounts if they are found to
            violate these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            7. Modifications to Terms
          </h2>
          <p>
            <strong>NoteStream</strong> reserves the right to modify these Terms
            and Conditions at any time. If changes are made, the updated version
            will be posted here with the &apos;Last updated&apos; date changed.
            By continuing to use the Service after changes are posted, you
            accept the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">8. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of the
            jurisdiction in which you reside, or the jurisdiction where the
            educational institution operates.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            9. Contact Information
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at:
          </p>
          <p>
            GitHub Repository:{" "}
            <a
              href="https://github.com/Jmef19/note-stream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:underline"
            >
              Jmef19/note-stream
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <p className="text-teal-500 hover:underline font-semibold">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
