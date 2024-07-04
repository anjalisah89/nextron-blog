import { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium bg-pink-100 text-pink-500 focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-600 bg-gray-50">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const AccordionSection = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="w-full md:w-1/2 mx-auto">
        <Accordion
          title="How can I read the Articles?"
          content="Simply navigate to our Articles section to explore our categorized posts and featured articles. You can also use the search functionality to find specific topics of interest."
        />
        <Accordion
          title="Can I comment on blog posts?"
          content="Yes! We encourage community interaction. Feel free to leave your thoughts, feedback, and questions in the comments section of each post."
        />
        <Accordion
          title="How can I request a code sample or article?"
          content="You can request code samples, specific articles, or research papers by visiting our Contact page and filling out the request form. We aim to respond to all inquiries."
        />
        <Accordion
          title="Are there any subscription options available?"
          content="Yes, you can subscribe to our newsletter to receive updates on the latest posts, featured articles, and exclusive content."
        />
        <Accordion
          title="How do I contact Nextron for further inquiries?"
          content="For any questions, suggestions, or requests, please visit our Contact page or email us directly."
        />
        <Accordion
          title="Do you offer any premium content?"
          content="Currently, all our content is freely accessible. We are committed to providing valuable resources to the developer community at no cost."
        />
      </div>
    </div>
  );
};

export default AccordionSection;
