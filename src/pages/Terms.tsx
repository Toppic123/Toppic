
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProhibitedConduct from "@/components/ProhibitedConduct";

const Terms = () => {
  const [language, setLanguage] = useState<"en">("en");

  // All content will be in English as requested
  const content = {
    title: "Terms and Conditions",
    lastUpdated: "Last updated",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing or using Snap Contest, you agree to comply with these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you should not use our services."
      },
      {
        title: "2. Changes to Terms",
        content: "We reserve the right to modify these terms at any time. Changes will take effect immediately after posting. It is your responsibility to periodically review these terms."
      },
      {
        title: "3. Use of Service",
        content: "Snap Contest provides a platform to participate in photo contests. By using our services, you agree to:",
        list: [
          "Not use the service for illegal or unauthorized purposes",
          "Not infringe intellectual property rights",
          "Not upload offensive, defamatory, or inappropriate content",
          "Not attempt to access restricted areas of the service",
          "Not upload AI-generated images",
          "Only upload images that you have taken yourself and own the rights to"
        ]
      },
      {
        title: "4. User Accounts",
        content: "When creating an account on Snap Contest, you are responsible for:",
        list: [
          "Maintaining the confidentiality of your password",
          "Restricting access to your account",
          "All activities that occur under your account",
          "Notifying us immediately of any unauthorized use"
        ]
      },
      {
        title: "5. Intellectual Property Rights",
        content: "When uploading photographs to Snap Contest, you retain your copyright, but you grant us a license to display, promote, and use your content in connection with the platform's services. Additionally, you grant the contest organizers the rights specified in the rules of each contest."
      },
      {
        title: "6. Photo Ownership and Commercial Rights",
        content: "By participating in contests on Snap Contest:",
        list: [
          "You understand that winning photos may become the property of the contest organizer if specified in the contest rules.",
          "You consent to your winning photographs being used for commercial purposes by the contest organizer if specified in the contest rules.",
          "You confirm that you have obtained appropriate permissions from any identifiable individuals appearing in your photos.",
          "You consent to appearing in photographs that may be used for commercial purposes if you are visible in winning photos.",
          "You acknowledge that contest organizers may choose to not claim ownership of photos, and in those cases, you retain all rights to your images."
        ]
      },
      {
        title: "7. Voting and Selection System",
        content: "The Snap Contest voting and selection system works as follows:",
        list: [
          "Initially, our artificial intelligence performs a first filtering of photographs based on technical and aesthetic quality criteria.",
          "This filtering ensures that participants only see a maximum of 50 highest-quality photographs for voting.",
          "Contest administrators have access to all photos, including those filtered by AI, to ensure no photos were incorrectly eliminated.",
          "Participants vote for the photographs they consider best, thus determining the winners of the contest.",
          "The number of winning photographs will depend on the type of event and the organizer's subscription.",
          "The winning photographs will become the property of the organizer according to the terms specified in each contest.",
          "Winners will receive a notification in the app and an email with a QR code containing their reward."
        ]
      },
      {
        title: "8. Image Storage and Quality",
        content: "To ensure the best possible experience on the platform:",
        list: [
          "Uploaded photographs are compressed to optimize application performance during viewing and voting.",
          "However, we store the original high-quality version to preserve all image details.",
          "At the end of the contest, only the winning photographs that will be delivered to the organizer are kept in high quality.",
          "The other photographs are maintained in their compressed version for platform visualization."
        ]
      },
      {
        title: "9. Photograph Requirements",
        content: "Regarding photographs uploaded to the platform:",
        list: [
          "Photographs can be taken with mobile phones or cameras.",
          "Contest organizers will specify in their rules the type of photography they are looking for.",
          "Organizers will also indicate in their rules whether edited photographs are allowed and to what extent.",
          "AI-generated images are not accepted.",
          "Photographs must be taken by the user uploading them.",
          "The user acknowledges being the owner of the rights to the images uploaded to the platform."
        ]
      },
      {
        title: "10. Organizers and Collaborators",
        content: "For contest organizers:",
        list: [
          "Organizers can choose whether to allow collaborators in their contest.",
          "Collaborators are companies that can advertise in the application in exchange for providing rewards for participants.",
          "The main organizer's advertising will always be more prominent than that of collaborators.",
          "The specific terms of collaboration will be agreed between the organizer and collaborators."
        ]
      },
      {
        title: "11. Limitation of Liability",
        content: "Snap Contest will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, arising from the use of our services."
      },
      {
        title: "12. Governing Law",
        content: "These terms will be governed and interpreted in accordance with the laws of Snap Contest's country of operation, without regard to its conflict of law principles."
      },
      {
        title: "13. Contact",
        content: "If you have questions about these Terms and Conditions, contact us at: terms@snapcontest.com"
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
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto mb-12">
          <p>{content.lastUpdated}: {new Date().toLocaleDateString()}</p>
          
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
            </div>
          ))}
        </div>
        
        <ProhibitedConduct />
      </div>
    </div>
  );
};

export default Terms;
