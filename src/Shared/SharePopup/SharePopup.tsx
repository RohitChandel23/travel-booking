import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
  import { useEffect, useRef } from "react";
  import { toast } from "react-toastify";
  import "./SharePopup.css";
  
  interface SharePopupProps {
    url: string;
    onClose: () => void;
  }
  

  const SharePopup = ({ url, onClose }: SharePopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
  
    return (
      <div className="share-popup" ref={popupRef}>
        <div className="icon-buttons">
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
  
        <button className="copy-link-btn" onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success("Link copied");
        }}>
          <i className="fa-solid fa-link" /> Copy Link
        </button>
      </div>
    );
  };
  
  export default SharePopup;
  