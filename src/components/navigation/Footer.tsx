import React from "react";
import Link from "./Link";

interface FooterProps {

}

const Footer = ({ }: FooterProps) => {
  return (
    <footer className="flex gap-4 p-4 bg-primary text-primary-contrast">
      <div>
        <p className="text-lg font-semibold text-center">Contact:</p>
        <div className="flex gap-2">
          <span className="font-semibold">Feedback:</span>
          <Link color="white" href="mailto:feedback@commitrocket.com" underline>feedback@commitrocket.com</Link>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-center">Contact:</p>
        <div className="flex gap-2">
          <span className="font-semibold">Feedback:</span>
          <Link color="white" href="mailto:feedback@commitrocket.com" underline>feedback@commitrocket.com</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;