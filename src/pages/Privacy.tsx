
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Privacy = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <PrepzrLogo width={120} height={40} />
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">
            Last updated: May 1, 2025
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <ScrollArea className="h-[500px] md:h-auto md:max-h-none pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                  <p className="text-gray-600 mb-3">
                    GreatWisdom India Pvt Ltd ("we," "our," or "us"), operating under the brand name PREPZR, respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Services").
                  </p>
                  <p className="text-gray-600">
                    Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
                  <p className="text-gray-600 mb-3">We collect information in the following ways:</p>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Information You Provide</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, password, and educational information.</li>
                    <li><strong>Profile Information:</strong> Information you add to your profile, such as profile picture, educational background, learning goals, and preferences.</li>
                    <li><strong>Learning Data:</strong> Information about your learning activities, including course progress, quiz results, practice exam responses, and study habits.</li>
                    <li><strong>Communication:</strong> When you contact us directly, we record the communications and any personal information you provide.</li>
                    <li><strong>Payment Information:</strong> If you make a purchase, we collect payment details, billing address, and other information necessary to complete the transaction.</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.2 Information Automatically Collected</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>Device Information:</strong> We collect information about the device you use to access our Services, including device type, operating system, browser type, and unique device identifiers.</li>
                    <li><strong>Usage Information:</strong> We collect information about your interactions with our Services, including pages visited, features used, time spent on pages, and navigation paths.</li>
                    <li><strong>Location Information:</strong> With your permission, we may collect your precise or approximate location information.</li>
                    <li><strong>Log Data:</strong> Our servers automatically record information when you use our Services, including your IP address, access times, and activities on our Services.</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect information about your browsing activities.</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-3">We use the information we collect for various purposes, including:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>To provide, maintain, and improve our Services</li>
                    <li>To personalize your experience with our Services, including through our SAKHA AI engine</li>
                    <li>To process transactions and manage your account</li>
                    <li>To send you updates, security alerts, and support and administrative messages</li>
                    <li>To respond to your comments, questions, and requests</li>
                    <li>To monitor and analyze trends, usage, and activities in connection with our Services</li>
                    <li>To detect, prevent, and address technical issues, fraud, and illegal activities</li>
                    <li>To comply with legal obligations</li>
                    <li>For any other purpose with your consent</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">4. SAKHA AI and Data Processing</h2>
                  <p className="text-gray-600 mb-3">
                    Our SAKHA AI engine processes your data to provide personalized educational experiences. This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Analyzing your learning patterns to generate customized study plans</li>
                    <li>Adapting content difficulty based on your performance</li>
                    <li>Providing personalized feedback on your progress</li>
                    <li>Generating tailored practice questions and assessments</li>
                    <li>Identifying knowledge gaps and suggesting remedial content</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    We utilize machine learning techniques to continually improve the accuracy and effectiveness of our SAKHA AI engine based on aggregated user data.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">5. How We Share Your Information</h2>
                  <p className="text-gray-600 mb-3">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>With Service Providers:</strong> We share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                    <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it is necessary to comply with a legal obligation, protect the rights, property, or safety of GreatWisdom India Pvt Ltd, our users, or others.</li>
                    <li><strong>With Your Consent:</strong> We may share your information with third parties when you consent to such sharing.</li>
                    <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                    <li><strong>Aggregated or De-identified Information:</strong> We may share aggregated or de-identified information about our users that cannot reasonably be used to identify any individual.</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Data Security</h2>
                  <p className="text-gray-600 mb-3">
                    We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Your Rights and Choices</h2>
                  <p className="text-gray-600 mb-3">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>Access and Update:</strong> You can access and update certain information about your account through your account settings.</li>
                    <li><strong>Data Portability:</strong> You may request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Deletion:</strong> You may request that we delete your personal information, subject to certain exceptions provided by law.</li>
                    <li><strong>Objection and Restriction:</strong> You may object to or request restriction of the processing of your personal information.</li>
                    <li><strong>Withdrawal of Consent:</strong> If we process your information based on your consent, you can withdraw your consent at any time.</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    To exercise these rights, please contact us at hello@prepzr.com.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Children's Privacy</h2>
                  <p className="text-gray-600 mb-3">
                    Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at hello@prepzr.com, and we will take steps to delete such information.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Changes to This Privacy Policy</h2>
                  <p className="text-gray-600 mb-3">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Us</h2>
                  <p className="text-gray-600 mb-3">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">GreatWisdom India Pvt Ltd</p>
                    <p className="text-gray-700">Email: hello@prepzr.com</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
