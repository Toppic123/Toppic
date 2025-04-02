
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Privacy = () => {
  const [language, setLanguage] = useState<"en">("en");

  // Ensuring all content is in English as requested
  const content = {
    title: "Privacy Policy",
    lastUpdated: "Last updated",
    introduction: "At Snap Contest, we respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
    sections: [
      {
        title: "1. What Data We Collect",
        content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
        list: [
          "Identity Data includes first name, last name, username or similar identifier.",
          "Contact Data includes email address and telephone numbers.",
          "Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.",
          "Profile Data includes your username and password, your interests, preferences, feedback and survey responses.",
          "Usage Data includes information about how you use our website, products and services.",
          "Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences."
        ]
      },
      {
        title: "2. How We Collect Your Data",
        content: "We use different methods to collect data from and about you including through:",
        list: [
          "Direct interactions: You may give us your Identity and Contact Data by filling in forms or by corresponding with us by post, phone, email or otherwise.",
          "Automated technologies or interactions: As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.",
          "Third parties or publicly available sources: We will receive personal data about you from various third parties and public sources."
        ]
      },
      {
        title: "3. How We Use Your Data",
        content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
        list: [
          "Where we need to perform the contract we are about to enter into or have entered into with you.",
          "Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.",
          "Where we need to comply with a legal obligation."
        ],
        subcontent: "Generally, we do not rely on consent as a legal basis for processing your personal data although we will get your consent before sending third party direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us."
      },
      {
        title: "4. Data Security",
        content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.",
        subcontent: "We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so."
      },
      {
        title: "5. Data Retention",
        content: "We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you."
      },
      {
        title: "6. Your Legal Rights",
        content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data including the right to:",
        list: [
          "Request access to your personal data.",
          "Request correction of your personal data.",
          "Request erasure of your personal data.",
          "Object to processing of your personal data.",
          "Request restriction of processing your personal data.",
          "Request transfer of your personal data.",
          "Right to withdraw consent."
        ],
        subcontent: "You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we could refuse to comply with your request in these circumstances."
      },
      {
        title: "7. Third-Party Links",
        content: "This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit."
      },
      {
        title: "8. Cookies",
        content: "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly."
      },
      {
        title: "9. Changes to the Privacy Policy",
        content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes."
      },
      {
        title: "10. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at: privacy@snapcontest.com"
      }
    ]
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <p>{content.lastUpdated}: {new Date().toLocaleDateString()}</p>
          <p>{content.introduction}</p>
          
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              <p>
                {section.content}
              </p>
              {section.list && (
                <ul>
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              {section.subcontent && <p>{section.subcontent}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
