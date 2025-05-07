
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Terms = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-gray-500 mb-8">
            Last updated: May 1, 2025
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <ScrollArea className="h-[500px] md:h-auto md:max-h-none pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                  <p className="text-gray-600 mb-3">
                    Welcome to PREPZR ("we," "our," or "us"), a product of GreatWisdom India Pvt Ltd. These Terms and Conditions ("Terms") govern your access to and use of the PREPZR platform, website, and services (collectively, the "Services"), including any content, functionality, and services offered through prepzr.com.
                  </p>
                  <p className="text-gray-600">
                    By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use our Services.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Definitions</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>"PREPZR"</strong> refers to the educational platform operated by GreatWisdom India Pvt Ltd.</li>
                    <li><strong>"SAKHA AI"</strong> refers to our proprietary artificial intelligence engine that powers aspects of our Services.</li>
                    <li><strong>"User,"</strong> "you," and "your" refers to the individual, entity, or organization that accesses or uses our Services.</li>
                    <li><strong>"Content"</strong> refers to text, images, photos, audio, video, and all other forms of data or communication.</li>
                    <li><strong>"User Content"</strong> refers to Content that users submit or transmit to, through, or in connection with our Services.</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Account Registration and Eligibility</h2>
                  <p className="text-gray-600 mb-3">
                    To access certain features of our Services, you may be required to create an account. When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
                  </p>
                  <p className="text-gray-600 mb-3">
                    You must be at least 13 years old to use our Services. If you are under 18, you must have the permission of a parent or guardian to use our Services and accept these Terms.
                  </p>
                  <p className="text-gray-600">
                    By using our Services, you represent and warrant that you meet all eligibility requirements we outline in these Terms or that you are otherwise legally permitted to enter into these Terms.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">4. SAKHA AI Technology</h2>
                  <p className="text-gray-600 mb-3">
                    Our Services incorporate SAKHA AI, our proprietary artificial intelligence engine. SAKHA AI is designed to enhance your learning experience through personalized content recommendations, adaptive testing, and interactive tutoring.
                  </p>
                  <p className="text-gray-600 mb-3">
                    While we strive to ensure the accuracy and reliability of SAKHA AI, you acknowledge that AI technology has limitations and may occasionally provide incorrect or incomplete information. You agree to use the information provided by SAKHA AI as a supplementary resource and not as a substitute for professional advice or judgment.
                  </p>
                  <p className="text-gray-600">
                    GreatWisdom India Pvt Ltd reserves all rights, title, and interest in and to SAKHA AI and its underlying technology, including all intellectual property rights.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">5. User Content and License</h2>
                  <p className="text-gray-600 mb-3">
                    Our Services may allow you to create, upload, post, send, receive, and store Content. When you do so, you retain your rights to your User Content, but you grant us a non-exclusive, royalty-free, transferable, sublicensable, worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly display, and distribute such User Content for the purpose of operating and providing our Services.
                  </p>
                  <p className="text-gray-600">
                    You represent and warrant that you own or have the necessary rights to your User Content and that your User Content does not violate the rights of any third party, including intellectual property rights and privacy rights.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Prohibited Conduct</h2>
                  <p className="text-gray-600 mb-3">
                    You agree not to use our Services to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon or violate the intellectual property rights or any other rights of others</li>
                    <li>Transmit any Content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                    <li>Attempt to gain unauthorized access to our Services, user accounts, or computer systems</li>
                    <li>Use our Services for any commercial purpose without our express written consent</li>
                    <li>Interfere with or disrupt our Services or servers</li>
                    <li>Engage in any conduct that restricts or inhibits any other user from using our Services</li>
                    <li>Attempt to decompile, reverse engineer, disassemble, or hack any aspect of our Services, including SAKHA AI technology</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Subscription and Payment Terms</h2>
                  <p className="text-gray-600 mb-3">
                    Some aspects of our Services may require payment of fees. You agree to pay all applicable fees and taxes in connection with your activities on our Services. When you purchase a subscription, you agree to our payment terms as presented to you at the time of purchase.
                  </p>
                  <p className="text-gray-600 mb-3">
                    Subscriptions automatically renew unless you cancel before the renewal date. You may cancel your subscription at any time, but no refunds will be provided for partial subscription periods unless required by law.
                  </p>
                  <p className="text-gray-600">
                    We reserve the right to change our pricing and subscription terms at any time, with notice to you before the changes take effect.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Privacy Policy</h2>
                  <p className="text-gray-600 mb-3">
                    Our Privacy Policy describes how we collect, use, and share information about you when you use our Services. By using our Services, you agree to our collection, use, and sharing of your information as described in our Privacy Policy.
                  </p>
                  <p className="text-gray-600">
                    Our Privacy Policy is available at <Link to="/privacy" className="text-blue-600 hover:underline">prepzr.com/privacy</Link>.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Intellectual Property Rights</h2>
                  <p className="text-gray-600 mb-3">
                    All content on our Services, including but not limited to text, graphics, logos, button icons, images, audio clips, data compilations, and software, is the property of GreatWisdom India Pvt Ltd, its affiliates, or its licensors and is protected by Indian and international copyright laws.
                  </p>
                  <p className="text-gray-600 mb-3">
                    PREPZR, SAKHA AI, and related logos and designs are trademarks of GreatWisdom India Pvt Ltd. You may not use these marks without our prior written permission.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Limitation of Liability</h2>
                  <p className="text-gray-600 mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, GREATWISDOM INDIA PVT LTD AND ITS OFFICERS, EMPLOYEES, DIRECTORS, SHAREHOLDERS, PARENTS, SUBSIDIARIES, AFFILIATES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
                    <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
                    <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
                    <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS RELATED TO THE SERVICES EXCEED THE AMOUNT PAID BY YOU TO US DURING THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR INR 5000, WHICHEVER IS GREATER.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Disclaimer of Warranties</h2>
                  <p className="text-gray-600 mb-3">
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p className="text-gray-600 mb-3">
                    WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Indemnification</h2>
                  <p className="text-gray-600 mb-3">
                    You agree to indemnify, defend, and hold harmless GreatWisdom India Pvt Ltd, its affiliates, officers, directors, employees, consultants, agents, and representatives from any and all claims, liabilities, damages, losses, costs, expenses, fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Your User Content</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any rights of any other person or entity</li>
                    <li>Your use or misuse of our Services</li>
                  </ul>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">13. Term and Termination</h2>
                  <p className="text-gray-600 mb-3">
                    These Terms will remain in full force and effect while you use our Services. We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
                  </p>
                  <p className="text-gray-600 mb-3">
                    Upon termination, your right to use our Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">14. Governing Law and Jurisdiction</h2>
                  <p className="text-gray-600 mb-3">
                    These Terms and your use of our Services shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles.
                  </p>
                  <p className="text-gray-600 mb-3">
                    Any legal action or proceeding arising out of or relating to these Terms or your use of our Services shall be exclusively brought in the courts located in New Delhi, India, and you consent to the personal jurisdiction and venue of such courts.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">15. Changes to Terms</h2>
                  <p className="text-gray-600 mb-3">
                    We may modify these Terms from time to time. When we make changes, we will provide you with notice as appropriate under the circumstances, such as by displaying a prominent notice within our Services or by sending you an email. Your continued use of our Services after such notice constitutes your acceptance of the modified Terms.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">16. Contact Information</h2>
                  <p className="text-gray-600 mb-3">
                    If you have any questions about these Terms, please contact us at:
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

export default Terms;
